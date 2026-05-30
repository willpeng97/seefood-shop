import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/products(.*)",
  "/checkout(.*)",
  "/checkout/result(.*)",
  "/account/auth(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/products(.*)",
  "/api/orders",
  "/api/checkout",
  "/api/payment/ecpay/callback",
  "/api/payment/ecpay/checkout",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!process.env.CLERK_SECRET_KEY) {
    return;
  }
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf)).*)",
    "/(api|trpc)(.*)",
  ],
};
