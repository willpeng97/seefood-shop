import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "全部商品 | SEEFOOD｜遇見鮮食",
  description: "瀏覽台灣在地水產，冷凍與常溫商品一覽。",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-ocean-900 sm:text-4xl">
          全部商品
        </h1>
        <p className="mt-2 text-lg text-ocean-700">
          共 {products.length} 項商品，依溫層標記冷凍或常溫配送。
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
