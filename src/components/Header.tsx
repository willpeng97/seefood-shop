"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 border-b border-ocean-200 bg-ocean-900 text-white shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="主要導覽"
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:text-celadon-200 focus:outline-none focus:ring-2 focus:ring-celadon-400 rounded"
        >
          鱸好家
        </Link>

        <ul className="flex items-center gap-4 sm:gap-8 text-base font-medium">
          <li>
            <Link
              href="/products"
              className="min-h-[44px] flex items-center hover:text-celadon-200 focus:outline-none focus:ring-2 focus:ring-celadon-400 rounded px-1"
            >
              全部商品
            </Link>
          </li>
          <li>
            <Link
              href="/checkout"
              className="relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-900"
              aria-label={`購物車，共 ${totalItems} 件商品`}
            >
              購物車
              {totalItems > 0 && (
                <span
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-ocean-900"
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
