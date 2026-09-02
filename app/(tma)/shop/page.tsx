"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft2,
  Add,
  BagHappy,
  TickCircle,
  ShoppingBag,
} from "iconsax-react";
import { useAppStore, useI18n } from "@/store/useAppStore";
import { ShopProduct } from "@/types/shop";
import { cn, formatETB } from "@/lib/utils";

export default function ShopPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<
    "all" | "dairy" | "eggs" | "poultry"
  >("all");
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const { addToCart, getCartCount, getCartTotal } = useAppStore();
  const totalCartCount = getCartCount();
  const totalCartAmount = getCartTotal();

  const shopProducts: ShopProduct[] = [
    {
      id: "shp-1",
      name: "1L Milk & Yogurt",
      description:
        "Fresh pasteurized farm cow milk and creamy natural yogurt from Ambo highland farm.",
      category: "dairy",
      priceETB: 250,
      unit: "liter",
      images: ["/images/fresh_milk_yogurt.png"],
      availableStock: 25,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "shp-2",
      name: "Farm Fresh Eggs (Tray)",
      description: "1 Tray of 30 fresh organic free-range farm eggs.",
      category: "eggs",
      priceETB: 720,
      unit: "tray",
      images: ["/images/fresh_milk_yogurt.png"],
      availableStock: 40,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "shp-3",
      name: "Eggs (Single Piece)",
      description: "Fresh organic free-range farm egg.",
      category: "eggs",
      priceETB: 24,
      unit: "piece",
      images: ["/images/fresh_milk_yogurt.png"],
      availableStock: 150,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "shp-4",
      name: "Milk & Yogurt Family Kit",
      description:
        "Includes 2L pure whole milk + 1kg cultured yogurt + homemade farm butter.",
      category: "dairy",
      priceETB: 580,
      unit: "package",
      images: ["/images/fresh_milk_yogurt.png"],
      availableStock: 15,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "shp-5",
      name: "Whole Dressed Chicken",
      description:
        "Locally raised farm chicken, cleaned and ready for holiday cooking.",
      category: "poultry",
      priceETB: 850,
      unit: "whole_chicken",
      images: ["/images/fresh_milk_yogurt.png"],
      availableStock: 18,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "shp-6",
      name: "Highland Farm Butter (500g)",
      description: "Traditional Ethiopian spiced clarified highland butter.",
      category: "dairy",
      priceETB: 650,
      unit: "kg",
      images: ["/images/fresh_milk_yogurt.png"],
      availableStock: 20,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const categories = [
    { id: "all", label: t.shop.all, count: shopProducts.length },
    {
      id: "dairy",
      label: t.shop.dairy,
      count: shopProducts.filter((p) => p.category === "dairy").length,
    },
    {
      id: "eggs",
      label: t.shop.eggs,
      count: shopProducts.filter((p) => p.category === "eggs").length,
    },
    {
      id: "poultry",
      label: t.shop.poultry,
      count: shopProducts.filter((p) => p.category === "poultry").length,
    },
  ];

  const filteredProducts = shopProducts.filter((product) => {
    if (activeCategory === "all") return true;
    return product.category === activeCategory;
  });

  const handleAddProduct = (product: ShopProduct) => {
    addToCart(product, 1);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[180px] flex flex-col items-center">
      {/* Sticky Header with Category Tabs */}
      <div className="sticky top-0 z-40 w-full bg-white border-b border-[rgba(0,0,0,0.06)]">
        {/* Top Header */}
        <header className="w-full flex h-[68px] items-center justify-between px-[14px] py-[12px]">
          <button
            onClick={() => router.back()}
            className="bg-[#f2f4f2] hover:bg-[#e6e8e6] active:scale-95 transition-all rounded-full size-[40px] flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft2 size={20} color="#111827" variant="Linear" />
          </button>

          <h1 className="font-semibold text-[#111827] text-[20px] text-center tracking-[-0.33px]">
            {t.shop.title}
          </h1>

          <Link
            href="/shop/cart"
            className="relative size-[40px] rounded-full bg-[#f2f4f2] hover:bg-[#e6e8e6] flex items-center justify-center transition-all"
            aria-label="Cart"
          >
            <BagHappy size={22} color="#111827" variant="Linear" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#74a156] text-white text-[10px] font-bold rounded-full size-[18px] flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            )}
          </Link>
        </header>

        {/* Category Tabs Switcher */}
        <div className="w-full px-[14px] pt-[8px] pb-[8px] bg-white">
          <div className="w-full bg-[#f8fafc] border border-[rgba(226,232,240,0.7)] h-[44px] rounded-[12px] p-[5px] flex items-center justify-between shadow-2xs">
            {categories.map((c) => {
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id as "all" | "dairy" | "eggs" | "poultry")}
                  className={cn(
                    "flex-1 h-full rounded-[9px] flex items-center justify-center gap-[4px] transition-all cursor-pointer px-1",
                    isActive
                      ? "bg-[#74a156] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]"
                      : "hover:bg-stone-200/50",
                  )}
                >
                  <span
                    className={cn(
                      "text-[11px] whitespace-nowrap",
                      isActive
                        ? "text-white font-semibold"
                        : "text-[#62748e] font-medium",
                    )}
                  >
                    {c.label}
                  </span>
                  <div
                    className={cn(
                      "size-[16px] rounded-full flex items-center justify-center shrink-0",
                      isActive ? "bg-white" : "bg-[#74a156]",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[9px] font-bold leading-none",
                        isActive ? "text-[#74a156]" : "text-white",
                      )}
                    >
                      {c.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[430px] flex flex-col gap-[14px] items-center py-[6px] px-[14px]">
        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-[12px] w-full pt-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const isJustAdded = addedAnimationId === product.id;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#e2e3dd] rounded-[12px] overflow-hidden flex flex-col shadow-[0px_2px_8px_0px_rgba(0,0,0,0.03)] hover:border-[#74a156]/50 transition-all group"
                >
                  {/* Product Image Area */}
                  <div className="bg-[#e2e3dd] h-[100px] w-full relative flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.images[0] || "/images/fresh_milk_yogurt.png"}
                      alt={product.name}
                      fill
                      className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.availableStock <= 20 && (
                      <span className="absolute top-2 left-2 bg-[#74a156]/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                        {t.common.freshFarm}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-[10px] flex-1 flex flex-col justify-between gap-[8px]">
                    <div>
                      <h3 className="text-[13px] font-bold text-[#1a1c19] leading-[18px] line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[#868685] line-clamp-1 pt-0.5">
                        {product.unit.replace("_", " ")} • {t.common.amboFarm}
                      </p>
                    </div>

                    {/* Price & Add Button Row */}
                    <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                      <div className="flex items-baseline gap-[2px]">
                        <span className="text-[15px] font-extrabold text-[#163422]">
                          {product.priceETB.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-bold text-[#163422]">
                          {t.common.etb}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddProduct(product)}
                        className={cn(
                          "size-[30px] rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs active:scale-90",
                          isJustAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-[#74a156] hover:bg-[#669049] text-white",
                        )}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        {isJustAdded ? (
                          <TickCircle
                            size={16}
                            color="#ffffff"
                            variant="Bold"
                          />
                        ) : (
                          <Add size={16} color="#ffffff" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 bg-white rounded-xl p-8 text-center text-stone-500 w-full text-xs border border-stone-200">
              No products found in this category
            </div>
          )}
        </div>
      </div>

      {/* Floating Checkout Drawer Bar (When cart > 0) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-[74px] left-0 right-0 max-w-[430px] mx-auto px-[14px] z-40 animate-in slide-in-from-bottom duration-300">
          <Link
            href="/shop/cart"
            className="w-full bg-[#1a1c19] hover:bg-black text-white p-[12px] rounded-[14px] flex items-center justify-between shadow-lg backdrop-blur-md transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-[10px]">
              <div className="bg-[#74a156] size-[32px] rounded-full flex items-center justify-center text-white font-bold text-xs">
                {totalCartCount}
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-stone-300">
                  {t.shop.totalCart}
                </span>
                <span className="text-[15px] font-bold text-white leading-tight">
                  {formatETB(totalCartAmount)}
                </span>
              </div>
            </div>

            <div className="bg-[#74a156] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 text-white">
              <span>{t.shop.viewCart}</span>
              <ShoppingBag size={14} color="#ffffff" variant="Bold" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
