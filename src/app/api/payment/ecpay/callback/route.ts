import { NextResponse } from "next/server";
import { getEcpayConfig, verifyCheckMacValue } from "@/lib/ecpay";
import { markOrderPaid } from "@/lib/orders";
import { OrderStatus } from "@prisma/client";
import { prisma, isDatabaseConfigured } from "@/lib/db";

async function parseEcpayBody(request: Request): Promise<Record<string, string>> {
  const contentType = request.headers.get("content-type") ?? "";
  const params: Record<string, string> = {};

  if (contentType.includes("application/json")) {
    const json = (await request.json()) as Record<string, string>;
    return json;
  }

  const text = await request.text();
  const decoded = new URLSearchParams(text);
  decoded.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return new NextResponse("0|DB", { status: 503 });
  }

  const config = getEcpayConfig();
  if (!config) {
    return new NextResponse("0|Config", { status: 503 });
  }

  const params = await parseEcpayBody(request);

  if (!verifyCheckMacValue(params, config.hashKey, config.hashIV)) {
    return new NextResponse("0|CheckMacValueError", { status: 400 });
  }

  const merchantTradeNo = params.MerchantTradeNo;
  const rtnCode = params.RtnCode;
  const tradeNo = params.TradeNo;

  if (rtnCode === "1") {
    await markOrderPaid(merchantTradeNo, tradeNo);
  } else {
    const order = await prisma.order.findFirst({
      where: { ecpayMerchantTradeNo: merchantTradeNo },
    });
    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.CANCELLED },
      });
    }
  }

  return new NextResponse("1|OK");
}
