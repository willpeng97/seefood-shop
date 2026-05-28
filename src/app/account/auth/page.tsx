import type { Metadata } from "next";
import { AuthPanel } from "@/components/account/AuthPanel";

export const metadata: Metadata = {
  title: "會員註冊與登入 | SEEFOOD｜遇見鮮食",
  description: "會員註冊與登入介面，支援 Google 與 LINE 登入（前端示意）。",
};

export default function AuthPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-ocean-900 sm:text-4xl">會員註冊與登入</h1>
        <p className="mt-2 text-lg text-ocean-700">
          提供 Email 帳號、Google 與 LINE 登入流程。此頁為前端介面，尚未串接後端驗證。
        </p>
      </header>
      <AuthPanel />
    </div>
  );
}
