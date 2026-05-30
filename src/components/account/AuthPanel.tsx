"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { useState } from "react";
import { env } from "@/lib/env";

type AuthMode = "login" | "register";

export function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>("login");

  if (!env.clerkPublishableKey) {
    return (
      <section className="rounded-2xl border border-ocean-100 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-ocean-900">會員系統尚未設定</h2>
        <p className="mt-3 text-base text-ocean-700">
          請在 Vercel / 本地環境設定 Clerk 金鑰（
          <code className="text-sm">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>、
          <code className="text-sm">CLERK_SECRET_KEY</code>），即可啟用 Google、LINE
          與 Email 登入。
        </p>
      </section>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-2xl border border-ocean-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`min-h-[44px] rounded-lg px-4 text-base font-medium transition-colors ${
              mode === "login"
                ? "bg-ocean-900 text-white"
                : "bg-ocean-50 text-ocean-700 hover:bg-ocean-100"
            }`}
          >
            會員登入
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`min-h-[44px] rounded-lg px-4 text-base font-medium transition-colors ${
              mode === "register"
                ? "bg-ocean-900 text-white"
                : "bg-ocean-50 text-ocean-700 hover:bg-ocean-100"
            }`}
          >
            會員註冊
          </button>
        </div>

        {mode === "login" ? (
          <SignIn
            routing="hash"
            signUpUrl="/account/auth#register"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 p-0",
              },
            }}
          />
        ) : (
          <SignUp
            routing="hash"
            signInUrl="/account/auth"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 p-0",
              },
            }}
          />
        )}
      </section>

      <aside className="rounded-2xl border border-ocean-100 bg-ocean-50/60 p-6">
        <h2 className="text-lg font-semibold text-ocean-900">登入方式</h2>
        <ul className="mt-4 space-y-3 text-base text-ocean-700">
          <li>Google 帳號（於 Clerk Dashboard 啟用）</li>
          <li>LINE 帳號（於 Clerk Dashboard 設定 Custom OAuth）</li>
          <li>Email + 密碼</li>
        </ul>
        <p className="mt-6 text-sm text-ocean-600">
          登入後可於「訂單管理」「我的優惠券」查看個人資料。金流由綠界 ECPay 處理。
        </p>
      </aside>
    </div>
  );
}
