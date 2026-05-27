export type TempLayer = "frozen" | "ambient";

export interface Traceability {
  origin: string;
  harvest_date?: string;
  certification_url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight_range: string;
  temp_layer: TempLayer;
  traceability: Traceability;
  tags: string[];
  image: string;
  scale_image: string;
  category: string;
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
