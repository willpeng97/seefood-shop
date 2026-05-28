import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

const products = productsData as Product[];

export function getProductGallery(product: Product): string[] {
  if (product.gallery && product.gallery.length > 0) {
    return product.gallery;
  }
  return [product.image, product.scale_image];
}

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
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
  return products.filter((p) => p.category === category);
}
