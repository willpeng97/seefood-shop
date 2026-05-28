"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { AccountMenu } from "@/components/AccountMenu";

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 border-b border-ocean-100/80 bg-white/95 text-ocean-900 shadow-sm backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="主要導覽"
      >
        <div className="flex flex-col">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight hover:text-celadon-700 focus:outline-none focus:ring-2 focus:ring-celadon-400 rounded"
          >
            SEEFOOD｜遇見鮮食
          </Link>
          <p className="hidden text-xs text-ocean-600 sm:block">遇見最新鮮的日常</p>
        </div>

        <ul className="flex items-center gap-3 sm:gap-6 text-base font-medium">
          <li>
            <Link
              href="/products"
              className="min-h-[44px] flex items-center hover:text-celadon-700 focus:outline-none focus:ring-2 focus:ring-celadon-400 rounded px-1"
            >
              全部商品
            </Link>
          </li>
          <li>
            <AccountMenu />
          </li>
          <li>
            <Link
              href="/checkout"
              className="relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-ocean-900 px-4 py-2 font-semibold text-white hover:bg-celadon-700 focus:outline-none focus:ring-2 focus:ring-celadon-300 focus:ring-offset-2"
              aria-label={`購物車，共 ${totalItems} 件商品`}
            >
              購物車
              {totalItems > 0 && (
                <span
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-coral-500 text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
