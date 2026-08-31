/**
 * Utility functions for Kircha mathematics and calculations according to PRD:
 * 1 full Kircha = 4 quarter-units
 * 1/4 Kircha = 1 unit
 * Total cattle inventory = totalKirchaQuantity * 4 quarter-units
 */

export interface KirchaPriceBreakdown {
  quarterUnits: number;
  fractionDisplay: string;
  totalPriceETB: number;
  depositAmountETB: number;
  remainingBalanceETB: number;
}

export function calculateKirchaPricing(params: {
  totalSellingPriceETB: number;
  totalKirchaQuantity: number;
  depositPerKirchaETB: number;
  quarterUnits: number;
}): KirchaPriceBreakdown {
  const {
    totalSellingPriceETB,
    totalKirchaQuantity,
    depositPerKirchaETB,
    quarterUnits,
  } = params;

  // Price per 1/4 unit
  const pricePerQuarterUnit = totalSellingPriceETB / (totalKirchaQuantity * 4);
  // Deposit per 1/4 unit
  const depositPerQuarterUnit = depositPerKirchaETB / 4;

  const totalPriceETB = Math.round(pricePerQuarterUnit * quarterUnits);
  const depositAmountETB = Math.round(depositPerQuarterUnit * quarterUnits);
  const remainingBalanceETB = totalPriceETB - depositAmountETB;

  return {
    quarterUnits,
    fractionDisplay: "", // will be formatted with formatKirchaQuantity
    totalPriceETB,
    depositAmountETB,
    remainingBalanceETB,
  };
}

export function calculateRemainingQuarterUnits(
  totalKirchaQuantity: number,
  reservedQuarterUnits: number,
): number {
  const totalQuarterUnits = totalKirchaQuantity * 4;
  return Math.max(0, totalQuarterUnits - reservedQuarterUnits);
}

export function isKirchaSoldOut(
  totalKirchaQuantity: number,
  reservedQuarterUnits: number,
): boolean {
  return (
    calculateRemainingQuarterUnits(totalKirchaQuantity, reservedQuarterUnits) <=
    0
  );
}
