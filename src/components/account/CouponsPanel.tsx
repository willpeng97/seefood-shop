"use client";

import { useState } from "react";

interface Coupon {
  id: string;
  code: string;
  title: string;
  discount: string;
  expiresAt: string;
  used: boolean;
}

const MOCK_COUPONS: Coupon[] = [
  {
    id: "cp-01",
    code: "WELCOME120",
    title: "新會員迎新券",
    discount: "滿 NT$ 1,200 折 NT$ 120",
    expiresAt: "2026-06-30",
    used: false,
  },
  {
    id: "cp-02",
    code: "SHIPFREE",
    title: "冷凍免運券",
    discount: "冷凍配送免運乙次",
    expiresAt: "2026-07-15",
    used: false,
  },
  {
    id: "cp-03",
    code: "FISH88",
    title: "海味週末券",
    discount: "指定魚類商品 88 折",
    expiresAt: "2026-05-10",
    used: true,
  },
];

export function CouponsPanel() {
  const [onlyValid, setOnlyValid] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const coupons = onlyValid ? MOCK_COUPONS.filter((c) => !c.used) : MOCK_COUPONS;

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1600);
  };

  return (
    <section className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm sm:p-8">
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

      <ul className="space-y-4">
        {coupons.map((coupon) => (
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
    </section>
  );
}
