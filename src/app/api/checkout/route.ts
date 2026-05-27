import { NextResponse } from "next/server";

interface CheckoutBody {
  items: { id: string; quantity: number }[];
  shipping: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutBody;

  // 第一階段：Mock 訂單回應，第二階段替換為資料庫與金流 API
  const orderId = `ORD-${Date.now()}`;

  return NextResponse.json({
    success: true,
    orderId,
    message: "訂單已建立（Mock），待串接金流與物流 API",
    received: body,
  });
}
