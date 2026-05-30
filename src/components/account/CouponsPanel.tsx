"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut } from "@/components/AuthGate";
import Link from "next/link";
import { env } from "@/lib/env";

interface Coupon {
  id: string;
  code: string;
  title: string;
  discount: string;
  expiresAt: string;
  used: boolean;
}

export function CouponsPanel() {
  const [onlyValid, setOnlyValid] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/coupons");
        if (res.status === 401) {
          if (!cancelled) setError("請先登入以查看優惠券");
          return;
        }
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "載入失敗");
        }
        const data = (await res.json()) as Coupon[];
        if (!cancelled) setCoupons(data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "載入優惠券失敗");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = onlyValid ? coupons.filter((c) => !c.used) : coupons;

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1600);
  };

  if (!env.neonAuthConfigured) {
    return (
      <section className="rounded-2xl border border-ocean-100 bg-white p-8 shadow-sm">
        <p className="text-base text-ocean-700">
          請設定 Neon Auth 環境變數以啟用優惠券功能（需 Neon 資料庫 + Neon Auth）。
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
          以領取與查看優惠券。
        </p>
      </SignedOut>

      <SignedIn>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-ocean-900">我的優惠券</h2>
          <button
            type="button"
            onClick={() => setOnlyValid((v) => !v)}
            className="min-h-[44px] rounded-lg border border-ocean-200 px-4 text-sm font-medium text-ocean-700 transition-colors hover:bg-ocean-50"
          >
            {onlyValid ? "顯示全部優惠券" : "只看可使用"}
          </button>
        </div>

        {loading && <p className="text-base text-ocean-600">載入中…</p>}
        {error && (
          <p className="rounded-lg bg-coral-100 px-4 py-3 text-coral-500" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <ul className="space-y-4">
            {visible.map((coupon) => (
              <li
                key={coupon.id}
                className={`rounded-xl border p-4 ${
                  coupon.used
                    ? "border-ocean-100 bg-ocean-50/60 opacity-70"
                    : "border-celadon-200 bg-celadon-50/50"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-ocean-900">{coupon.title}</p>
                    <p className="mt-1 text-base text-ocean-700">{coupon.discount}</p>
                    <p className="mt-2 text-sm text-ocean-600">到期日：{coupon.expiresAt}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      coupon.used
                        ? "bg-ocean-100 text-ocean-700"
                        : "bg-coral-100 text-coral-500"
                    }`}
                  >
                    {coupon.used ? "已使用" : "可使用"}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <code className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-ocean-900">
                    {coupon.code}
                  </code>
                  {!coupon.used && (
                    <button
                      type="button"
                      onClick={() => copyCode(coupon.code)}
                      className="min-h-[40px] rounded-lg bg-ocean-900 px-4 text-sm font-medium text-white transition-colors hover:bg-celadon-700"
                    >
                      {copiedCode === coupon.code ? "已複製" : "複製代碼"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && visible.length === 0 && (
          <p className="rounded-lg bg-ocean-50 px-4 py-6 text-center text-ocean-600">
            目前沒有優惠券。
          </p>
        )}
      </SignedIn>
    </section>
  );
}
