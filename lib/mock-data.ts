import { Cattle, KirchaListing } from "@/types/kircha";
import { ShopProduct } from "@/types/shop";

export const MOCK_CATTLE: Cattle[] = [
  {
    id: "ctl-1",
    tagNumber: "OX-024",
    name: "Borana Prime Ox K-024",
    breed: "Borana",
    ageYears: 4,
    liveWeightKg: 420,
    description:
      "Healthy, grass-fed and grain-finished premium Borana ox raised in our Ambo pastures with full veterinary clearance.",
    sourceOrigin: "Fondi Farms, Ambo",
    healthNotes: "Vaccinated, dewormed, inspected by Ambo Vet Services.",
    media: [
      {
        id: "m-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80",
        isCover: true,
        caption: "Front profile of Borana Ox OX-024",
      },
      {
        id: "m-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80",
        caption: "Pasture grazing",
      },
    ],
    createdAt: "2026-08-20T10:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
  },
  {
    id: "ctl-2",
    tagNumber: "OX-029",
    name: "Highland Bull K-029",
    breed: "Arsi / Highland Cross",
    ageYears: 3.5,
    liveWeightKg: 380,
    description:
      "Well-conditioned high-altitude bull known for tender, lean beef.",
    sourceOrigin: "Fondi Farms, Ambo",
    healthNotes: "Complete health cert available on request.",
    media: [
      {
        id: "m-3",
        type: "image",
        url: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80",
        isCover: true,
        caption: "Highland Bull OX-029",
      },
    ],
    createdAt: "2026-08-22T10:00:00Z",
    updatedAt: "2026-08-22T10:00:00Z",
  },
];

export const MOCK_KIRCHA_LISTINGS: KirchaListing[] = [
  {
    id: "krc-1",
    cattleId: "ctl-1",
    cattle: MOCK_CATTLE[0],
    totalKirchaQuantity: 12, // 12 full kircha = 48 quarter units
    reservedQuarterUnits: 35, // 35 quarter units reserved (8 3/4 kircha reserved, 3 1/4 remaining)
    totalSellingPriceETB: 240000,
    pricePerKirchaETB: 20000, // 20,000 ETB / full kircha (5,000 ETB / 1/4 kircha)
    depositPerKirchaETB: 4000, // 4,000 ETB deposit / full kircha (1,000 ETB / 1/4 kircha)
    status: "slaughter_scheduled",
    slaughterDate: "2026-09-05T06:00:00Z",
    slaughterTime: "6:00 AM - 9:00 AM",
    slaughterLocation: "Fondi Farms Slaughterhouse, Ambo",
    pickupDate: "2026-09-05T14:00:00Z",
    pickupStartTime: "2:00 PM",
    pickupEndTime: "6:00 PM",
    pickupLocation: "Fondi Farms Collection Depot, Ambo",
    publishedAt: "2026-08-21T08:00:00Z",
    createdAt: "2026-08-21T08:00:00Z",
    updatedAt: "2026-08-28T09:00:00Z",
  },
  {
    id: "krc-2",
    cattleId: "ctl-2",
    cattle: MOCK_CATTLE[1],
    totalKirchaQuantity: 10,
    reservedQuarterUnits: 16, // 4 full kircha reserved, 6 remaining
    totalSellingPriceETB: 180000,
    pricePerKirchaETB: 18000,
    depositPerKirchaETB: 3500,
    status: "open",
    slaughterDate: "2026-09-12T06:00:00Z",
    slaughterTime: "7:00 AM",
    slaughterLocation: "Fondi Farms Slaughterhouse, Ambo",
    pickupDate: "2026-09-12T14:00:00Z",
    pickupStartTime: "2:00 PM",
    pickupEndTime: "6:00 PM",
    pickupLocation: "Fondi Farms Collection Depot, Ambo",
    publishedAt: "2026-08-23T08:00:00Z",
    createdAt: "2026-08-23T08:00:00Z",
    updatedAt: "2026-08-28T09:00:00Z",
  },
];

export const MOCK_SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "prd-1",
    name: "Fresh Farm Eggs (Tray)",
    description: "30 farm-fresh free-range brown eggs collected daily.",
    category: "eggs",
    unit: "tray",
    priceETB: 650,
    availableStock: 45,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
    ],
    createdAt: "2026-08-20T00:00:00Z",
    updatedAt: "2026-08-28T00:00:00Z",
  },
  {
    id: "prd-2",
    name: "Pure Raw Whole Milk (Liter)",
    description:
      "Fresh unpasteurized morning cow milk from our Ambo dairy herd.",
    category: "dairy",
    unit: "liter",
    priceETB: 120,
    availableStock: 80,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    ],
    createdAt: "2026-08-20T00:00:00Z",
    updatedAt: "2026-08-28T00:00:00Z",
  },
  {
    id: "prd-3",
    name: "Traditional Cultured Yogurt (Ergo)",
    description:
      "Thick, creamy Ethiopian natural fermented yogurt (1 Liter bottle).",
    category: "dairy",
    unit: "bottle",
    priceETB: 160,
    availableStock: 25,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    ],
    createdAt: "2026-08-20T00:00:00Z",
    updatedAt: "2026-08-28T00:00:00Z",
  },
  {
    id: "prd-4",
    name: "Whole Dressed Chicken (Doro)",
    description:
      "Cleaned, dressed organic pasture-raised chicken ready for preparation (~1.5kg).",
    category: "poultry",
    unit: "whole_chicken",
    priceETB: 950,
    availableStock: 18,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80",
    ],
    createdAt: "2026-08-20T00:00:00Z",
    updatedAt: "2026-08-28T00:00:00Z",
  },
];
