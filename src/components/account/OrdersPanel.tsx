"use client";

import { useMemo, useState } from "react";

type OrderStatus = "處理中" | "配送中" | "已完成";

interface MockOrder {
  id: string;
  createdAt: string;
  amount: number;
  status: OrderStatus;
  items: string[];
}

const MOCK_ORDERS: MockOrder[] = [
  {
    id: "SF-202605-0012",
    createdAt: "2026-05-20",
    amount: 1280,
    status: "配送中",
    items: ["去刺金目鱸魚排", "野生白蝦仁"],
  },
  {
    id: "SF-202605-0008",
    createdAt: "2026-05-12",
    amount: 320,
    status: "已完成",
    items: ["一夜干午仔魚"],
  },
  {
    id: "SF-202604-0041",
    createdAt: "2026-04-26",
    amount: 1680,
    status: "處理中",
    items: ["帝王蟹腳"],
  },
];

const STATUS_CLASS: Record<OrderStatus, string> = {
  處理中: "bg-coral-100 text-coral-500",
  配送中: "bg-celadon-50 text-celadon-700",
  已完成: "bg-ocean-50 text-ocean-700",
};

export function OrdersPanel() {
  const [statusFilter, setStatusFilter] = useState<"全部" | OrderStatus>("全部");

  const filteredOrders = useMemo(
    () =>
      statusFilter === "全部"
        ? MOCK_ORDERS
        : MOCK_ORDERS.filter((order) => order.status === statusFilter),
    [statusFilter]
  );

  return (
    <section className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-ocean-900">我的訂單</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "全部" | OrderStatus)}
          className="min-h-[44px] rounded-lg border border-ocean-200 px-3 text-base text-ocean-800 focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-200"
          aria-label="訂單狀態篩選"
        >
          <option value="全部">全部狀態</option>
          <option value="處理中">處理中</option>
          <option value="配送中">配送中</option>
          <option value="已完成">已完成</option>
        </select>
      </div>

      <ul className="space-y-4">
        {filteredOrders.map((order) => (
          <li key={order.id} className="rounded-xl border border-ocean-100 bg-ocean-50/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold text-ocean-900">{order.id}</p>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_CLASS[order.status]}`}>
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-ocean-600">下單日期：{order.createdAt}</p>
            <p className="mt-2 text-base text-ocean-700">
              商品：{order.items.join("、")}
            </p>
            <p className="mt-2 text-lg font-semibold text-ocean-900">
              訂單金額：NT$ {order.amount.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {filteredOrders.length === 0 && (
        <p className="rounded-lg bg-ocean-50 px-4 py-6 text-center text-base text-ocean-600">
          沒有符合條件的訂單（前端 Mock）。
        </p>
      )}
    </section>
  );
}
