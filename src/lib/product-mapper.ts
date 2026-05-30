import type { Product as DbProduct } from "@prisma/client";
import type { Product, Traceability, TempLayer, StockStatus } from "@/types/product";

export function mapDbProductToProduct(row: DbProduct): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    detail_intro: row.detailIntro,
    price: row.price,
    original_price: row.originalPrice ?? undefined,
    weight_range: row.weightRange,
    temp_layer: row.tempLayer as TempLayer,
    traceability: {
      origin: row.traceOrigin,
      harvest_date: row.traceHarvestDate ?? undefined,
      certification_url: row.traceCertUrl,
    } satisfies Traceability,
    tags: row.tags,
    image: row.image,
    scale_image: row.scaleImage,
    gallery: row.gallery,
    category: row.category,
    sku: row.sku,
    stock_status: row.stockStatus as StockStatus,
    promo_label: row.promoLabel ?? undefined,
    spec_items: row.specItems,
    shipping_info: row.shippingInfo,
  };
}
