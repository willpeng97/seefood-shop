"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const THUMB_LABELS = ["商品圖", "比例尺", "情境圖"];

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-ocean-100 bg-ocean-50 shadow-sm">
        <Image
          src={activeSrc}
          alt={
            activeIndex === 1
              ? `${productName} 比例尺參考圖`
              : `${productName} 商品圖 ${activeIndex + 1}`
          }
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <ul
          className="flex gap-3 overflow-x-auto pb-1"
          role="listbox"
          aria-label="商品圖片選擇"
        >
          {images.map((src, index) => (
            <li key={src} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  activeIndex === index
                    ? "border-celadon-600 ring-2 ring-celadon-200"
                    : "border-ocean-200 hover:border-ocean-400"
                }`}
              >
                <Image
                  src={src}
                  alt={`${THUMB_LABELS[index] ?? "圖"} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {activeIndex === 1 && (
        <p className="rounded-lg bg-ocean-50 px-4 py-3 text-base text-ocean-700">
          比例尺參考：以雙手持握或日常用品對照，協助判斷實際大小
        </p>
      )}
    </div>
  );
}
