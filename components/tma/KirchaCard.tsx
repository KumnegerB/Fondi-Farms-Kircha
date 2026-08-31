"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight } from "lucide-react";
import { KirchaListing } from "@/types/kircha";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { KirchaListingStatusBadge } from "@/components/tma/StatusBadge";
import { formatETB, formatKirchaQuantity, formatDate } from "@/lib/utils";
import { calculateRemainingQuarterUnits } from "@/lib/kircha";

interface KirchaCardProps {
  listing: KirchaListing;
  isFeatured?: boolean;
}

export function KirchaCard({ listing, isFeatured = false }: KirchaCardProps) {
  const remainingUnits = calculateRemainingQuarterUnits(
    listing.totalKirchaQuantity,
    listing.reservedQuarterUnits,
  );
  const coverImage =
    listing.cattle.media.find((m) => m.isCover)?.url ||
    listing.cattle.media[0]?.url ||
    "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80";

  const totalQuarterUnits = listing.totalKirchaQuantity * 4;
  const progressPercent = Math.min(
    100,
    Math.round((listing.reservedQuarterUnits / totalQuarterUnits) * 100),
  );

  return (
    <Card className="overflow-hidden hover:border-stone-300 transition-all">
      <div className="relative aspect-16/10 w-full bg-stone-200">
        <Image
          src={coverImage}
          alt={listing.cattle.name}
          fill
          className="object-cover"
          sizes="(max-width: 448px) 100vw, 448px"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <KirchaListingStatusBadge status={listing.status} />
          {isFeatured && (
            <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg font-medium">
          Tag: {listing.cattle.tagNumber}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-base text-stone-900 leading-tight">
              {listing.cattle.name}
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Breed: {listing.cattle.breed} • ~{listing.cattle.liveWeightKg} kg
            </p>
          </div>
        </div>

        {/* Inventory Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-emerald-700">
              {formatKirchaQuantity(remainingUnits)} remaining
            </span>
            <span className="text-stone-500">
              {formatKirchaQuantity(listing.reservedQuarterUnits)} reserved of{" "}
              {listing.totalKirchaQuantity}
            </span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Pricing Breakdown Preview */}
        <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 text-xs">
          <div>
            <span className="text-stone-500 block text-[11px]">
              Price / Kircha
            </span>
            <span className="font-bold text-stone-900">
              {formatETB(listing.pricePerKirchaETB)}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[11px]">
              Deposit / Kircha
            </span>
            <span className="font-bold text-emerald-700">
              {formatETB(listing.depositPerKirchaETB)}
            </span>
          </div>
        </div>

        {/* Slaughter Date */}
        {listing.slaughterDate && (
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Slaughter: {formatDate(listing.slaughterDate)}</span>
          </div>
        )}

        <Link href={`/kircha/${listing.id}`} className="block w-full pt-1">
          <Button fullWidth size="md" className="gap-2">
            <span>View Kircha</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
