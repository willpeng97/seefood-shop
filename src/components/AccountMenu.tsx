"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@/components/AuthGate";
import { env } from "@/lib/env";

function MenuLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="py-1 text-base">
      <li>
        <Link
          href="/account/auth"
          role="menuitem"
          onClick={onNavigate}
          className="block px-4 py-3 text-ocean-800 transition-colors hover:bg-ocean-50 hover:text-celadon-700"
        >
          會員註冊 / 登入
        </Link>
      </li>
      <li>
        <Link
          href="/account/orders"
          role="menuitem"
          onClick={onNavigate}
          className="block px-4 py-3 text-ocean-800 transition-colors hover:bg-ocean-50 hover:text-celadon-700"
        >
          訂單管理
        </Link>
      </li>
      <li>
        <Link
          href="/account/coupons"
          role="menuitem"
          onClick={onNavigate}
          className="block px-4 py-3 text-ocean-800 transition-colors hover:bg-ocean-50 hover:text-celadon-700"
        >
          我的優惠券
        </Link>
      </li>
    </ul>
  );
}

function AccountMenuShell({
  avatar,
  header,
  extraMenuItems,
}: {
  avatar: React.ReactNode;
  header: React.ReactNode;
  extraMenuItems?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
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
        className="flex min-h-[44px] min-w-[44px] items-center justify-center overflow-hidden rounded-lg border border-ocean-200 bg-white text-ocean-800 transition-colors hover:border-celadon-500 hover:text-celadon-700 focus:outline-none focus:ring-2 focus:ring-celadon-300"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="會員功能選單"
      >
        {avatar}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="會員功能"
          className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-ocean-100 bg-white shadow-lg"
        >
          <div className="border-b border-ocean-100 bg-ocean-50 px-4 py-3">
            <p className="text-sm text-ocean-600">會員中心</p>
            {header}
          </div>
          <MenuLinks onNavigate={() => setOpen(false)} />
          {extraMenuItems}
        </div>
      )}
    </div>
  );
}

const DefaultAvatar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M4 20c1.6-3.2 4.3-4.8 8-4.8s6.4 1.6 8 4.8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

function AccountMenuWithClerk() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <AccountMenuShell
      avatar={
        user?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.imageUrl} alt="" className="h-9 w-9 rounded-md object-cover" />
        ) : (
          <DefaultAvatar />
        )
      }
      header={
        <>
          <SignedIn>
            <p className="text-base font-semibold text-ocean-900">
              {user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "會員"}
            </p>
          </SignedIn>
          <SignedOut>
            <p className="text-base font-semibold text-ocean-900">SEEFOOD｜遇見鮮食</p>
          </SignedOut>
        </>
      }
      extraMenuItems={
        <SignedIn>
          <ul className="border-t border-ocean-100 py-1">
            <li>
              <button
                type="button"
                role="menuitem"
                onClick={() => signOut({ redirectUrl: "/" })}
                className="block w-full px-4 py-3 text-left text-ocean-800 transition-colors hover:bg-ocean-50"
              >
                登出
              </button>
            </li>
          </ul>
        </SignedIn>
      }
    />
  );
}

export function AccountMenu() {
  if (!env.clerkPublishableKey) {
    return (
      <AccountMenuShell
        avatar={<DefaultAvatar />}
        header={
          <p className="text-base font-semibold text-ocean-900">SEEFOOD｜遇見鮮食</p>
        }
      />
    );
  }

  return <AccountMenuWithClerk />;
}
