import { PrismaClient } from "@prisma/client";
import { seedProducts } from "./seed-products";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding products...");
  for (const product of seedProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      create: product,
      update: product,
    });
  }

  console.log("Seeding coupons...");
  const coupons = [
    {
      code: "WELCOME120",
      title: "新會員迎新券",
      discountText: "滿 NT$ 1,200 折 NT$ 120",
      minAmount: 1200,
      discountAmount: 120,
      expiresAt: new Date("2026-12-31"),
    },
    {
      code: "SHIPFREE",
      title: "冷凍免運券",
      discountText: "冷凍配送免運乙次",
      minAmount: null,
      discountAmount: null,
      expiresAt: new Date("2026-12-31"),
    },
    {
      code: "FISH88",
      title: "海味週末券",
      discountText: "指定魚類商品 88 折",
      minAmount: 500,
      discountAmount: null,
      expiresAt: new Date("2026-06-30"),
    },
  ];

  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      create: c,
      update: c,
    });
  }

  const demoUserId = process.env.NEON_AUTH_DEMO_USER_ID;
  if (demoUserId) {
    const allCoupons = await prisma.coupon.findMany();
    for (const coupon of allCoupons) {
      await prisma.userCoupon.upsert({
        where: {
          userId_couponId: {
            userId: demoUserId,
            couponId: coupon.id,
          },
        },
        create: {
          userId: demoUserId,
          couponId: coupon.id,
          usedAt: coupon.code === "FISH88" ? new Date() : null,
        },
        update: {},
      });
    }
    console.log(`Assigned coupons to demo user ${demoUserId}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
