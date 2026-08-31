'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PercentageCircle, TickCircle } from 'iconsax-react';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

export default function TMAHomePage() {
  const kirchaItems: CategoryItem[] = [
    {
      id: 'ox',
      name: 'Ox',
      image: '/images/figma_ox.png',
      href: '/kircha',
    },
    {
      id: 'sheep',
      name: 'Sheep',
      image: '/images/figma_sheep.png',
      href: '/kircha?type=sheep',
    },
    {
      id: 'goat',
      name: 'Goat',
      image: '/images/figma_goat.png',
      href: '/kircha?type=goat',
    },
  ];

  const otherProducts: CategoryItem[] = [
    {
      id: 'ox-other',
      name: 'Ox',
      image: '/images/figma_ox.png',
      href: '/shop',
    },
    {
      id: 'sheep-other',
      name: 'Sheep',
      image: '/images/figma_sheep.png',
      href: '/shop',
    },
    {
      id: 'goat-other',
      name: 'Goat',
      image: '/images/figma_goat.png',
      href: '/shop',
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-[110px] flex flex-col items-center">
      {/* Top Banner Section */}
      <div className="w-full flex flex-col items-center pt-[12px] pb-[8px] px-[16px]">
        {/* Banner Card */}
        <div
          className="h-[122px] w-full max-w-[360px] overflow-hidden relative rounded-[12px] shrink-0 shadow-xs"
          style={{
            background:
              'linear-gradient(90deg, rgba(116, 161, 86, 0.75) 0%, rgba(116, 161, 86, 0.5) 100%)',
          }}
        >
          {/* Background Cattle Image from Figma */}
          <div className="absolute inset-0">
            <Image
              src="/images/figma_banner.png"
              alt="Fondi Farms Cattle"
              fill
              className="object-cover -scale-y-100 rotate-180 brightness-95"
              priority
            />
            {/* Green gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(116, 161, 86, 0.6) 0%, rgba(116, 161, 86, 0.3) 100%)',
              }}
            />
          </div>

          {/* Headline Text in Amharic */}
          <p className="absolute left-[20.5px] top-[40px] text-[20px] font-bold text-white leading-normal drop-shadow-sm whitespace-nowrap">
            ጥራት መለያችን ነው !
          </p>

          {/* Pill Badge 1: ተመጣጣኝ ዋጋ */}
          <div className="absolute left-[20.5px] top-[85px] flex items-center gap-[4px] bg-black/20 backdrop-blur-xs px-[7px] py-[2px] rounded-full border border-white/20">
            <div className="bg-white size-[16px] rounded-full flex items-center justify-center shrink-0">
              <PercentageCircle size={13} color="#74a156" variant="Bold" />
            </div>
            <span className="text-[9.5px] font-semibold text-white tracking-[-0.37px] whitespace-nowrap">
              ተመጣጣኝ ዋጋ
            </span>
          </div>

          {/* Pill Badge 2: የተሻለ ጥራት */}
          <div className="absolute left-[132px] top-[85px] flex items-center gap-[4px] bg-black/20 backdrop-blur-xs px-[7px] py-[2px] rounded-full border border-white/20">
            <div className="bg-white size-[16px] rounded-full flex items-center justify-center shrink-0">
              <TickCircle size={13} color="#74a156" variant="Bold" />
            </div>
            <span className="text-[9.5px] font-semibold text-white tracking-[-0.37px] whitespace-nowrap">
              የተሻለ ጥራት
            </span>
          </div>
        </div>

        {/* Carousel Dots indicator */}
        <div className="pt-[8px] flex items-center justify-center">
          <Image
            src="/images/dots.svg"
            alt="Slider indicator"
            width={34}
            height={5}
          />
        </div>
      </div>

      {/* Section 1: ቅርጫ (Kircha) */}
      <div className="w-full max-w-[360px] flex flex-col gap-[10px] pt-[8px] px-[8px]">
        <div className="flex items-center px-[8px] w-full">
          <h2 className="text-[15px] font-bold text-black leading-[1.4] whitespace-nowrap">
            ቅርጫ
          </h2>
        </div>

        {/* 3 Animal Cards Grid */}
        <div className="flex gap-[12px] items-center justify-between w-full">
          {kirchaItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="bg-[#eaeaea] hover:bg-[#e0e0e0] active:scale-[0.97] transition-all flex flex-col h-[117px] items-center justify-between px-[9px] py-[10px] rounded-[10px] w-[104px] shrink-0 group"
            >
              <div className="relative size-[70px] flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="font-semibold text-[13px] text-black text-center whitespace-nowrap">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Section 2: ሌሎች ምርቶች (Other Products) */}
      <div className="w-full max-w-[360px] flex flex-col gap-[10px] pt-[20px] px-[8px]">
        <div className="flex items-center px-[8px] w-full">
          <h2 className="text-[15px] font-bold text-black leading-[1.4] whitespace-nowrap">
            ሌሎች ምርቶች
          </h2>
        </div>

        {/* 3 Animal/Product Cards Grid */}
        <div className="flex gap-[12px] items-center justify-between w-full">
          {otherProducts.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="bg-[#eaeaea] hover:bg-[#e0e0e0] active:scale-[0.97] transition-all flex flex-col h-[117px] items-center justify-between px-[9px] py-[10px] rounded-[10px] w-[104px] shrink-0 group"
            >
              <div className="relative size-[70px] flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="font-semibold text-[13px] text-black text-center whitespace-nowrap">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
