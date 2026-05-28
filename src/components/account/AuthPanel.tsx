"use client";

import { useState } from "react";

type AuthMode = "login" | "register";

export function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const submitText = mode === "login" ? "登入" : "建立帳號";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(
      mode === "login"
        ? "前端 Mock：已模擬登入成功，後續可串接會員 API。"
        : "前端 Mock：已建立會員資料，後續可串接註冊 API。"
    );
  };

  const mockSso = (provider: "Google" | "LINE") => {
    setMessage(`前端 Mock：已觸發 ${provider} OAuth 流程，後續串接正式登入。`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label htmlFor="name" className="mb-1 block text-base font-medium text-ocean-800">
                姓名
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="min-h-[48px] w-full rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-200"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1 block text-base font-medium text-ocean-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-[48px] w-full rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-base font-medium text-ocean-800"
            >
              密碼
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-[48px] w-full rounded-lg border border-ocean-200 px-4 text-base focus:border-celadon-500 focus:outline-none focus:ring-2 focus:ring-celadon-200"
            />
          </div>

          <button
            type="submit"
            className="min-h-[50px] w-full rounded-xl bg-ocean-900 px-6 text-lg font-semibold text-white transition-colors hover:bg-celadon-700"
          >
            {submitText}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-ocean-100" />
          <span className="text-sm text-ocean-500">或使用第三方登入</span>
          <span className="h-px flex-1 bg-ocean-100" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => mockSso("Google")}
            className="min-h-[48px] rounded-lg border border-ocean-200 bg-white px-4 text-base font-medium text-ocean-800 transition-colors hover:border-celadon-400 hover:bg-ocean-50"
          >
            使用 Google 登入
          </button>
          <button
            type="button"
            onClick={() => mockSso("LINE")}
            className="min-h-[48px] rounded-lg border border-[#06C755]/40 bg-white px-4 text-base font-medium text-[#06C755] transition-colors hover:bg-[#06C755]/10"
          >
            使用 LINE 登入
          </button>
        </div>

        {message && (
          <p className="mt-5 rounded-lg bg-ocean-50 px-4 py-3 text-base text-ocean-700" role="status">
            {message}
          </p>
        )}
      </section>

      <aside className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-ocean-900">會員權益</h2>
        <ul className="mt-4 space-y-3 text-base text-ocean-700">
          <li>• 即時查看訂單狀態與物流進度（前端介面已預留）</li>
          <li>• 集中管理優惠券與折扣碼</li>
          <li>• 追蹤常購商品與歷史訂單紀錄</li>
        </ul>
        <p className="mt-6 rounded-lg bg-coral-100 px-4 py-3 text-sm text-coral-500">
          提示：目前為純前端示意，尚未串接實際會員、OAuth 與訂單資料 API。
        </p>
      </aside>
    </div>
  );
}
