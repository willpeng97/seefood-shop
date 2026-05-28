import type { Metadata } from "next";
import { CouponsPanel } from "@/components/account/CouponsPanel";

export const metadata: Metadata = {
  title: "我的優惠券 | SEEFOOD｜遇見鮮食",
  description: "管理可使用優惠券與代碼（前端 Mock 資料）。",
};

export default function CouponsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-ocean-900 sm:text-4xl">我的優惠券</h1>
        <p className="mt-2 text-lg text-ocean-700">
          顯示可用與歷史優惠券，支援複製折扣碼。此頁為前端示意，尚未串接後端優惠券 API。
        </p>
      </header>
      <CouponsPanel />
    </div>
  );
}
