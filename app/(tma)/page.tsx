"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTelegram } from "@/hooks/useTelegram";
import { useAppStore } from "@/store/useAppStore";
import { PercentageCircle, TickCircle, Add } from "iconsax-react";

interface AnimalCategory {
  id: string;
  name: string;
  image: string;
  href: string;
}

interface ShopProductItem {
  id: string;
  name: string;
  priceETB: number;
  image: string;
  unit: string;
  category: "dairy" | "eggs" | "poultry";
}

export default function TMAHomePage() {
  const { user } = useTelegram();
  const { cartItems, addToCart, getCartCount } = useAppStore();

  const displayName = user
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : "Mathias A.";

  const kirchaCategories: AnimalCategory[] = [
    {
      id: "ox",
      name: "Ox",
      image: "/images/figma_ox.png",
      href: "/kircha?type=ox",
    },
    {
      id: "sheep",
      name: "Sheep",
      image: "/images/figma_sheep.png",
      href: "/kircha?type=sheep",
    },
    {
      id: "goat",
      name: "Goat",
      image: "/images/figma_goat.png",
      href: "/kircha?type=goat",
    },
  ];

  const shopProducts: ShopProductItem[] = [
    {
      id: "shp-1",
      name: "1L Milk & Yogurt",
      priceETB: 250,
      image: "/images/fresh_milk_yogurt.png",
      unit: "liter",
      category: "dairy",
    },
    {
      id: "shp-2",
      name: "Eggs",
      priceETB: 24,
      image: "/images/fresh_milk_yogurt.png",
      unit: "piece",
      category: "eggs",
    },
    {
      id: "shp-3",
      name: "Milk & Yogurt Kit",
      priceETB: 250,
      image: "/images/fresh_milk_yogurt.png",
      unit: "kit",
      category: "dairy",
    },
  ];

  const totalCartCount = getCartCount();

  const handleAddToCart = (e: React.MouseEvent, item: ShopProductItem) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: item.id,
      name: item.name,
      priceETB: item.priceETB,
      images: [item.image],
      unit: item.unit as any,
      category: item.category,
      availableStock: 50,
      isActive: true,
      description: item.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[110px] flex flex-col items-center">
      {/* Top Header (61:2317) */}
      <header className="bg-white w-full h-[68px] flex items-center justify-between px-[16px] border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-30">
        {/* User Identity on Left (61:2330) */}
        <Link href="/profile" className="flex items-center gap-[8px]">
          <div className="size-[34px] rounded-full overflow-hidden bg-stone-100 flex items-center justify-center shrink-0">
            <Image
              src="/images/user_avatar_header.svg"
              alt="Profile"
              width={34}
              height={34}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#323b49] font-medium leading-[14px]">
              Hello!
            </span>
            <span className="text-[13px] text-[#323b49] font-semibold leading-[16px] truncate max-w-[140px]">
              {displayName}
            </span>
          </div>
        </Link>

        {/* Cart Bag on Right with Notification Count (61:2445) */}
        <Link
          href="/shop/cart"
          className="relative p-2 flex items-center justify-center"
        >
          <Image
            src="/images/bag_happy.svg"
            alt="Cart"
            width={26}
            height={26}
          />
          {totalCartCount > 0 && (
            <span className="absolute top-1 right-0 bg-[#74a156] text-white text-[10px] font-bold rounded-full size-[18px] flex items-center justify-center shadow-xs">
              {totalCartCount}
            </span>
          )}
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[393px] flex flex-col items-center py-[10px] px-[14px]">
        {/* 1. Section: ቅርጫ (19:127) */}
        <section className="w-full flex flex-col gap-[8px] py-[6px]">
          <div className="flex items-center px-[4px]">
            <h2 className="text-[15px] font-medium text-black leading-[1.4]">
              ቅርጫ
            </h2>
          </div>

          {/* 3 White Animal Cards (19:130) */}
          <div className="flex gap-[12px] items-center justify-between w-full">
            {kirchaCategories.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="bg-white hover:bg-stone-50 active:scale-[0.97] transition-all flex flex-col h-[117px] items-center justify-between px-[9px] py-[12px] rounded-[10px] flex-1 shadow-[0px_2px_4px_rgba(0,0,0,0.03)] border border-stone-200/40 group"
              >
                <div className="relative size-[66px] flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={66}
                    height={66}
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="font-semibold text-[13px] text-black text-center">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. Middle Hero Banner Section (44:595) */}
        <section className="w-full flex flex-col items-center py-[12px]">
          <div
            className="h-[122px] w-full overflow-hidden relative rounded-[12px] shrink-0 shadow-xs"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(116, 161, 86, 0.6) 0%, rgba(116, 161, 86, 0.6) 100%), linear-gradient(90deg, rgb(116, 161, 86) 0%, rgb(116, 161, 86) 100%)",
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
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(116, 161, 86, 0.65) 0%, rgba(116, 161, 86, 0.35) 100%)",
                }}
              />
            </div>

            {/* Headline Text in Amharic (44:598) */}
            <p className="absolute left-[20.5px] top-[40px] text-[20px] font-semibold text-white leading-normal drop-shadow-sm whitespace-nowrap">
              ጥራት መለያችን ነው !
            </p>

            {/* Pill Badge 1: ተመጣጣኝ ዋጋ (44:599) */}
            <div className="absolute left-[20.5px] top-[85px] flex items-center gap-[4px] bg-black/20 backdrop-blur-xs px-[7px] py-[2px] rounded-full border border-white/20">
              <div className="bg-white size-[16px] rounded-full flex items-center justify-center shrink-0">
                <PercentageCircle size={12} color="#74a156" variant="Bold" />
              </div>
              <span className="text-[9.5px] font-semibold text-white tracking-[-0.37px] whitespace-nowrap">
                ተመጣጣኝ ዋጋ
              </span>
            </div>

            {/* Pill Badge 2: የተሻለ ጥራት (44:605) */}
            <div className="absolute left-[128.5px] top-[85px] flex items-center gap-[4px] bg-black/20 backdrop-blur-xs px-[7px] py-[2px] rounded-full border border-white/20">
              <div className="bg-white size-[16px] rounded-full flex items-center justify-center shrink-0">
                <TickCircle size={12} color="#74a156" variant="Bold" />
              </div>
              <span className="text-[9.5px] font-semibold text-white tracking-[-0.37px] whitespace-nowrap">
                የተሻለ ጥራት
              </span>
            </div>
          </div>

          {/* Carousel Dots Indicator (44:611) */}
          <div className="pt-[8px] flex items-center justify-center">
            <Image
              src="/images/dots.svg"
              alt="Indicator"
              width={34}
              height={5}
            />
          </div>
        </section>

        {/* 3. Section: ሌሎች ምርቶች (19:146) */}
        <section className="w-full flex flex-col gap-[8px] py-[6px]">
          <div className="flex items-center justify-between px-[4px] w-full">
            <h2 className="text-[15px] font-medium text-black leading-[1.4]">
              ሌሎች ምርቶች
            </h2>
            <Link
              href="/shop"
              className="text-[12px] font-semibold text-[#74a156] hover:text-[#669049] active:scale-95 transition-all px-1 py-0.5"
            >
              See all
            </Link>
          </div>

          {/* 3 Shop Product Cards (19:149) */}
          <div className="flex gap-[10px] items-center justify-between w-full">
            {shopProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#e2e3dd] rounded-[8px] overflow-hidden flex-1 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.02)] flex flex-col"
              >
                {/* Product Image Area (44:812) */}
                <div className="bg-[#e2e3dd] h-[78px] w-full relative flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover mix-blend-multiply"
                  />
                </div>

                {/* Card Body (44:814) */}
                <div className="p-[8px] flex flex-col gap-[4px]">
                  <span className="text-[12px] font-semibold text-[#1a1c19] leading-[16px] truncate">
                    {product.name}
                  </span>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[14px] font-bold text-[#163422] leading-[20px]">
                      {product.priceETB} ETB
                    </span>

                    {/* Add Button (44:820) */}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-[#74a156] hover:bg-[#669049] active:scale-90 transition-all rounded-full size-[24px] flex items-center justify-center shrink-0 shadow-2xs"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <Add size={14} color="#ffffff" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
