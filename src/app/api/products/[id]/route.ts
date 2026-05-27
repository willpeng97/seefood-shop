import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "找不到商品" }, { status: 404 });
  }

  return NextResponse.json(product);
}
