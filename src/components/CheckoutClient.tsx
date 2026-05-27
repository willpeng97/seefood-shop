"use client";

import dynamic from "next/dynamic";

const OnePageCheckout = dynamic(
  () =>
    import("@/components/OnePageCheckout").then((m) => m.OnePageCheckout),
  {
    loading: () => (
      <div
        className="h-96 animate-pulse rounded-xl bg-ocean-100"
        aria-busy="true"
        aria-label="載入結帳頁面"
      />
    ),
    ssr: false,
  }
);

export function CheckoutClient() {
  return <OnePageCheckout />;
}
