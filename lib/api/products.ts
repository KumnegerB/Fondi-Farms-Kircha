/**
 * Products API Service Layer
 * Connects frontend directly to the deployed backend at sanduq.jirtuu.dev
 */

import { ShopProductCategory, ShopProductUnit } from "@/types/shop";

export interface BackendFarmInfo {
  id: string;
  name: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface BackendProductItem {
  id: string;
  name: string;
  slug?: string;
  category: string;
  description?: string;
  price: string | number;
  currency?: string;
  unit?: string;
  stockQuantity?: string | number;
  minOrderQuantity?: string | number;
  coverImageUrl?: string | null;
  imageUrls?: string[];
  listingStatus?: string;
  isAvailable?: boolean;
  location?: string | null;
  metadata?: Record<string, unknown> | null;
  farmId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  farm?: BackendFarmInfo;
}

export interface BackendProductsResponse {
  data: BackendProductItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FrontendProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  categorySlug:
    | "all"
    | "dairy"
    | "eggs"
    | "poultry"
    | "meat"
    | "honey"
    | "other";
  shopCategory: ShopProductCategory;
  shopUnit: ShopProductUnit;
  priceETB: number;
  unit: string;
  availableStock: number;
  images: string[];
  isAvailable: boolean;
  farmName?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://jxa5jqxyneydse1szmesjqcs.sanduq.jirtuu.dev";

/**
 * Returns a fallback image based on product category
 */
function getDefaultProductImage(category?: string): string {
  const cat = (category || "").toUpperCase();
  if (cat.includes("MEAT") || cat.includes("BEEF"))
    return "/images/arsi_bull.png";
  if (cat.includes("POULTRY") || cat.includes("CHICKEN"))
    return "/images/fresh_milk_yogurt.png";
  if (cat.includes("EGG")) return "/images/fresh_milk_yogurt.png";
  if (cat.includes("HONEY")) return "/images/figma_banner.png";
  return "/images/fresh_milk_yogurt.png";
}

/**
 * Maps category name to filter slug
 */
function mapCategoryToSlug(category?: string): FrontendProduct["categorySlug"] {
  const cat = (category || "").toUpperCase();
  if (cat.includes("DAIRY") || cat.includes("MILK") || cat.includes("YOGURT"))
    return "dairy";
  if (cat.includes("EGG")) return "eggs";
  if (cat.includes("POULTRY") || cat.includes("CHICKEN")) return "poultry";
  if (cat.includes("MEAT") || cat.includes("BEEF")) return "meat";
  if (cat.includes("HONEY")) return "honey";
  return "other";
}

/**
 * Maps to ShopProductCategory
 */
export function mapToShopCategory(category?: string): ShopProductCategory {
  const cat = (category || "").toUpperCase();
  if (cat.includes("DAIRY") || cat.includes("MILK") || cat.includes("YOGURT"))
    return "dairy";
  if (cat.includes("EGG")) return "eggs";
  if (cat.includes("POULTRY") || cat.includes("CHICKEN")) return "poultry";
  return "other";
}

/**
 * Maps to ShopProductUnit
 */
export function mapToShopUnit(unit?: string): ShopProductUnit {
  const u = (unit || "").toLowerCase();
  if (u === "tray") return "tray";
  if (u === "piece") return "piece";
  if (u === "liter" || u === "litre" || u === "l") return "liter";
  if (u === "bottle") return "bottle";
  if (u === "kg" || u === "kilo") return "kg";
  if (u === "whole_chicken" || u === "chicken") return "whole_chicken";
  return "package";
}

/**
 * Maps a backend product to frontend model
 */
export function mapBackendProduct(item: BackendProductItem): FrontendProduct {
  const priceNum = Number(item.price) || 0;
  const stockNum = Number(item.stockQuantity) || 50;
  const defaultImg = getDefaultProductImage(item.category);

  const imagesList: string[] = [];
  if (item.coverImageUrl && item.coverImageUrl.startsWith("http")) {
    imagesList.push(item.coverImageUrl);
  }
  if (Array.isArray(item.imageUrls) && item.imageUrls.length > 0) {
    for (const url of item.imageUrls) {
      if (url && url.startsWith("http") && !imagesList.includes(url)) {
        imagesList.push(url);
      }
    }
  }
  if (imagesList.length === 0) {
    imagesList.push(defaultImg);
  }

  return {
    id: item.id,
    name: item.name,
    description:
      item.description ||
      `${item.name} produced naturally at ${item.farm?.name || "Fondi Farms Ambo"}.`,
    category: item.category,
    categorySlug: mapCategoryToSlug(item.category),
    shopCategory: mapToShopCategory(item.category),
    shopUnit: mapToShopUnit(item.unit),
    priceETB: priceNum,
    unit: (item.unit || "unit").toLowerCase(),
    availableStock: stockNum,
    images: imagesList,
    isAvailable: item.isAvailable ?? true,
    farmName: item.farm?.name || "Fondi Farms",
  };
}

/**
 * Fetches products list from GET /api/products
 */
export async function getProducts(params?: {
  page?: number;
  limit?: number;
  token?: string | null;
}): Promise<FrontendProduct[]> {
  const page = params?.page || 1;
  const limit = params?.limit || 20;

  try {
    const url = `${API_BASE_URL}/api/products?page=${page}&limit=${limit}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (params?.token) {
      headers["Authorization"] = `Bearer ${params.token}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (res.ok) {
      const data: BackendProductsResponse = await res.json();
      if (Array.isArray(data?.data)) {
        return data.data.map(mapBackendProduct);
      }
    } else {
      console.warn(
        `[ProductsAPI] GET /api/products returned status ${res.status}`,
      );
    }
  } catch (err) {
    console.error("[ProductsAPI] Error fetching products:", err);
  }

  return [];
}

/**
 * Fetches single product details from GET /api/products/:id
 */
export async function getProductById(
  id: string,
  token?: string | null,
): Promise<FrontendProduct | null> {
  try {
    const url = `${API_BASE_URL}/api/products/${encodeURIComponent(id)}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (res.ok) {
      const item: BackendProductItem = await res.json();
      return mapBackendProduct(item);
    }
  } catch (err) {
    console.error(`[ProductsAPI] Error fetching product ${id}:`, err);
  }

  return null;
}
