"use client";

import React, { use, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft2,
  Minus,
  Add,
  Flash,
  Calendar,
  Location,
  ArrowRight2,
  TickCircle,
} from "iconsax-react";
import { formatETB, formatKirchaQuantity } from "@/lib/utils";
import { calculateKirchaPricing } from "@/lib/kircha";
import { CattleImageSlider } from "@/components/tma/CattleImageSlider";
import { PhotoLightbox } from "@/components/tma/PhotoLightbox";
import { useI18n, useAppStore } from "@/store/useAppStore";
import { getKirchaDetail, FrontendKirchaListing } from "@/lib/api/kircha";

export default function KirchaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { t, language } = useI18n();
  const { addReservation } = useAppStore();

  const [listing, setListing] = useState<FrontendKirchaListing | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Selected quarter units (1 unit = 1/4 Kircha. 4 units = 1 full Kircha)
  const [selectedQuarterUnits, setSelectedQuarterUnits] = useState<number>(4);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxInitialIdx, setLightboxInitialIdx] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    getKirchaDetail(id)
      .then((data) => {
        if (isMounted) {
          setListing(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching Kircha detail:", err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Derived listing data
  const listingData = useMemo(() => {
    if (listing) {
      return {
        id: listing.id,
        cattleName: listing.cattleName,
        tagNumber: listing.tagNumber,
        breed: listing.breed,
        weight: listing.weight,
        description: listing.description,
        images:
          listing.images.length > 0
            ? listing.images
            : ["/images/arsi_bull.png"],
        totalSellingPriceETB: listing.totalSellingPriceETB || 45000,
        totalKirchaQuantity: listing.totalShares || 10,
        pricePerKirchaETB: listing.priceETB || 4500,
        depositPerKirchaETB: listing.depositPerKirchaETB || 1350,
        slaughterScheduleText:
          language === "am"
            ? listing.slaughterDateAmharic
            : listing.slaughterDateEnglish,
        locationText: listing.location,
        maxAvailableQuarterUnits: listing.availableQuarterUnits || 16,
      };
    }

    return {
      id: id || "krc-1",
      cattleName: "Meskel 2026 Kircha",
      tagNumber: "KRC-001",
      breed: "FONDI PRIME BULL",
      weight: "~450KG",
      description: "Healthy prime highland ox raised at Fondi Farms Ambo.",
      images: ["/images/arsi_bull.png", "/images/borana_ox_detail.png"],
      totalSellingPriceETB: 45000,
      totalKirchaQuantity: 10,
      pricePerKirchaETB: 4500,
      depositPerKirchaETB: 1350,
      slaughterScheduleText:
        language === "am" ? "መስከረም 17, 2019" : "Sep 27, 2026",
      locationText: "Fondi Farms Center, Ambo",
      maxAvailableQuarterUnits: 16,
    };
  }, [listing, id, language]);

  // Pricing calculation
  const pricing = useMemo(() => {
    const calc = calculateKirchaPricing({
      totalSellingPriceETB: listingData.totalSellingPriceETB,
      totalKirchaQuantity: listingData.totalKirchaQuantity,
      depositPerKirchaETB: listingData.depositPerKirchaETB,
      quarterUnits: selectedQuarterUnits,
    });

    const unitsDecimal = (selectedQuarterUnits * 0.25).toFixed(2);
    return {
      ...calc,
      unitsDecimal,
      fractionDisplay: formatKirchaQuantity(selectedQuarterUnits),
    };
  }, [listingData, selectedQuarterUnits]);

  const handleIncrement = () => {
    if (selectedQuarterUnits < listingData.maxAvailableQuarterUnits) {
      setSelectedQuarterUnits((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedQuarterUnits > 1) {
      setSelectedQuarterUnits((prev) => prev - 1);
    }
  };

  const handleReserve = () => {
    addReservation({
      id: `res-${Date.now()}`,
      cattleId: listingData.id,
      cattleName: listingData.cattleName,
      tagNumber: listingData.tagNumber,
      cattleImage: listingData.images[0] || "/images/arsi_bull.png",
      quarterUnits: selectedQuarterUnits,
      totalPriceETB: pricing.totalPriceETB,
      depositPaidETB: pricing.depositAmountETB,
      remainingBalanceETB: pricing.remainingBalanceETB,
      status: "balance_due",
      slaughterDate: listingData.slaughterScheduleText,
      reservedAt: new Date().toISOString(),
    });

    setIsSuccessModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="bg-[#f2f4f2] min-h-screen flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#74a156] border-t-transparent mb-3" />
        <p className="text-xs text-stone-500 font-medium">
          {language === "am"
            ? "የቅርጫ ዝርዝር በማምጣት ላይ..."
            : "Loading cattle details..."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[220px] flex flex-col items-center">
      {/* 1. Multi-Photo Swipable Auto-Slider Banner */}
      <div className="w-full relative bg-stone-900 overflow-hidden">
        <CattleImageSlider
          images={listingData.images}
          alt={listingData.cattleName}
          onImageClick={(idx) => {
            setLightboxInitialIdx(idx);
            setIsLightboxOpen(true);
          }}
        />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-[16px] left-[16px] z-20 bg-black/40 hover:bg-black/60 active:scale-95 transition-all text-white rounded-full size-[40px] flex items-center justify-center backdrop-blur-xs cursor-pointer shadow-md"
          aria-label="Back to listings"
        >
          <ArrowLeft2 size={20} color="#ffffff" variant="Linear" />
        </button>

        {/* 'Almost Full' Alert Badge */}
        <div className="absolute top-[16px] right-[16px] z-20 bg-white/95 backdrop-blur-xs px-[10px] py-[5px] rounded-[6px] flex items-center gap-[5px] shadow-sm">
          <Flash size={14} color="#d32f2f" variant="Bold" />
          <span className="text-[#d32f2f] text-[11px] font-bold leading-[14px]">
            {t.kircha.almostFull}
          </span>
        </div>
      </div>

      {/* 2. Main Content Surface */}
      <div className="w-full max-w-[430px] flex flex-col gap-[14px] items-center py-[14px] px-[16px]">
        {/* Cattle Identity & Info */}
        <div className="bg-white border border-[#e2e3dd] rounded-[12px] p-[16px] shadow-2xs w-full flex flex-col gap-[10px]">
          {/* Header Row: Ox Title & Tag ID */}
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col gap-[2px]">
              <h1 className="text-[20px] font-extrabold text-[#1a1c19] tracking-[-0.3px] leading-[26px]">
                {listingData.cattleName}
              </h1>
              <span className="text-[12px] font-bold text-[#74a156] tracking-[0.5px]">
                {listingData.tagNumber}
              </span>
            </div>

            {/* Weight Pill */}
            <div className="bg-[#f2f4f2] px-[10px] py-[4px] rounded-full">
              <span className="text-[11px] font-bold text-[#424843]">
                {listingData.weight}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] text-[#424843] leading-[20px] pt-1">
            {listingData.description}
          </p>
        </div>

        {/* Purchase Configuration Section */}
        <div className="w-full border-t border-[#e2e3dd] pt-[12px] flex flex-col gap-[10px]">
          <h2 className="text-[15px] font-bold text-[#1a1c19] leading-[22px]">
            {t.kircha.selectShares}
          </h2>

          {/* Unit Stepper */}
          <div className="bg-white border border-[#c2c8c0] rounded-[12px] px-[9px] py-[8px] flex items-center justify-between shadow-2xs">
            {/* Decrement Button */}
            <button
              onClick={handleDecrement}
              disabled={selectedQuarterUnits <= 1}
              className="bg-[#f2f4f2] hover:bg-[#e4e6e4] active:scale-95 disabled:opacity-40 transition-all rounded-[8px] size-[48px] flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus size={18} color="#1a1c19" />
            </button>

            {/* Quantity Display */}
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-extrabold text-[#1a1c19] tracking-[-0.22px] leading-[28px]">
                {pricing.fractionDisplay.replace(" Kircha", "")}
              </span>
              <span className="text-[11px] font-bold text-[#424843] tracking-[0.6px] uppercase leading-[16px]">
                {t.kircha.kirchaUnit}
              </span>
            </div>

            {/* Increment Button */}
            <button
              onClick={handleIncrement}
              disabled={
                selectedQuarterUnits >= listingData.maxAvailableQuarterUnits
              }
              className="bg-[#f2f4f2] hover:bg-[#e4e6e4] active:scale-95 disabled:opacity-40 transition-all rounded-[8px] size-[48px] flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Add size={18} color="#1a1c19" />
            </button>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="w-full bg-[#f3f4ee] border border-[rgba(194,200,192,0.4)] rounded-[12px] p-[14px] flex flex-col gap-[8px] shadow-2xs">
          {/* 30% Deposit Due Now */}
          <div className="flex justify-between items-center text-[13px]">
            <span className="font-semibold text-[#1a1c19]">
              {t.kircha.depositDueNow}:
            </span>
            <span className="font-bold text-[#74a156] text-[15px]">
              {formatETB(pricing.depositAmountETB)}
            </span>
          </div>

          {/* Full Price */}
          <div className="flex justify-between items-center text-[12px] text-[#424843]">
            <span>{t.kircha.totalSellingPrice}:</span>
            <span className="font-semibold text-[#1a1c19]">
              {formatETB(pricing.totalPriceETB)}
            </span>
          </div>

          <div className="h-px bg-[#c2c8c0] my-[2px]" />

          {/* Remaining Balance */}
          <div className="flex justify-between items-center text-[12px] text-[#424843]">
            <span>{t.kircha.remainingAtPickup}:</span>
            <span className="font-semibold text-[#1a1c19]">
              {formatETB(pricing.remainingBalanceETB)}
            </span>
          </div>
        </div>

        {/* Schedule & Pickup Info */}
        <div className="w-full bg-white border border-[#e2e3dd] rounded-[12px] p-[14px] flex flex-col gap-[10px] shadow-2xs">
          {/* Slaughter Schedule Row */}
          <div className="flex items-center gap-[10px]">
            <div className="size-[32px] rounded-full bg-[#f2f4f2] flex items-center justify-center shrink-0">
              <Calendar size={16} color="#74a156" variant="Bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-[#868685]">
                {t.kircha.slaughterDate}
              </span>
              <span className="text-[13px] font-bold text-[#1a1c19]">
                {listingData.slaughterScheduleText}
              </span>
            </div>
          </div>

          <div className="h-px bg-stone-100" />

          {/* Pickup Spot Row */}
          <div className="flex items-center gap-[10px]">
            <div className="size-[32px] rounded-full bg-[#f2f4f2] flex items-center justify-center shrink-0">
              <Location size={16} color="#d32f2f" variant="Bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-[#868685]">
                {t.kircha.pickupLocation}
              </span>
              <span className="text-[13px] font-bold text-[#1a1c19]">
                {listingData.locationText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Fixed Bottom Floating Reserve Action Bar */}
      <div className="fixed bottom-[68px] left-0 right-0 z-30 flex justify-center w-full px-[14px] pointer-events-none">
        <div className="w-full max-w-[430px] pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md border border-[rgba(0,0,0,0.08)] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] rounded-[14px] p-[12px] flex items-center justify-between gap-[12px]">
            {/* Price & Deposit Summary */}
            <div className="flex flex-col">
              <span className="text-[11px] text-[#868685] font-medium leading-[14px]">
                {t.kircha.depositDueNow}
              </span>
              <span className="text-[18px] font-extrabold text-[#74a156] leading-[22px]">
                {formatETB(pricing.depositAmountETB)}
              </span>
            </div>

            {/* Reserve CTA Button */}
            <button
              onClick={handleReserve}
              className="flex-1 max-w-[200px] bg-[#74a156] hover:bg-[#669049] active:scale-[0.98] transition-all text-white font-bold py-[12px] px-[14px] rounded-[10px] text-[14px] flex items-center justify-center gap-[6px] shadow-sm cursor-pointer"
            >
              <span>{t.kircha.reserveWithDeposit}</span>
              <ArrowRight2 size={16} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Fullscreen Photo Lightbox Modal */}
      <PhotoLightbox
        images={listingData.images}
        initialIndex={lightboxInitialIdx}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={listingData.cattleName}
      />

      {/* 5. Reservation Success Confirmation Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] max-w-xs w-full p-5 space-y-4 shadow-xl text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#74a156]">
              <TickCircle size={28} color="#74a156" variant="Bold" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {t.kircha.reservationSuccess}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {t.kircha.reservationSuccessMsg}
              </p>
              <div className="bg-stone-50 rounded-xl p-3 mt-3 text-xs space-y-1 text-left border border-stone-200">
                <div className="flex justify-between">
                  <span>{t.kircha.depositDueNow}:</span>
                  <strong className="text-emerald-700">
                    {formatETB(pricing.depositAmountETB)}
                  </strong>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>{t.kircha.remainingAtPickup}:</span>
                  <span>{formatETB(pricing.remainingBalanceETB)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  router.push("/orders");
                }}
                className="flex-1 bg-[#74a156] text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer hover:bg-[#669049] transition-all"
              >
                {t.kircha.viewInOrders}
              </button>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="px-4 border border-stone-300 py-2.5 rounded-xl text-xs text-stone-600 cursor-pointer hover:bg-stone-50 transition-all"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
