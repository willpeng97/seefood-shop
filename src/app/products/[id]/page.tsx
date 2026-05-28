import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/products";
import { TempLayerBadge } from "@/components/TempLayerBadge";
import { TraceabilityCard } from "@/components/TraceabilityCard";
import { AddToCartButton } from "@/components/AddToCartButton";

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
    title: `${product.name} | 鱸好家`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav aria-label="麵包屑" className="mb-6 text-base text-ocean-600">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-celadon-700 underline-offset-2 hover:underline">
              首頁
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/products"
              className="hover:text-celadon-700 underline-offset-2 hover:underline"
            >
              商品
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ocean-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-ocean-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <figure className="overflow-hidden rounded-2xl border border-ocean-200 bg-white">
            <div className="relative aspect-[4/3]">
              <Image
                src={product.scale_image}
                alt={`${product.name} 比例尺參考：雙手持握或日常用品對照，協助判斷實際大小`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="px-4 py-3 text-base text-ocean-700 bg-ocean-50">
              比例尺參考圖：以雙手持握或日常用品對照，消除網購海鮮尺寸焦慮
            </figcaption>
          </figure>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <TempLayerBadge layer={product.temp_layer} />
            <span className="text-base text-ocean-600">{product.category}</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold text-ocean-900 sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-2 text-lg text-ocean-600">
            規格：{product.weight_range}
          </p>

          <p className="mt-4 text-3xl font-bold text-ocean-900">
            NT$ {product.price.toLocaleString()}
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ocean-800">
            {product.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="商品標籤">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-celadon-50 px-3 py-1 text-base text-celadon-900"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <AddToCartButton product={product} label="立即購買" buyNow />
            <AddToCartButton product={product} label="加入購物車" />
          </div>

          <div className="mt-10">
            <TraceabilityCard
              traceability={product.traceability}
              productName={product.name}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
