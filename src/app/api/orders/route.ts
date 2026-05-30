import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { getProductById } from "@/lib/products";
import { generateOrderNumber, toEcpayMerchantTradeNo } from "@/lib/orders";
import { OrderStatus } from "@prisma/client";

interface CreateOrderBody {
  items: { id: string; quantity: number }[];
  shipping: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod?: string;
  note?: string;
}

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "資料庫未設定" }, { status: 503 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "請先登入" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { clerkUserId: userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "資料庫未設定" }, { status: 503 });
  }

  const body = (await request.json()) as CreateOrderBody;
  const { userId } = await auth();

  if (!body.items?.length) {
    return NextResponse.json({ error: "購物車是空的" }, { status: 400 });
  }

  const lineItems: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[] = [];

  let totalAmount = 0;

  for (const item of body.items) {
    const product = await getProductById(item.id);
    if (!product) {
      return NextResponse.json(
        { error: `找不到商品：${item.id}` },
        { status: 400 }
      );
    }
    if (product.stock_status === "out_of_stock") {
      return NextResponse.json(
        { error: `${product.name} 已售完` },
        { status: 400 }
      );
    }
    const qty = Math.min(99, Math.max(1, item.quantity));
    lineItems.push({
      productId: product.id,
      productName: product.name,
      quantity: qty,
      unitPrice: product.price,
    });
    totalAmount += product.price * qty;
  }

  const orderNumber = generateOrderNumber();
  const paymentMethod = body.paymentMethod ?? "ecpay";

  const order = await prisma.order.create({
    data: {
      orderNumber,
      ecpayMerchantTradeNo: toEcpayMerchantTradeNo(orderNumber),
      clerkUserId: userId ?? null,
      status: OrderStatus.PENDING_PAYMENT,
      totalAmount,
      recipientName: body.shipping.name,
      phone: body.shipping.phone,
      email: body.shipping.email,
      address: body.shipping.address,
      city: body.shipping.city,
      postalCode: body.shipping.postalCode,
      note: body.note ?? null,
      paymentMethod,
      items: {
        create: lineItems.map((li) => ({
          productId: li.productId,
          productName: li.productName,
          quantity: li.quantity,
          unitPrice: li.unitPrice,
        })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json({
    success: true,
    orderId: order.id,
    orderNumber: order.orderNumber,
    totalAmount: order.totalAmount,
    paymentUrl: `/api/payment/ecpay/checkout?orderNumber=${encodeURIComponent(order.orderNumber)}`,
  });
}
