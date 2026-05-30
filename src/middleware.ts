import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth, isNeonAuthConfigured } from "@/lib/auth/server";

const protectedMatcher = ["/account/orders", "/account/coupons"];

export default function middleware(request: NextRequest) {
  if (!isNeonAuthConfigured() || !auth) {
    return NextResponse.next();
  }

  if (request.headers.has("Next-Action")) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;
  const needsAuth = protectedMatcher.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );

  if (!needsAuth) {
    return NextResponse.next();
  }

  return auth.middleware({ loginUrl: "/account/auth" })(request);
}

export const config = {
  matcher: ["/account/orders/:path*", "/account/coupons/:path*"],
};
