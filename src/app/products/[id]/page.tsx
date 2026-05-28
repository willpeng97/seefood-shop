import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getProducts, getRelatedProducts } from "@/lib/products";
import { ProductDetailView } from "@/components/ProductDetailView";

type PageProps = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "商品不存在" };
  return {
    title: `${product.name} | SEEFOOD｜遇見鮮食`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
