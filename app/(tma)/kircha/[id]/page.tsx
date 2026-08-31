'use client';

import React, { use, useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft2,
  Minus,
  Add,
  Flash,
  Calendar,
  Location,
  ArrowRight2,
  Gallery,
} from 'iconsax-react';
import { formatETB, formatKirchaQuantity } from '@/lib/utils';
import { calculateKirchaPricing } from '@/lib/kircha';
import { CattleImageSlider } from '@/components/tma/CattleImageSlider';
import { PhotoLightbox } from '@/components/tma/PhotoLightbox';

export default function KirchaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  // Selected quarter units (1 unit = 1/4 Kircha. 4 units = 1 full Kircha)
  const [selectedQuarterUnits, setSelectedQuarterUnits] = useState<number>(4);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxInitialIdx, setLightboxInitialIdx] = useState<number>(0);

  // Listing configuration with multiple cattle photos
  const listingData = useMemo(() => {
    return {
      id: id || 'krc-1',
      titleAmharic: 'ሙሉ መደብ',
      cattleName: 'Borana Ox K-024',
      tagNumber: 'OX K-024',
      breed: 'BORANA OX',
      weight: '~450KG',
      description:
        'Healthy ox raised in the Ambo highlands. Perfect for holiday Kircha.',
      images: [
        '/images/borana_ox_detail.png',
        '/images/figma_banner.png',
        '/images/arsi_bull.png',
        '/images/figma_ox.png',
      ],
      totalSellingPriceETB: 216000,
      totalKirchaQuantity: 12,
      pricePerKirchaETB: 18000,
      depositPerKirchaETB: 4500, // 4,500 ETB deposit per 1 full Kircha
      slaughterScheduleText: 'Saturday, Sept 5 • 7:00 AM',
      locationText: 'Ambo Farm',
      maxAvailableQuarterUnits: 12, // up to 3 full kircha available
    };
  }, [id]);

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
    setIsSuccessModalOpen(true);
  };

  const handleOpenPhotoViewer = (index: number = 0) => {
    setLightboxInitialIdx(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[120px] flex flex-col items-center">
      {/* Hero Media Container with 5-Second Auto Slider (49:1441) */}
      <div className="relative w-full max-w-[393px] h-[230px] overflow-hidden bg-stone-900 shrink-0">
        <CattleImageSlider
          images={listingData.images}
          alt={listingData.cattleName}
          autoSlideInterval={5000}
          aspectRatioClass="h-[230px]"
          showControls={true}
          onImageClick={handleOpenPhotoViewer}
        />

        {/* Circular Floating Back Button (49:1443) */}
        <button
          onClick={() => router.back()}
          className="absolute left-[18px] top-[18px] bg-white/90 hover:bg-white active:scale-95 transition-all size-[40px] rounded-full flex items-center justify-center shadow-md backdrop-blur-xs z-20"
          aria-label="Back"
        >
          <ArrowLeft2 size={18} color="#111827" variant="Linear" />
        </button>

        {/* View All Photos Badge Indicator */}
        <button
          onClick={() => handleOpenPhotoViewer(0)}
          className="absolute right-[14px] top-[18px] bg-black/60 hover:bg-black/80 active:scale-95 text-white px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 shadow-md z-20"
        >
          <Gallery size={14} color="#ffffff" variant="Linear" />
          <span>{listingData.images.length} photos</span>
        </button>
      </div>

      {/* Main Content (49:1447) */}
      <div className="w-full max-w-[393px] flex flex-col gap-[12px] items-start px-[16px] py-[12px]">
        {/* Header Section (49:1448) */}
        <div className="flex flex-col gap-[8px] w-full">
          {/* Title & Base Price Row (49:1449) */}
          <div className="flex items-start justify-between w-full">
            <h1 className="text-[22px] font-medium text-[#1a1c19] leading-[32px]">
              {listingData.titleAmharic}
            </h1>
            <div className="flex items-baseline gap-[4px] text-[#28a745] tracking-[-0.22px]">
              <span className="text-[22px] font-extrabold leading-[28px]">
                {listingData.pricePerKirchaETB.toLocaleString()}
              </span>
              <span className="text-[12px] font-normal text-[#28a745]">
                ETB / 1 Kircha
              </span>
            </div>
          </div>

          {/* Metadata Badges (49:1454) */}
          <div className="flex gap-[8px] items-center h-[24px]">
            <div className="bg-white px-[8px] py-[4px] rounded-[4px] flex items-center shadow-2xs">
              <span className="text-[12px] font-bold text-[#424843] tracking-[0.6px] uppercase">
                {listingData.breed}
              </span>
            </div>
            <div className="bg-white px-[8px] py-[4px] rounded-[4px] flex items-center shadow-2xs">
              <span className="text-[12px] font-bold text-[#424843] tracking-[0.6px] uppercase">
                {listingData.weight}
              </span>
            </div>
          </div>

          {/* Description (49:1459) */}
          <p className="text-[15px] text-[#424843] leading-[22px] pt-1">
            {listingData.description}
          </p>
        </div>

        {/* Purchase Configuration Section (49:1493) */}
        <div className="w-full border-t border-[#e2e3dd] pt-[12px] flex flex-col gap-[10px]">
          <h2 className="text-[18px] font-bold text-[#1a1c19] leading-[24px]">
            Select Quantity
          </h2>

          {/* Unit Stepper (49:1496) */}
          <div className="bg-white border border-[#c2c8c0] rounded-[12px] px-[9px] py-[8px] flex items-center justify-between shadow-2xs">
            {/* Decrement Button */}
            <button
              onClick={handleDecrement}
              disabled={selectedQuarterUnits <= 1}
              className="bg-[#f2f4f2] hover:bg-[#e4e6e4] active:scale-95 disabled:opacity-40 transition-all rounded-[8px] size-[48px] flex items-center justify-center shrink-0"
              aria-label="Decrease quantity"
            >
              <Minus size={18} color="#1a1c19" />
            </button>

            {/* Quantity Display */}
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-extrabold text-[#1a1c19] tracking-[-0.22px] leading-[28px]">
                {pricing.fractionDisplay.replace(' Kircha', '')}
              </span>
              <span className="text-[12px] font-bold text-[#424843] tracking-[0.6px] uppercase leading-[16px]">
                KIRCHA
              </span>
            </div>

            {/* Increment Button */}
            <button
              onClick={handleIncrement}
              disabled={
                selectedQuarterUnits >= listingData.maxAvailableQuarterUnits
              }
              className="bg-[#f2f4f2] hover:bg-[#e4e6e4] active:scale-95 disabled:opacity-40 transition-all rounded-[8px] size-[48px] flex items-center justify-center shrink-0"
              aria-label="Increase quantity"
            >
              <Add size={18} color="#1a1c19" />
            </button>
          </div>

          {/* Dynamic Pricing Breakdown Box (49:1508) */}
          <div className="bg-[#f3f4ee] rounded-[12px] p-[14px] flex flex-col gap-[8px] shadow-2xs">
            {/* Total Price Row */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#424843]">
                Total Price ({pricing.unitsDecimal} units)
              </span>
              <span className="text-[17px] font-semibold text-[#1a1c19]">
                {pricing.totalPriceETB.toLocaleString()} ETB
              </span>
            </div>

            {/* Required Deposit Row */}
            <div className="flex items-center justify-between text-[#f57c00]">
              <div className="flex items-center gap-[6px]">
                <Flash size={15} color="#f57c00" variant="Bold" />
                <span className="text-[14px]">Required Deposit</span>
              </div>
              <span className="text-[17px] font-semibold">
                {pricing.depositAmountETB.toLocaleString()} ETB
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#c2c8c0] my-[2px]" />

            {/* Remaining Balance Row */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#424843]">
                Remaining Balance
              </span>
              <span className="text-[17px] font-semibold text-[#d32f2f]">
                {pricing.remainingBalanceETB.toLocaleString()} ETB
              </span>
            </div>
          </div>
        </div>

        {/* Schedule & Location Details Section (49:1473) */}
        <div className="w-full flex flex-col gap-[8px]">
          {/* Slaughter Schedule Card */}
          <div className="bg-white border border-[#e2e3dd] rounded-[8px] p-[12px] flex items-center gap-[12px] shadow-2xs">
            <div className="bg-[#74a156] size-[40px] rounded-full flex items-center justify-center shrink-0">
              <Calendar size={20} color="#ffffff" variant="Linear" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-[#424843]">
                Slaughter Schedule
              </span>
              <span className="text-[14px] font-semibold text-[#1a1c19]">
                {listingData.slaughterScheduleText}
              </span>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white border border-[#e2e3dd] rounded-[8px] p-[12px] flex items-center gap-[12px] shadow-2xs">
            <div className="bg-[#fed3c7] size-[40px] rounded-full flex items-center justify-center shrink-0">
              <Location size={20} color="#d32f2f" variant="Bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-[#424843]">
                Location
              </span>
              <span className="text-[14px] font-semibold text-[#1a1c19]">
                {listingData.locationText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar (49:1529) */}
      <div className="fixed bottom-[70px] left-0 right-0 max-w-[393px] mx-auto p-[14px] bg-[#f2f4f2]/95 backdrop-blur-xs z-40">
        <button
          onClick={handleReserve}
          className="w-full bg-[#74a156] hover:bg-[#669049] active:scale-[0.98] transition-all text-white rounded-[12px] py-[16px] flex items-center justify-center gap-[8px] shadow-sm drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
        >
          <span className="text-[17px] font-bold">Reserve with Deposit</span>
          <ArrowRight2 size={18} color="#ffffff" variant="Linear" />
        </button>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        images={listingData.images}
        initialIndex={lightboxInitialIdx}
        title={`${listingData.titleAmharic} - ${listingData.cattleName}`}
        onClose={() => setIsLightboxOpen(false)}
      />

      {/* Confirmation Modal for Testing */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 space-y-4 shadow-xl text-center">
            <div className="w-12 h-12 bg-emerald-100 text-[#74a156] rounded-full flex items-center justify-center mx-auto">
              <ArrowRight2 size={24} color="#74a156" variant="Bold" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Reservation Summary
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Portion: <strong>{pricing.fractionDisplay}</strong>
              </p>
              <div className="bg-stone-50 rounded-xl p-3 mt-3 text-xs space-y-1.5 text-left border border-stone-200">
                <div className="flex justify-between">
                  <span>Total Value:</span>
                  <strong>{formatETB(pricing.totalPriceETB)}</strong>
                </div>
                <div className="flex justify-between text-[#f57c00]">
                  <span>Non-refundable Deposit:</span>
                  <strong>{formatETB(pricing.depositAmountETB)}</strong>
                </div>
                <div className="flex justify-between text-stone-500 pt-1 border-t border-stone-200">
                  <span>Remaining Balance:</span>
                  <span>{formatETB(pricing.remainingBalanceETB)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  router.push('/orders');
                }}
                className="flex-1 bg-[#74a156] text-white py-2.5 rounded-xl text-xs font-bold"
              >
                Proceed to Orders
              </button>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="px-4 border border-stone-300 py-2.5 rounded-xl text-xs text-stone-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
