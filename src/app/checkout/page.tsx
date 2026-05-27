import type { Metadata } from "next";
import { CheckoutClient } from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "結帳 | 鱸好家",
  description: "一頁式結帳，整合購物清單、收件資訊與支付方式。",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-ocean-900">結帳</h1>
        <p className="mt-2 text-lg text-ocean-700">
          一頁完成購物清單確認、收件資訊與付款選擇，減少跳轉流失。
        </p>
      </header>
      <CheckoutClient />
    </div>
  );
}
