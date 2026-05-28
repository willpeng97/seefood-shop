"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, StockStatus } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { TempLayerBadge } from "./TempLayerBadge";

const STOCK_LABELS: Record<StockStatus, { text: string; className: string }> = {
  in_stock: { text: "尚有庫存", className: "text-celadon-700" },
  low_stock: { text: "庫存不多", className: "text-amber-700" },
  out_of_stock: { text: "已售完", className: "text-red-600" },
};

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const stock = STOCK_LABELS[product.stock_status];
  const isAvailable = product.stock_status !== "out_of_stock";
  const subtotal = product.price * quantity;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    if (!isAvailable) return;
    addItem(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      {product.promo_label && (
        <p className="mb-3 inline-block rounded-lg bg-coral-100 px-3 py-1 text-base font-medium text-coral-500">
          {product.promo_label}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <TempLayerBadge layer={product.temp_layer} />
        <span className="text-base text-ocean-600">{product.category}</span>
      </div>

      <h1 className="mt-3 text-2xl font-bold leading-snug text-ocean-900 sm:text-3xl">
        {product.name}
      </h1>

      <p className="mt-3 text-lg leading-relaxed text-ocean-700">
        {product.description}
      </p>

      <div className="mt-5 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-bold text-coral-500">
          NT$ {product.price.toLocaleString()}
        </span>
        {product.original_price && product.original_price > product.price && (
          <span className="text-xl text-ocean-400 line-through">
            NT$ {product.original_price.toLocaleString()}
          </span>
        )}
      </div>

      <dl className="mt-4 space-y-2 border-t border-ocean-100 pt-4 text-base">
        <div className="flex gap-2">
          <dt className="text-ocean-500">商品編號</dt>
          <dd className="font-medium text-ocean-800">{product.sku}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ocean-500">規格</dt>
          <dd className="font-medium text-ocean-800">{product.weight_range}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ocean-500">供貨狀況</dt>
          <dd className={`font-medium ${stock.className}`}>{stock.text}</dd>
        </div>
      </dl>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="商品標籤">
        {product.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-celadon-50 px-3 py-1 text-sm text-celadon-900"
          >
            {tag}
          </li>
        ))}
      </ul>

      {isAvailable && (
        <div className="mt-6 flex items-center gap-4">
          <label htmlFor="product-quantity" className="text-base font-medium text-ocean-800">
            數量
          </label>
          <div className="flex items-center rounded-lg border border-ocean-200">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-lg hover:bg-ocean-50"
              aria-label="減少數量"
            >
              −
            </button>
            <input
              id="product-quantity"
              type="number"
              min={1}
              max={99}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.min(99, Math.max(1, Number(e.target.value) || 1)))
              }
              className="h-11 w-14 border-x border-ocean-200 text-center text-lg"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              className="flex h-11 w-11 items-center justify-center text-lg hover:bg-ocean-50"
              aria-label="增加數量"
            >
              +
            </button>
          </div>
          <span className="text-base text-ocean-600">
            小計 NT$ {subtotal.toLocaleString()}
          </span>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className="min-h-[52px] flex-1 rounded-xl border-2 border-ocean-800 bg-white px-6 py-3 text-lg font-semibold text-ocean-900 transition-colors hover:bg-ocean-50 focus:outline-none focus:ring-2 focus:ring-ocean-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          加入購物車
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!isAvailable}
          className="min-h-[52px] flex-1 rounded-xl bg-accent px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          立即購買
        </button>
      </div>

      {!isAvailable && (
        <p className="mt-3 text-base text-red-600" role="status">
          此商品目前售完，請選購其他商品或稍後再試。
        </p>
      )}
    </div>
  );
}
