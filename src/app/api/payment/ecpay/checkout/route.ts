import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import {
  buildAutoSubmitHtml,
  buildEcpayCheckoutParams,
  getEcpayConfig,
} from "@/lib/ecpay";
import { toEcpayMerchantTradeNo } from "@/lib/orders";

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "資料庫未設定" }, { status: 503 });
  }

  const config = getEcpayConfig();
  if (!config) {
    return NextResponse.json(
      { error: "綠界金流尚未設定（ECPAY_* 環境變數）" },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber");

  if (!orderNumber) {
    return NextResponse.json({ error: "缺少 orderNumber" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.json({ error: "找不到訂單" }, { status: 404 });
  }

  const merchantTradeNo =
    order.ecpayMerchantTradeNo ?? toEcpayMerchantTradeNo(order.orderNumber);

  const itemName = order.items
    .map((i) => `${i.productName} x${i.quantity}`)
    .join("#")
    .slice(0, 400);

  const params = buildEcpayCheckoutParams({
    merchantTradeNo,
    totalAmount: order.totalAmount,
    itemName: itemName || "SEEFOOD 商品",
    tradeDesc: `SEEFOOD 訂單 ${order.orderNumber}`,
    email: order.email,
    config,
  });

  const html = buildAutoSubmitHtml(config.apiUrl, params);

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
