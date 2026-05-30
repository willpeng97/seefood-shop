import productsData from "@/data/products.json";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { mapDbProductToProduct } from "@/lib/product-mapper";
import type { Product } from "@/types/product";

const fallbackProducts = productsData as Product[];

export function getProductGallery(product: Product): string[] {
  if (product.gallery && product.gallery.length > 0) {
    return product.gallery;
  }
  return [product.image, product.scale_image];
}

export async function getProducts(): Promise<Product[]> {
  if (!isDatabaseConfigured()) {
    return fallbackProducts;
  }
  try {
    const rows = await prisma.product.findMany({ orderBy: { name: "asc" } });
    return rows.map(mapDbProductToProduct);
  } catch {
    return fallbackProducts;
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!isDatabaseConfigured()) {
    return fallbackProducts.find((p) => p.id === id);
  }
  try {
    const row = await prisma.product.findUnique({ where: { id } });
    return row ? mapDbProductToProduct(row) : undefined;
  } catch {
    return fallbackProducts.find((p) => p.id === id);
  }
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const products = await getProducts();
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = products.filter((p) => p.id !== product.id);
  return [...sameCategory, ...others.filter((p) => !sameCategory.includes(p))].slice(
    0,
    limit
  );
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}
