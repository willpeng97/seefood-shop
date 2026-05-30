"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { env } from "@/lib/env";

export function Providers({ children }: { children: React.ReactNode }) {
  if (!env.clerkPublishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/account/orders"
      signUpFallbackRedirectUrl="/account/coupons"
    >
      {children}
    </ClerkProvider>
  );
}
