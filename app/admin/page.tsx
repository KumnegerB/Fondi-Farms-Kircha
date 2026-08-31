import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { MOCK_KIRCHA_LISTINGS, MOCK_SHOP_PRODUCTS } from "@/lib/mock-data";
import { formatETB, formatKirchaQuantity, formatDate } from "@/lib/utils";
import { calculateRemainingQuarterUnits } from "@/lib/kircha";

export default function AdminDashboardPage() {
  const activeListing = MOCK_KIRCHA_LISTINGS[0];
  const remainingQuarterUnits = calculateRemainingQuarterUnits(
    activeListing.totalKirchaQuantity,
    activeListing.reservedQuarterUnits,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900">
          Operations Overview
        </h1>
        <p className="text-xs text-stone-500">
          Real-time Kircha inventory, slaughter schedule, and farm sales
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-stone-500">
              Active Cattle Listed
            </span>
            <p className="text-2xl font-extrabold text-stone-900 mt-1">
              {MOCK_KIRCHA_LISTINGS.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-stone-500">
              Next Slaughter
            </span>
            <p className="text-lg font-bold text-emerald-700 mt-1">
              {formatDate(activeListing.slaughterDate)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-stone-500">
              Active Ox Remaining
            </span>
            <p className="text-2xl font-extrabold text-amber-700 mt-1">
              {formatKirchaQuantity(remainingQuarterUnits)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-stone-500">
              Farm Shop Products
            </span>
            <p className="text-2xl font-extrabold text-stone-900 mt-1">
              {MOCK_SHOP_PRODUCTS.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Kircha Monitor */}
      <Card>
        <CardHeader>
          <h3 className="font-bold text-sm text-stone-900">
            Active Kircha Slaughter Pipeline
          </h3>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                {activeListing.cattle.name} ({activeListing.cattle.tagNumber})
              </h4>
              <p className="text-xs text-stone-500">
                Slaughter Date: {formatDate(activeListing.slaughterDate)} •
                Pickup: {activeListing.pickupStartTime} -{" "}
                {activeListing.pickupEndTime}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-800">
                {activeListing.reservedQuarterUnits / 4} /{" "}
                {activeListing.totalKirchaQuantity} Kircha Reserved
              </span>
              <span className="block text-xs text-stone-500">
                Price: {formatETB(activeListing.pricePerKirchaETB)} / Kircha
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
