import { NextResponse } from "next/server";
import { getAuthUserId } from "@/lib/auth/session";
import { prisma, isDatabaseConfigured } from "@/lib/db";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "資料庫未設定" }, { status: 503 });
  }

  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "請先登入" }, { status: 401 });
  }

  const welcome = await prisma.coupon.findUnique({
    where: { code: "WELCOME120" },
  });

  if (welcome) {
    await prisma.userCoupon.upsert({
      where: {
        userId_couponId: {
          userId,
          couponId: welcome.id,
        },
      },
      create: { userId, couponId: welcome.id },
      update: {},
    });
  }

  const userCoupons = await prisma.userCoupon.findMany({
    where: { userId },
    include: { coupon: true },
    orderBy: { coupon: { expiresAt: "asc" } },
  });

  const coupons = userCoupons.map((uc) => ({
    id: uc.id,
    code: uc.coupon.code,
    title: uc.coupon.title,
    discount: uc.coupon.discountText,
    expiresAt: uc.coupon.expiresAt.toISOString().slice(0, 10),
    used: Boolean(uc.usedAt),
  }));

  return NextResponse.json(coupons);
}
