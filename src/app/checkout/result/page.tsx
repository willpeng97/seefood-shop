import Link from "next/link";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { ORDER_STATUS_LABEL } from "@/lib/order-status";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ orderNumber?: string }>;
};

export default async function CheckoutResultPage({ searchParams }: PageProps) {
  const { orderNumber } = await searchParams;

  let order: {
    orderNumber: string;
    status: keyof typeof ORDER_STATUS_LABEL;
    totalAmount: number;
  } | null = null;

  if (isDatabaseConfigured() && orderNumber) {
    const row = await prisma.order.findUnique({
      where: { orderNumber },
    });
    if (row) {
      order = {
        orderNumber: row.orderNumber,
        status: row.status,
        totalAmount: row.totalAmount,
      };
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-ocean-900">付款結果</h1>
      {order ? (
        <>
          <p className="mt-4 text-lg text-ocean-700">
            訂單編號：<span className="font-semibold">{order.orderNumber}</span>
          </p>
          <p className="mt-2 text-base text-ocean-600">
            狀態：{ORDER_STATUS_LABEL[order.status]}
          </p>
          <p className="mt-2 text-xl font-bold text-ocean-900">
            NT$ {order.totalAmount.toLocaleString()}
          </p>
        </>
      ) : (
        <p className="mt-4 text-lg text-ocean-700">
          {orderNumber
            ? `已收到付款回傳（${orderNumber}），資料同步中。`
            : "感謝您的訂購，請至訂單管理查看詳情。"}
        </p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/account/orders"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-ocean-900 px-6 py-3 font-semibold text-white hover:bg-celadon-700"
        >
          訂單管理
        </Link>
        <Link
          href="/products"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-ocean-200 px-6 py-3 font-semibold text-ocean-800 hover:bg-ocean-50"
        >
          繼續購物
        </Link>
      </div>
    </div>
  );
}
