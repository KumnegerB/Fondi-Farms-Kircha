'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft2, Flash, Profile2User, Calendar } from 'iconsax-react';
import { cn } from '@/lib/utils';

interface KirchaItem {
  id: string;
  cattleName: string;
  tagNumber: string;
  portionType: string;
  portionAmharic: string;
  coverImage: string;
  images: string[];
  priceETB: number;
  reservedShares: number;
  totalShares: number;
  slaughterDateAmharic: string;
  isAlmostFull?: boolean;
  category: 'ox' | 'sheep' | 'goat';
}

function KirchaListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'ox';

  const [activeTab, setActiveTab] = useState<'full' | 'half' | 'quarter'>('full');

  const titleMap = {
    ox: 'የበሬ ቅርጫ',
    sheep: 'የበግ ቅርጫ',
    goat: 'የፍየል ቅርጫ',
  };

  const currentTitle = titleMap[typeParam as keyof typeof titleMap] || 'የበሬ ቅርጫ';

  const listings: KirchaItem[] = [
    {
      id: 'krc-1',
      cattleName: 'Arsi Bull K-025',
      tagNumber: 'FR10018159',
      portionType: 'full',
      portionAmharic: 'ሙሉ መደብ',
      coverImage: '/images/arsi_bull.png',
      images: [
        '/images/arsi_bull.png',
        '/images/borana_ox_detail.png',
        '/images/figma_banner.png',
      ],
      priceETB: 16500,
      reservedShares: 10,
      totalShares: 12,
      slaughterDateAmharic: 'ጳጉሜ 2, 2018',
      isAlmostFull: true,
      category: 'ox',
    },
    {
      id: 'krc-2',
      cattleName: 'Borana Prime Ox K-024',
      tagNumber: 'FR10018160',
      portionType: 'half',
      portionAmharic: 'ግማሽ መደብ',
      coverImage: '/images/borana_ox_detail.png',
      images: [
        '/images/borana_ox_detail.png',
        '/images/figma_banner.png',
        '/images/arsi_bull.png',
      ],
      priceETB: 8250,
      reservedShares: 6,
      totalShares: 12,
      slaughterDateAmharic: 'ጳጉሜ 5, 2018',
      isAlmostFull: false,
      category: 'ox',
    },
    {
      id: 'krc-3',
      cattleName: 'Highland Ox K-029',
      tagNumber: 'FR10018161',
      portionType: 'quarter',
      portionAmharic: 'ሩብ መደብ',
      coverImage: '/images/figma_ox.png',
      images: [
        '/images/figma_ox.png',
        '/images/figma_banner.png',
        '/images/borana_ox_detail.png',
      ],
      priceETB: 4125,
      reservedShares: 11,
      totalShares: 12,
      slaughterDateAmharic: 'መስከረም 1, 2019',
      isAlmostFull: true,
      category: 'ox',
    },
  ];

  const filteredListings = listings.filter((item) => {
    if (activeTab === 'full') return true;
    if (activeTab === 'half') return item.portionType === 'half' || item.portionType === 'full';
    if (activeTab === 'quarter') return true;
    return true;
  });

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[110px] flex flex-col items-center">
      {/* Top App Header */}
      <div className="bg-white w-full flex h-[68px] items-center justify-between px-[14px] py-[12px] border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-30">
        <button
          onClick={() => router.back()}
          className="bg-[#f2f4f2] hover:bg-[#e6e8e6] active:scale-95 transition-all rounded-full size-[40px] flex items-center justify-center shrink-0 cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft2 size={20} color="#111827" variant="Linear" />
        </button>

        <h1 className="flex-1 font-semibold text-[#111827] text-[22px] text-center tracking-[-0.33px] pr-[40px]">
          {currentTitle}
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[393px] flex flex-col gap-[20px] items-center py-[10px] px-[14px]">
        {/* Share/Portion Filter Tabs Container (22:543) */}
        <div className="w-[366px] bg-[#f8fafc] border border-[rgba(226,232,240,0.7)] h-[44px] rounded-[12px] p-[5px] flex items-center justify-between shrink-0 shadow-2xs">
          {/* Tab 1: ሙሉ መደብ */}
          <button
            onClick={() => setActiveTab('full')}
            className={cn(
              'flex-1 h-full rounded-[9px] flex items-center justify-center gap-[5px] transition-all cursor-pointer',
              activeTab === 'full'
                ? 'bg-[#74a156] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]'
                : 'hover:bg-stone-200/50'
            )}
          >
            <span
              className={cn(
                'text-[12px] whitespace-nowrap',
                activeTab === 'full' ? 'text-white font-medium' : 'text-[#62748e]'
              )}
            >
              ሙሉ መደብ
            </span>
            <div
              className={cn(
                'size-[18px] rounded-full flex items-center justify-center shrink-0',
                activeTab === 'full' ? 'bg-white' : 'bg-[#74a156]'
              )}
            >
              <span
                className={cn(
                  'text-[10px] font-semibold leading-none',
                  activeTab === 'full' ? 'text-[#74a156]' : 'text-white'
                )}
              >
                2
              </span>
            </div>
          </button>

          {/* Tab 2: ግማሽ መደብ */}
          <button
            onClick={() => setActiveTab('half')}
            className={cn(
              'flex-1 h-full rounded-[9px] flex items-center justify-center gap-[5px] transition-all cursor-pointer',
              activeTab === 'half'
                ? 'bg-[#74a156] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]'
                : 'hover:bg-stone-200/50'
            )}
          >
            <span
              className={cn(
                'text-[12px] whitespace-nowrap',
                activeTab === 'half' ? 'text-white font-medium' : 'text-[#62748e]'
              )}
            >
              ግማሽ መደብ
            </span>
            <div
              className={cn(
                'size-[18px] rounded-full flex items-center justify-center shrink-0',
                activeTab === 'half' ? 'bg-white' : 'bg-[#74a156]'
              )}
            >
              <span
                className={cn(
                  'text-[10px] font-semibold leading-none',
                  activeTab === 'half' ? 'text-[#74a156]' : 'text-white'
                )}
              >
                2
              </span>
            </div>
          </button>

          {/* Tab 3: ሩብ መደብ */}
          <button
            onClick={() => setActiveTab('quarter')}
            className={cn(
              'flex-1 h-full rounded-[9px] flex items-center justify-center gap-[5px] transition-all cursor-pointer',
              activeTab === 'quarter'
                ? 'bg-[#74a156] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]'
                : 'hover:bg-stone-200/50'
            )}
          >
            <span
              className={cn(
                'text-[12px] whitespace-nowrap',
                activeTab === 'quarter' ? 'text-white font-medium' : 'text-[#62748e]'
              )}
            >
              ሩብ መደብ
            </span>
            <div
              className={cn(
                'size-[18px] rounded-full flex items-center justify-center shrink-0',
                activeTab === 'quarter' ? 'bg-white' : 'bg-[#74a156]'
              )}
            >
              <span
                className={cn(
                  'text-[10px] font-semibold leading-none',
                  activeTab === 'quarter' ? 'text-[#74a156]' : 'text-white'
                )}
              >
                1
              </span>
            </div>
          </button>
        </div>

        {/* Kircha Cattle Listing Cards (40:245) */}
        <div className="flex flex-col gap-[16px] w-full items-center">
          {filteredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/kircha/${listing.id}`}
              className="bg-white border border-[rgba(22,52,34,0.2)] rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] w-[366px] overflow-hidden flex flex-col shrink-0 transition-all hover:border-[#74a156] hover:shadow-md group block"
            >
              {/* Card Image Area (40:246) */}
              <div className="h-[150px] w-full relative overflow-hidden bg-stone-900">
                <Image
                  src={listing.coverImage}
                  alt={listing.cattleName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />

                {/* Multiple Photos Badge */}
                <div className="absolute right-[10px] bottom-[10px] bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-semibold text-white">
                  {listing.images.length} photos
                </div>

                {/* 'Almost Full' Alert Badge with Iconsax Flash */}
                {listing.isAlmostFull && (
                  <div className="absolute left-[12px] top-[12px] bg-white/90 backdrop-blur-[2px] px-[8px] py-[4px] rounded-[4px] flex items-center gap-[4px] shadow-xs pointer-events-none z-10">
                    <Flash size={13} color="#d32f2f" variant="Bold" />
                    <span className="text-[#d32f2f] text-[11px] font-bold leading-[12px]">
                      Almost Full
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body Area (40:252) */}
              <div className="p-[12px] pb-[16px] flex flex-col gap-[8px] w-full">
                {/* Row 1: Portion Name & Tag ID */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-[22px] font-medium text-[#1a1c19] leading-[32px]">
                    {listing.portionAmharic}
                  </span>
                  <span className="text-[12px] font-bold text-[#1a1c19] uppercase tracking-[0.6px]">
                    {listing.tagNumber}
                  </span>
                </div>

                {/* Row 2: Price in ETB / Kircha */}
                <div className="flex items-baseline gap-[5px] text-[#28a745] tracking-[-0.22px]">
                  <span className="text-[22px] font-extrabold leading-[28px]">
                    {listing.priceETB.toLocaleString()}
                  </span>
                  <span className="text-[12px] font-medium text-[#28a745]">
                    ETB / Kircha
                  </span>
                </div>

                {/* Details Breakdown */}
                <div className="flex flex-col gap-[6px] w-full pt-1">
                  {/* Share count with Iconsax Profile2User */}
                  <div className="flex items-center justify-between text-[12px] h-[18px]">
                    <div className="flex items-center gap-[5px] text-[#1a1c19]">
                      <Profile2User size={15} color="#1a1c19" variant="Bold" />
                      <span>የመደብ ብዛት</span>
                    </div>
                    <span className="text-[#f57c00] font-bold">
                      {listing.reservedShares}/{listing.totalShares}
                    </span>
                  </div>

                  {/* Slaughter date with Iconsax Calendar */}
                  <div className="flex items-center justify-between text-[12px] h-[18px]">
                    <div className="flex items-center gap-[5px] text-[#1a1c19]">
                      <Calendar size={15} color="#1a1c19" variant="Linear" />
                      <span>የእርድ ቀን</span>
                    </div>
                    <span className="text-[#28a745] font-semibold">
                      {listing.slaughterDateAmharic}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button className="w-full bg-[#74a156] group-hover:bg-[#669049] active:scale-[0.98] transition-all text-white rounded-[8px] py-[12px] text-[12px] font-medium text-center shadow-xs cursor-pointer">
                    Reserve Unit
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function KirchaListPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f2f4f2] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#74a156] border-t-transparent" />
        </div>
      }
    >
      <KirchaListContent />
    </Suspense>
  );
}
