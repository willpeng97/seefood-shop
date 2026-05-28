import type { Metadata } from "next";
import { OrdersPanel } from "@/components/account/OrdersPanel";

export const metadata: Metadata = {
  title: "訂單管理 | SEEFOOD｜遇見鮮食",
  description: "查看歷史訂單、狀態與金額（前端 Mock 資料）。",
};

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-ocean-900 sm:text-4xl">訂單管理</h1>
        <p className="mt-2 text-lg text-ocean-700">
          依狀態快速篩選訂單與查看明細。此頁為前端示意，尚未串接後端訂單 API。
        </p>
      </header>
      <OrdersPanel />
    </div>
  );
}
