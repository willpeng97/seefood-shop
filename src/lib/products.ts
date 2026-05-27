import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

const products = productsData as Product[];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return products.filter((p) => p.category === category);
}
