export type TempLayer = "frozen" | "ambient";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Traceability {
  origin: string;
  harvest_date?: string;
  certification_url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  /** 詳情頁「商品介紹」長文 */
  detail_intro: string;
  price: number;
  /** 原價（劃線價），可選 */
  original_price?: number;
  weight_range: string;
  temp_layer: TempLayer;
  traceability: Traceability;
  tags: string[];
  image: string;
  scale_image: string;
  /** 商品圖廊（主圖 + 比例尺等） */
  gallery?: string[];
  category: string;
  sku: string;
  stock_status: StockStatus;
  /** 促銷標語，如「急凍直送限時優惠」 */
  promo_label?: string;
  /** 規格說明（條列） */
  spec_items: string[];
  /** 運送方式說明 */
  shipping_info: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "line_pay" | "credit_card";
  note?: string;
}
