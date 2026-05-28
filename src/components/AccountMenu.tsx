"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-ocean-200 bg-white text-ocean-800 transition-colors hover:border-celadon-500 hover:text-celadon-700 focus:outline-none focus:ring-2 focus:ring-celadon-300"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="會員功能選單"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M4 20c1.6-3.2 4.3-4.8 8-4.8s6.4 1.6 8 4.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="會員功能"
          className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-ocean-100 bg-white shadow-lg"
        >
          <div className="border-b border-ocean-100 bg-ocean-50 px-4 py-3">
            <p className="text-sm text-ocean-600">會員中心</p>
            <p className="text-base font-semibold text-ocean-900">歡迎來到 SEEFOOD</p>
          </div>
          <ul className="py-1 text-base">
            <li>
              <Link
                href="/account/auth"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-ocean-800 transition-colors hover:bg-ocean-50 hover:text-celadon-700"
              >
                會員註冊 / 登入
              </Link>
            </li>
            <li>
              <Link
                href="/account/orders"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-ocean-800 transition-colors hover:bg-ocean-50 hover:text-celadon-700"
              >
                訂單管理
              </Link>
            </li>
            <li>
              <Link
                href="/account/coupons"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-ocean-800 transition-colors hover:bg-ocean-50 hover:text-celadon-700"
              >
                我的優惠券
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
