export type ShopProductCategory = "dairy" | "poultry" | "eggs" | "other";

export type ShopProductUnit =
  | "tray"
  | "piece"
  | "liter"
  | "bottle"
  | "kg"
  | "whole_chicken"
  | "package";

export type ShopOrderStatus =
  | "awaiting_payment"
  | "paid"
  | "preparing"
  | "ready_for_pickup"
  | "collected"
  | "cancelled";

export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  category: ShopProductCategory;
  unit: ShopProductUnit;
  priceETB: number;
  availableStock: number;
  isActive: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

export interface ShopOrderItem {
  id: string;
  productId: string;
  productName: string;
  unit: ShopProductUnit;
  unitPriceETB: number;
  quantity: number;
  totalETB: number;
}

export interface ShopOrder {
  id: string;
  orderNumber: string; // e.g. "SHP-9021"
  customerId: string;
  items: ShopOrderItem[];
  totalAmountETB: number;
  status: ShopOrderStatus;
  paymentId?: string;
  pickupLocation: string;
  pickupDate?: string;
  collectedAt?: string;
  createdAt: string;
  updatedAt: string;
}
