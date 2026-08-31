import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency to Ethiopian Birr (ETB)
 */
export function formatETB(amount: number): string {
  return (
    new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("ETB", "")
      .trim() + " ETB"
  );
}

/**
 * Format quarter units into human readable Kircha fractions (e.g. 1 -> ¼, 2 -> ½, 3 -> ¾, 4 -> 1, 5 -> 1¼, etc.)
 */
export function formatKirchaQuantity(quarterUnits: number): string {
  if (quarterUnits <= 0) return "0 Kircha";

  const fullUnits = Math.floor(quarterUnits / 4);
  const remainder = quarterUnits % 4;

  let fractionStr = "";
  if (remainder === 1) fractionStr = "¼";
  else if (remainder === 2) fractionStr = "½";
  else if (remainder === 3) fractionStr = "¾";

  if (fullUnits === 0) {
    return `${fractionStr} Kircha`;
  }

  if (remainder === 0) {
    return `${fullUnits} Kircha`;
  }

  return `${fullUnits}${fractionStr} Kircha`;
}

/**
 * Format date nicely for Ethiopian / local display
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return "TBA";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
