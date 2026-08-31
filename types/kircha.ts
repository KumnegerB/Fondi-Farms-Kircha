export type KirchaListingStatus =
  | "draft"
  | "open"
  | "slaughter_scheduled"
  | "slaughtered"
  | "ready_for_pickup"
  | "completed"
  | "cancelled";

export type ReservationStatus =
  | "awaiting_deposit"
  | "reserved"
  | "balance_due"
  | "paid"
  | "ready_for_pickup"
  | "collected"
  | "cancelled"
  | "forfeited";

export interface CattleMedia {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  isCover?: boolean;
}

export interface Cattle {
  id: string;
  tagNumber: string; // e.g. "OX-024"
  name: string;
  breed: string;
  ageYears?: number;
  liveWeightKg?: number;
  description: string;
  sourceOrigin: string; // e.g. "Ambo Farm"
  healthNotes?: string;
  media: CattleMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface KirchaListing {
  id: string;
  cattleId: string;
  cattle: Cattle;
  totalKirchaQuantity: number; // e.g. 12 (represents 12 full kircha = 48 quarter-units)
  reservedQuarterUnits: number; // 1 unit = 1/4 kircha
  totalSellingPriceETB: number; // Total price of whole cattle in ETB (e.g. 240,000)
  pricePerKirchaETB: number; // calculated: totalSellingPriceETB / totalKirchaQuantity
  depositPerKirchaETB: number; // configured deposit for 1 full Kircha (e.g. 4,000)
  status: KirchaListingStatus;
  slaughterDate?: string;
  slaughterTime?: string;
  slaughterLocation?: string;
  pickupDate?: string;
  pickupStartTime?: string;
  pickupEndTime?: string;
  pickupLocation?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KirchaReservation {
  id: string;
  listingId: string;
  listing: KirchaListing;
  customerId: string;
  quarterUnits: number; // quarter-units purchased (e.g. 1 = 1/4, 2 = 1/2, 4 = 1, etc.)
  totalAmountETB: number;
  depositAmountETB: number;
  paidAmountETB: number;
  remainingBalanceETB: number;
  status: ReservationStatus;
  depositPaidAt?: string;
  balancePaidAt?: string;
  collectedAt?: string;
  createdAt: string;
  updatedAt: string;
}
