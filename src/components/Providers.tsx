"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { authClient } from "@/lib/auth/client";
import { env } from "@/lib/env";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  if (!env.neonAuthConfigured) {
    return <>{children}</>;
  }

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      emailOTP
      social={{
        providers: ["google"],
      }}
      redirectTo="/account/orders"
      Link={Link}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
