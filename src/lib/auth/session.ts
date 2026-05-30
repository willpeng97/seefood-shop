import { auth, isNeonAuthConfigured } from "@/lib/auth/server";

export async function getAuthUserId(): Promise<string | null> {
  if (!isNeonAuthConfigured() || !auth) return null;
  const { data: session } = await auth.getSession();
  return session?.user?.id ?? null;
}
