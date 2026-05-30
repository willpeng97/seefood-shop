import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

export function isNeonAuthConfigured(): boolean {
  return Boolean(baseUrl && cookieSecret && cookieSecret.length >= 32);
}

export const auth = isNeonAuthConfigured()
  ? createNeonAuth({
      baseUrl: baseUrl!,
      cookies: { secret: cookieSecret! },
    })
  : null;
