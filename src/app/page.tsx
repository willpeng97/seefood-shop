import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 3);

  return (
    <>
      <Hero />

      <section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">
          品牌特色
        </h2>
        <ul className="grid gap-8 sm:grid-cols-3">
          <li className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-ocean-900">Fresh｜新鮮鎖鮮</h3>
            <p className="mt-2 text-base text-ocean-700">
              從產地到冷鏈，全程控溫與職人處理，保留海鮮最自然的鮮甜。
            </p>
          </li>
          <li className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-ocean-900">Curated｜精選選品</h3>
            <p className="mt-2 text-base text-ocean-700">
              以生活提案方式挑選每款商品，讓忙碌都會族群也能輕鬆吃得好。
            </p>
          </li>
          <li className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-ocean-900">Trustworthy｜透明可信</h3>
            <p className="mt-2 text-base text-ocean-700">
              產地、處理流程與檢驗報告清楚揭露，看見食材真正的樣子。
            </p>
          </li>
        </ul>
      </section>

      <section
        className="bg-ocean-50 py-16"
        aria-labelledby="featured-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2
              id="featured-heading"
              className="text-3xl font-semibold text-ocean-900"
            >
              本週精選
            </h2>
            <Link
              href="/products"
              className="min-h-[44px] flex items-center text-base font-semibold text-celadon-700 hover:text-celadon-900 underline underline-offset-4"
            >
              查看全部
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
