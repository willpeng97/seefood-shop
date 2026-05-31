import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/db";
import { getProducts } from "@/lib/products";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "資料庫未設定" }, { status: 503 });
  }
  const products = await getProducts();
  return NextResponse.json(products);
}
