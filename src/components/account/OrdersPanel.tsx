"use client";

import { useEffect, useMemo, useState } from "react";
import { SignedIn, SignedOut } from "@/components/AuthGate";
import Link from "next/link";
import { env } from "@/lib/env";
import { ORDER_STATUS_LABEL } from "@/lib/order-status";
import type { OrderStatus } from "@prisma/client";

type FilterLabel = "全部" | "處理中" | "配送中" | "已完成";

interface ApiOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
  status: OrderStatus;
  items: { productName: string; quantity: number }[];
}

const STATUS_CLASS: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "bg-coral-100 text-coral-500",
  PROCESSING: "bg-coral-100 text-coral-500",
  SHIPPING: "bg-celadon-50 text-celadon-700",
  COMPLETED: "bg-ocean-50 text-ocean-700",
  CANCELLED: "bg-ocean-100 text-ocean-600",
};

function statusMatchesFilter(status: OrderStatus, filter: FilterLabel): boolean {
  if (filter === "全部") return true;
  const label = ORDER_STATUS_LABEL[status];
  if (filter === "處理中") return label === "處理中" || label === "待付款";
  if (filter === "配送中") return label === "配送中";
  if (filter === "已完成") return label === "已完成";
  return true;
}

export function OrdersPanel() {
  const [statusFilter, setStatusFilter] = useState<FilterLabel>("全部");
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.status === 401) {
          if (!cancelled) setError("請先登入以查看訂單");
          return;
        }
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "載入失敗");
        }
        const data = (await res.json()) as ApiOrder[];
        if (!cancelled) setOrders(data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "載入訂單失敗");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredOrders = useMemo(
    () => orders.filter((o) => statusMatchesFilter(o.status, statusFilter)),
    [orders, statusFilter]
  );

  if (!env.neonAuthConfigured) {
    return (
      <section className="rounded-2xl border border-ocean-100 bg-white p-8 shadow-sm">
        <p className="text-base text-ocean-700">
          請設定 Neon Auth 環境變數以啟用訂單管理（需 Neon 資料庫 + Neon Auth）。
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm sm:p-8">
      <SignedOut>
        <p className="text-base text-ocean-700">
          請先{" "}
          <Link href="/account/auth" className="font-semibold text-celadon-700 underline">
            登入
          </Link>{" "}
          以查看訂單紀錄。
        </p>
      </SignedOut>

      <SignedIn>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-ocean-900">我的訂單</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as FilterLabel)}
            className="min-h-[44px] rounded-lg border border-ocean-200 px-3 text-base text-ocean-800 focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-200"
            aria-label="訂單狀態篩選"
          >
            <option value="全部">全部狀態</option>
            <option value="處理中">處理中</option>
            <option value="配送中">配送中</option>
            <option value="已完成">已完成</option>
          </select>
        </div>

        {loading && (
          <p className="text-base text-ocean-600" aria-busy="true">
            載入訂單中…
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-coral-100 px-4 py-3 text-base text-coral-500" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <ul className="space-y-4">
            {filteredOrders.map((order) => (
              <li
                key={order.id}
                className="rounded-xl border border-ocean-100 bg-ocean-50/40 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-ocean-900">{order.orderNumber}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_CLASS[order.status]}`}
                  >
                    {ORDER_STATUS_LABEL[order.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ocean-600">
                  下單日期：{new Date(order.createdAt).toLocaleDateString("zh-TW")}
                </p>
                <p className="mt-2 text-base text-ocean-700">
                  商品：
                  {order.items
                    .map((i) => `${i.productName} x${i.quantity}`)
                    .join("、")}
                </p>
                <p className="mt-2 text-lg font-semibold text-ocean-900">
                  訂單金額：NT$ {order.totalAmount.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && filteredOrders.length === 0 && (
          <p className="rounded-lg bg-ocean-50 px-4 py-6 text-center text-base text-ocean-600">
            尚無符合條件的訂單。
          </p>
        )}
      </SignedIn>
    </section>
  );
}
