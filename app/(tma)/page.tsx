"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Add,
  TickCircle,
  BagHappy,
  User,
  Flash,
  ShieldTick,
} from "iconsax-react";
import { useAppStore, useI18n } from "@/store/useAppStore";
import { useTelegram } from "@/hooks/useTelegram";
import { formatETB } from "@/lib/utils";
import { getProducts, FrontendProduct } from "@/lib/api/products";

interface AnimalCategory {
  id: string;
  name: string;
  image: string;
  href: string;
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

export default function HomePage() {
  const { user: tgUser } = useTelegram();
  const { t, language } = useI18n();
  const { userName, addToCart, getCartCount, authToken } = useAppStore();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [liveProducts, setLiveProducts] = useState<FrontendProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Swipe & Touch Refs
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const bannerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic Greeting Display Name
  const displayName = tgUser?.first_name
    ? `${tgUser.first_name} ${tgUser.last_name || ""}`.trim()
    : userName || "Mathias A.";

  // Carousel Banners matching Figma style
  const bannerSlides: BannerSlide[] = [
    {
      id: "slide-1",
      title: t.home.banner1Headline,
      badge1Icon: <Flash size={10} color="#74a156" variant="Bold" />,
      badge1Text: t.home.banner1Badge1,
      badge2Icon: <ShieldTick size={10} color="#74a156" variant="Bold" />,
      badge2Text: t.home.banner1Badge2,
      image: "/images/hero-banner.jpg",
      href: "/kircha",
    },
    {
      id: "slide-2",
      title: t.home.banner2Headline,
      badge1Icon: <Flash size={10} color="#74a156" variant="Bold" />,
      badge1Text: t.home.banner2Badge1,
      badge2Icon: <ShieldTick size={10} color="#74a156" variant="Bold" />,
      badge2Text: t.home.banner2Badge2,
      image: "/images/figma_banner.png",
      href: "/kircha",
    },
    {
      id: "slide-3",
      title: t.home.banner3Headline,
      badge1Icon: <Flash size={10} color="#74a156" variant="Bold" />,
      badge1Text: t.home.banner3Badge1,
      badge2Icon: <ShieldTick size={10} color="#74a156" variant="Bold" />,
      badge2Text: t.home.banner3Badge2,
      image: "/images/fresh_milk_yogurt.png",
      href: "/shop",
    },
  ];

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    bannerTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => {
      if (bannerTimerRef.current) clearInterval(bannerTimerRef.current);
    };
  }, [bannerSlides.length]);

  // Fetch live products from backend
  useEffect(() => {
    let isMounted = true;

    getProducts({ page: 1, limit: 10, token: authToken })
      .then((items) => {
        if (isMounted) {
          setLiveProducts(items);
          setIsLoadingProducts(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching homepage products:", err);
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [authToken]);

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
      const swipeThreshold = 30;

      if (diffX > swipeThreshold) {
        handleNextSlide();
      } else if (diffX < -swipeThreshold) {
        handlePrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Mouse Drag Handlers for Desktop Testing
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
      const swipeThreshold = 30;

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
      name: t.animals.ox,
      image: "/images/figma_ox.png",
      href: "/kircha?type=ox",
    },
    {
      id: "sheep",
      name: t.animals.sheep,
      image: "/images/figma_sheep.png",
      href: "/kircha?type=sheep",
    },
    {
      id: "goat",
      name: t.animals.goat,
      image: "/images/figma_goat.png",
      href: "/kircha?type=goat",
    },
  ];

  const totalCartCount = getCartCount();

  const handleAddToCart = (e: React.MouseEvent, item: FrontendProduct) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      {
        id: item.id,
        name: item.name,
        priceETB: item.priceETB,
        images: item.images,
        unit: item.shopUnit,
        category: item.shopCategory,
        availableStock: item.availableStock,
        isActive: item.isAvailable,
        description: item.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      1,
    );

    setAddedProductId(item.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[140px] flex flex-col items-center">
      {/* Floating & Sticky Top Header (61:2317) */}
      <header className="bg-white/95 backdrop-blur-md w-full h-[68px] flex items-center justify-between px-[16px] border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-40 shadow-xs">
        {/* User Identity on Left */}
        <Link
          href="/profile"
          className="flex items-center gap-[10px] hover:opacity-85 transition-opacity"
        >
          <div className="bg-[#74a156] border-2 border-white shadow-2xs size-[40px] rounded-full flex items-center justify-center shrink-0">
            <User size={20} color="#ffffff" variant="Bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-[#868685] leading-[14px]">
              {t.home.greeting}
            </span>
            <span className="text-[14px] font-bold text-[#1a1c19] tracking-tight leading-[18px]">
              {displayName}
            </span>
          </div>
        </Link>

        {/* Shopping Cart Icon on Right */}
        <Link
          href="/shop/cart"
          className="relative size-[40px] rounded-full bg-[#f2f4f2] hover:bg-[#e6e8e6] flex items-center justify-center transition-all"
          aria-label="Shopping Cart"
        >
          <BagHappy size={22} color="#1a1c19" variant="Linear" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#74a156] text-white text-[10px] font-bold rounded-full size-[18px] flex items-center justify-center shadow-xs">
              {totalCartCount}
            </span>
          )}
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[430px] flex flex-col items-center py-[10px] px-[14px]">
        {/* 1. Section: Kircha Cattle (19:127) */}
        <section className="w-full flex flex-col gap-[8px] py-[6px]">
          <div className="flex items-center justify-between px-[4px]">
            <h2 className="text-[15px] font-bold text-black leading-[1.4]">
              {t.home.kirchaSectionTitle}
            </h2>
            <Link
              href="/kircha"
              className="text-[12px] font-semibold text-[#74a156] hover:text-[#669049] active:scale-95 transition-all px-1 py-0.5"
            >
              {t.common.seeAll}
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
            className="h-[126px] w-full overflow-hidden relative rounded-[12px] shrink-0 shadow-xs cursor-grab active:cursor-grabbing select-none touch-pan-y"
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
                >
                  {/* Background Photo with soft overlay */}
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover brightness-95"
                      priority={idx === 0}
                      draggable={false}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(116, 161, 86, 0.8) 0%, rgba(116, 161, 86, 0.45) 100%)",
                      }}
                    />
                  </div>

                  {/* Headline Text */}
                  <p className="absolute left-[20px] top-[36px] text-[17px] font-bold text-white leading-tight drop-shadow-sm whitespace-nowrap">
                    {slide.title}
                  </p>

                  {/* Badges Row */}
                  <div className="absolute left-[20px] top-[80px] flex items-center gap-[6px]">
                    <div className="flex items-center gap-[4px] bg-black/30 backdrop-blur-xs px-[8px] py-[2px] rounded-full border border-white/20">
                      <div className="bg-white size-[16px] rounded-full flex items-center justify-center shrink-0">
                        {slide.badge1Icon}
                      </div>
                      <span className="text-[9.5px] font-semibold text-white tracking-tight whitespace-nowrap">
                        {slide.badge1Text}
                      </span>
                    </div>

                    <div className="flex items-center gap-[4px] bg-black/30 backdrop-blur-xs px-[8px] py-[2px] rounded-full border border-white/20">
                      <div className="bg-white size-[16px] rounded-full flex items-center justify-center shrink-0">
                        {slide.badge2Icon}
                      </div>
                      <span className="text-[9.5px] font-semibold text-white tracking-tight whitespace-nowrap">
                        {slide.badge2Text}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicator Dots */}
            <div className="absolute bottom-[8px] right-[12px] flex items-center gap-[4px] z-10 bg-black/30 backdrop-blur-xs px-2 py-1 rounded-full">
              {bannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                    resetBannerTimer();
                  }}
                  className={`rounded-full transition-all cursor-pointer ${
                    currentSlide === idx
                      ? "w-[14px] h-[5px] bg-white"
                      : "size-[5px] bg-white/50"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Section: Other Products (52:1945) */}
        <section className="w-full flex flex-col gap-[8px] py-[6px]">
          <div className="flex items-center justify-between px-[4px]">
            <h2 className="text-[15px] font-bold text-black leading-[1.4]">
              {t.home.otherProductsTitle}
            </h2>
            <Link
              href="/shop"
              className="text-[12px] font-semibold text-[#74a156] hover:text-[#669049] active:scale-95 transition-all px-1 py-0.5"
            >
              {t.common.seeAll}
            </Link>
          </div>

          {/* Product Items List */}
          {isLoadingProducts ? (
            <div className="w-full py-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#74a156] border-t-transparent" />
            </div>
          ) : liveProducts.length === 0 ? (
            <div className="bg-white rounded-[12px] p-6 text-center w-full border border-stone-200">
              <p className="text-xs text-stone-500">
                {language === "am"
                  ? "ምንም ምርቶች አልተገኙም"
                  : "No products available right now"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-[10px] w-full">
              {liveProducts.slice(0, 3).map((item) => {
                const isJustAdded = addedProductId === item.id;

                return (
                  <Link
                    key={item.id}
                    href="/shop"
                    className="bg-white border border-[#e2e3dd] rounded-[12px] p-[10px] flex items-center justify-between shadow-2xs hover:border-[#74a156]/50 transition-all group"
                  >
                    <div className="flex items-center gap-[12px] min-w-0 flex-1">
                      <div className="relative size-[56px] rounded-[8px] overflow-hidden bg-[#e2e3dd] shrink-0">
                        <Image
                          src={
                            item.images[0] || "/images/fresh_milk_yogurt.png"
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col min-w-0 flex-1 pr-2">
                        <h4 className="font-bold text-[13px] text-[#1a1c19] truncate group-hover:text-[#74a156] transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-[#868685] truncate">
                          {item.description}
                        </span>
                        <span className="font-extrabold text-[13px] text-[#163422] pt-0.5">
                          {formatETB(item.priceETB)}
                          <span className="text-[10px] font-normal text-[#868685] ml-1">
                            / {item.unit}
                          </span>
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, item)}
                      className={`size-[32px] rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs active:scale-90 ${
                        isJustAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-[#74a156] hover:bg-[#669049] text-white"
                      }`}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      {isJustAdded ? (
                        <TickCircle size={16} color="#ffffff" variant="Bold" />
                      ) : (
                        <Add size={16} color="#ffffff" />
                      )}
                    </button>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
