import Link from "next/link";
import type { Product } from "@/types/product";
import { getProductGallery } from "@/lib/products";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductPurchasePanel } from "./ProductPurchasePanel";
import { ProductDetailTabs } from "./ProductDetailTabs";
import { ProductCard } from "./ProductCard";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const gallery = getProductGallery(product);

  return (
    <article>
      <nav aria-label="麵包屑" className="mb-6 text-base text-ocean-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/"
              className="hover:text-celadon-700 hover:underline underline-offset-2"
            >
              首頁
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/products"
              className="hover:text-celadon-700 hover:underline underline-offset-2"
            >
              全部商品
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-celadon-700 hover:underline underline-offset-2"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ocean-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <ProductImageGallery images={gallery} productName={product.name} />
        <ProductPurchasePanel product={product} />
      </div>

      <ProductDetailTabs product={product} />

      {relatedProducts.length > 0 && (
        <section
          className="mt-16 border-t border-ocean-100 pt-12"
          aria-labelledby="related-heading"
        >
          <h2
            id="related-heading"
            className="text-2xl font-bold text-ocean-900"
          >
            相關商品
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
