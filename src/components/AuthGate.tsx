"use client";

import { authClient } from "@/lib/auth/client";
import { env } from "@/lib/env";

function useAuthState() {
  const { data, isPending } = authClient.useSession();
  const isLoaded = env.neonAuthConfigured ? !isPending : true;
  const isSignedIn = Boolean(data?.user);
  return { isLoaded, isSignedIn };
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuthState();
  if (!isLoaded || !isSignedIn) return null;
  return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuthState();
  if (!isLoaded || isSignedIn) return null;
  return <>{children}</>;
}
