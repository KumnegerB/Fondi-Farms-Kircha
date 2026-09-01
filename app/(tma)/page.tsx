"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTelegram } from "@/hooks/useTelegram";
import { useAppStore } from "@/store/useAppStore";
import {
  PercentageCircle,
  TickCircle,
  Add,
  ShieldTick,
  Like1,
} from "iconsax-react";
import { cn } from "@/lib/utils";

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

interface BannerSlide {
  id: string;
  title: string;
  badge1Icon: React.ReactNode;
  badge1Text: string;
  badge2Icon: React.ReactNode;
  badge2Text: string;
  image: string;
  href: string;
}

export default function TMAHomePage() {
  const { user } = useTelegram();
  const { cartItems, addToCart, getCartCount } = useAppStore();

  const displayName = user
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : "Mathias A.";

  // Banner Carousel State with Touch / Swipe
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const bannerSlides: BannerSlide[] = [
    {
      id: "slide-1",
      title: "ጥራት መለያችን ነው !",
      badge1Icon: <PercentageCircle size={12} color="#74a156" variant="Bold" />,
      badge1Text: "ተመጣጣኝ ዋጋ",
      badge2Icon: <TickCircle size={12} color="#74a156" variant="Bold" />,
      badge2Text: "የተሻለ ጥራት",
      image: "/images/figma_banner.png",
      href: "/kircha",
    },
    {
      id: "slide-2",
      title: "የበዓል ቅርጫ ዝግጅት !",
      badge1Icon: <ShieldTick size={12} color="#74a156" variant="Bold" />,
      badge1Text: "100% ጤናማ",
      badge2Icon: <Like1 size={12} color="#74a156" variant="Bold" />,
      badge2Text: "ቀጥታ ከእርሻ",
      image: "/images/borana_ox_detail.png",
      href: "/kircha",
    },
    {
      id: "slide-3",
      title: "ትኩስ የወተትና የእንቁላል ምርቶች",
      badge1Icon: <TickCircle size={12} color="#74a156" variant="Bold" />,
      badge1Text: "በየቀኑ ትኩስ",
      badge2Icon: <PercentageCircle size={12} color="#74a156" variant="Bold" />,
      badge2Text: "አምቦ እርሻ",
      image: "/images/fresh_milk_yogurt.png",
      href: "/shop",
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    bannerTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);

    return () => {
      if (bannerTimerRef.current) clearInterval(bannerTimerRef.current);
    };
  }, [bannerSlides.length]);

  const resetBannerTimer = () => {
    if (bannerTimerRef.current) clearInterval(bannerTimerRef.current);
    bannerTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    resetBannerTimer();
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length,
    );
    resetBannerTimer();
  };

  // Touch Swipe Handlers for Banner
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diffX = touchStartXRef.current - touchEndXRef.current;
      const swipeThreshold = 35;

      if (diffX > swipeThreshold) {
        handleNextSlide();
      } else if (diffX < -swipeThreshold) {
        handlePrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Mouse Drag Handlers for Testing
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartXRef.current = e.clientX;
    touchEndXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartXRef.current !== null) {
      touchEndXRef.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diffX = touchStartXRef.current - touchEndXRef.current;
      const swipeThreshold = 35;

      if (diffX > swipeThreshold) {
        handleNextSlide();
      } else if (diffX < -swipeThreshold) {
        handlePrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

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
    <div className="bg-[#f2f4f2] min-h-screen pb-[140px] flex flex-col items-center">
      {/* Floating & Sticky Top Header (61:2317) */}
      <header className="bg-white/95 backdrop-blur-md w-full h-[68px] flex items-center justify-between px-[16px] border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-40 shadow-xs">
        {/* User Identity on Left (61:2330) */}
        <Link
          href="/profile"
          className="flex items-center gap-[8px] cursor-pointer"
        >
          <div className="size-[34px] rounded-full overflow-hidden bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200">
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
          className="relative p-2 flex items-center justify-center active:scale-95 transition-transform"
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
      <main className="w-full max-w-[430px] flex flex-col items-center py-[10px] px-[14px]">
        {/* 1. Section: ቅርጫ (19:127) */}
        <section className="w-full flex flex-col gap-[8px] py-[6px]">
          <div className="flex items-center justify-between px-[4px]">
            <h2 className="text-[15px] font-medium text-black leading-[1.4]">
              ቅርጫ
            </h2>
            <Link
              href="/kircha"
              className="text-[12px] font-semibold text-[#74a156] hover:text-[#669049] active:scale-95 transition-all px-1 py-0.5"
            >
              See all
            </Link>
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

        {/* 2. Middle Hero Swipable Banner Section (44:595) */}
        <section className="w-full flex flex-col items-center py-[12px]">
          {/* Swipable Carousel Box */}
          <div
            className="h-[126px] w-full overflow-hidden relative rounded-[12px] shrink-0 shadow-xs cursor-pointer select-none touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Slides track */}
            <div
              className="flex h-full w-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {bannerSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="relative h-full w-full shrink-0 overflow-hidden"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(116, 161, 86, 0.75) 0%, rgba(116, 161, 86, 0.6) 100%)",
                  }}
                >
                  {/* Background Photo with soft dark/green overlay */}
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover -scale-y-100 rotate-180 brightness-95"
                      priority={idx === 0}
                      draggable={false}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(116, 161, 86, 0.7) 0%, rgba(116, 161, 86, 0.4) 100%)",
                      }}
                    />
                  </div>

                  {/* Headline Text */}
                  <p className="absolute left-[20.5px] top-[40px] text-[19px] font-semibold text-white leading-normal drop-shadow-sm whitespace-nowrap">
                    {slide.title}
                  </p>

                  {/* Pill Badge 1 */}
                  <div className="absolute left-[20.5px] top-[85px] flex items-center gap-[4px] bg-black/25 backdrop-blur-xs px-[8px] py-[2px] rounded-full border border-white/20">
                    <div className="bg-white size-[16px] rounded-full flex items-center justify-center shrink-0">
                      {slide.badge1Icon}
                    </div>
                    <span className="text-[9.5px] font-semibold text-white tracking-[-0.37px] whitespace-nowrap">
                      {slide.badge1Text}
                    </span>
                  </div>

                  {/* Pill Badge 2 */}
                  <div className="absolute left-[132px] top-[85px] flex items-center gap-[4px] bg-black/25 backdrop-blur-xs px-[8px] py-[2px] rounded-full border border-white/20">
                    <div className="bg-white size-[16px] rounded-full flex items-center justify-center shrink-0">
                      {slide.badge2Icon}
                    </div>
                    <span className="text-[9.5px] font-semibold text-white tracking-[-0.37px] whitespace-nowrap">
                      {slide.badge2Text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Carousel Dots Indicator (44:611) */}
          <div className="pt-[8px] flex items-center justify-center gap-1.5">
            {bannerSlides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  setCurrentSlide(dotIdx);
                  resetBannerTimer();
                }}
                className={cn(
                  "rounded-full transition-all duration-300 cursor-pointer",
                  dotIdx === currentSlide
                    ? "bg-[#74a156] w-5 h-1.5 shadow-xs"
                    : "bg-stone-300 w-1.5 h-1.5 hover:bg-stone-400",
                )}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
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
                      className="bg-[#74a156] hover:bg-[#669049] active:scale-90 transition-all rounded-full size-[24px] flex items-center justify-center shrink-0 shadow-2xs cursor-pointer"
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
