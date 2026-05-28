"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";

interface AddToCartButtonProps {
  product: Product;
  compact?: boolean;
  label?: string;
  buyNow?: boolean;
  quantity?: number;
}

export function AddToCartButton({
  product,
  compact = false,
  label = "加入購物車",
  buyNow = false,
  quantity = 1,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const handleClick = () => {
    addItem(product, quantity);
    if (buyNow) router.push("/checkout");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        compact
          ? "min-h-[44px] min-w-[44px] rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          : "min-h-[48px] w-full rounded-xl bg-accent px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      }
      aria-label={`將 ${product.name} 加入購物車`}
    >
      {compact ? "加入" : label}
    </button>
  );
}
