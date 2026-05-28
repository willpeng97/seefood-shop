import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { TempLayerBadge } from "./TempLayerBadge";
import { AddToCartButton } from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-ocean-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-celadon-500 focus-visible:ring-offset-2"
        aria-label={`查看 ${product.name} 商品詳情`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-ocean-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute left-3 top-3">
            <TempLayerBadge layer={product.temp_layer} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h2 className="text-lg font-semibold text-ocean-900 group-hover:text-celadon-700">
            {product.name}
          </h2>
          <p className="mt-1 text-base text-ocean-600">{product.weight_range}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded bg-ocean-50 px-2 py-0.5 text-sm text-ocean-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-xl font-bold text-ocean-900">
              NT$ {product.price.toLocaleString()}
            </p>
            {product.original_price && product.original_price > product.price && (
              <p className="text-sm text-ocean-400 line-through">
                NT$ {product.original_price.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="border-t border-ocean-50 px-4 pb-4 pt-3">
        <AddToCartButton product={product} compact />
      </div>
    </article>
  );
}
