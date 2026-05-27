import { env } from "@/lib/env";
import type { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${env.apiBaseUrl}/api/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("無法載入商品");
  return res.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${env.apiBaseUrl}/api/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("找不到商品");
  return res.json();
}
