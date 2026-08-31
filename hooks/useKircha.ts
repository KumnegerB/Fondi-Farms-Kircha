"use client";

import { useMemo, useState } from "react";
import { KirchaListing } from "@/types/kircha";
import {
  calculateKirchaPricing,
  calculateRemainingQuarterUnits,
} from "@/lib/kircha";
import { formatKirchaQuantity } from "@/lib/utils";

export function useKirchaQuantitySelector(listing: KirchaListing) {
  const maxAvailableUnits = useMemo(() => {
    return calculateRemainingQuarterUnits(
      listing.totalKirchaQuantity,
      listing.reservedQuarterUnits,
    );
  }, [listing.totalKirchaQuantity, listing.reservedQuarterUnits]);

  // Default to 1 full Kircha (4 units) or max available if less than 4
  const [selectedUnits, setSelectedUnits] = useState<number>(() => {
    return Math.min(4, Math.max(1, maxAvailableUnits));
  });

  const pricing = useMemo(() => {
    const calc = calculateKirchaPricing({
      totalSellingPriceETB: listing.totalSellingPriceETB,
      totalKirchaQuantity: listing.totalKirchaQuantity,
      depositPerKirchaETB: listing.depositPerKirchaETB,
      quarterUnits: selectedUnits,
    });

    return {
      ...calc,
      fractionDisplay: formatKirchaQuantity(selectedUnits),
    };
  }, [listing, selectedUnits]);

  const canIncrement = selectedUnits < maxAvailableUnits;
  const canDecrement = selectedUnits > 1;

  const increment = () => {
    if (canIncrement) {
      setSelectedUnits((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (canDecrement) {
      setSelectedUnits((prev) => prev - 1);
    }
  };

  const setExactUnits = (units: number) => {
    const clamped = Math.max(1, Math.min(units, maxAvailableUnits));
    setSelectedUnits(clamped);
  };

  const selectAllRemaining = () => {
    setSelectedUnits(maxAvailableUnits);
  };

  return {
    selectedUnits,
    maxAvailableUnits,
    pricing,
    canIncrement,
    canDecrement,
    increment,
    decrement,
    setExactUnits,
    selectAllRemaining,
    formattedRemaining: formatKirchaQuantity(maxAvailableUnits),
  };
}
