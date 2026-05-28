"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { TraceabilityCard } from "./TraceabilityCard";

type TabId = "intro" | "spec" | "shipping";

const TABS: { id: TabId; label: string }[] = [
  { id: "intro", label: "商品介紹" },
  { id: "spec", label: "規格說明" },
  { id: "shipping", label: "運送方式" },
];

interface ProductDetailTabsProps {
  product: Product;
}

export function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("intro");

  return (
    <section className="mt-12" aria-labelledby="product-tabs-heading">
      <h2 id="product-tabs-heading" className="sr-only">
        商品詳細資訊
      </h2>

      <div
        className="flex border-b border-ocean-200"
        role="tablist"
        aria-label="商品資訊分頁"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`min-h-[48px] flex-1 px-4 text-base font-semibold transition-colors sm:flex-none sm:px-8 ${
              activeTab === tab.id
                ? "border-b-2 border-ocean-900 text-ocean-900"
                : "text-ocean-500 hover:text-ocean-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-b-2xl border border-t-0 border-ocean-100 bg-white p-6 sm:p-8">
        {activeTab === "intro" && (
          <div
            id="panel-intro"
            role="tabpanel"
            aria-labelledby="tab-intro"
            className="prose prose-ocean max-w-none"
          >
            {product.detail_intro.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="mb-4 text-lg leading-relaxed text-ocean-800 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-8">
              <TraceabilityCard
                traceability={product.traceability}
                productName={product.name}
              />
            </div>
          </div>
        )}

        {activeTab === "spec" && (
          <div
            id="panel-spec"
            role="tabpanel"
            aria-labelledby="tab-spec"
          >
            <h3 className="text-lg font-semibold text-ocean-900">規格說明</h3>
            <ul className="mt-4 space-y-3">
              {product.spec_items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-lg text-ocean-800 before:content-['•'] before:text-celadon-600"
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "shipping" && (
          <div
            id="panel-shipping"
            role="tabpanel"
            aria-labelledby="tab-shipping"
          >
            <h3 className="text-lg font-semibold text-ocean-900">運送方式</h3>
            <p className="mt-4 text-lg leading-relaxed text-ocean-800">
              {product.shipping_info}
            </p>
            <div className="mt-6 rounded-xl bg-ocean-50 p-4 text-base text-ocean-700">
              <p className="font-medium text-ocean-900">溫層提醒</p>
              <p className="mt-1">
                此商品為「{product.temp_layer === "frozen" ? "冷凍" : "常溫"}
                」配送。購物車內若同時有冷凍與常溫商品，系統將於結帳時標記，未來支援自動拆單。
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
