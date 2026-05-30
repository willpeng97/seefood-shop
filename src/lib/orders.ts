import { prisma } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

export function generateOrderNumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `SF-${y}${m}${day}-${rand}`;
}

export function toEcpayMerchantTradeNo(orderNumber: string): string {
  return orderNumber.replace(/-/g, "").slice(0, 20);
}

export async function markOrderPaid(
  merchantTradeNo: string,
  ecpayRtnMsgTradeNo?: string
) {
  const order = await prisma.order.findFirst({
    where: {
      OR: [
        { ecpayMerchantTradeNo: merchantTradeNo },
        { orderNumber: merchantTradeNo },
      ],
    },
  });

  if (!order) return null;

  return prisma.order.update({
    where: { id: order.id },
    data: {
      status: OrderStatus.PROCESSING,
      paidAt: new Date(),
      ecpayTradeNo: ecpayRtnMsgTradeNo ?? undefined,
    },
  });
}
