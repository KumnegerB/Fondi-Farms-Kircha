"use client";

import React, { useState, useEffect } from "react";
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
import { cn, formatETB } from "@/lib/utils";
import { getProducts, FrontendProduct } from "@/lib/api/products";

export default function ShopPage() {
  const router = useRouter();
  const { t } = useI18n();
  const { addToCart, getCartCount, getCartTotal, authToken } = useAppStore();

  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const totalCartCount = getCartCount();
  const totalCartAmount = getCartTotal();

  // Fetch live products from backend
  useEffect(() => {
    let isMounted = true;

    getProducts({ token: authToken })
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching live products:", err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [authToken]);

  // Dynamic category pills
  const categories = [
    { id: "all", label: t.shop.all, count: products.length },
    {
      id: "honey",
      label: "ማር (Honey)",
      count: products.filter((p) => p.categorySlug === "honey").length,
    },
    {
      id: "meat",
      label: "ስጋ (Meat)",
      count: products.filter((p) => p.categorySlug === "meat").length,
    },
    {
      id: "dairy",
      label: t.shop.dairy,
      count: products.filter((p) => p.categorySlug === "dairy").length,
    },
    {
      id: "eggs",
      label: t.shop.eggs,
      count: products.filter((p) => p.categorySlug === "eggs").length,
    },
    {
      id: "poultry",
      label: t.shop.poultry,
      count: products.filter((p) => p.categorySlug === "poultry").length,
    },
  ].filter((c) => c.id === "all" || c.count > 0 || products.length === 0);

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "all") return true;
    return product.categorySlug === activeCategory;
  });

  const handleAddProduct = (product: FrontendProduct) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.shopCategory,
        unit: product.shopUnit,
        priceETB: product.priceETB,
        availableStock: product.availableStock,
        isActive: product.isAvailable,
        images: product.images,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      1,
    );
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[180px] flex flex-col items-center">
      {/* Top Header */}
      <div className="sticky top-0 z-40 w-full bg-[#f2f4f2]/95 backdrop-blur-md flex flex-col items-center shadow-2xs">
        <header className="bg-white w-full flex h-[68px] items-center justify-between px-[14px] py-[12px] border-b border-[rgba(0,0,0,0.06)]">
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
        <div className="w-full max-w-[430px] px-[14px] pt-[8px] pb-[8px] overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-[6px] bg-[#f8fafc] border border-[rgba(226,232,240,0.7)] h-[44px] rounded-[12px] p-[5px] shadow-2xs min-w-max">
            {categories.map((c) => {
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={cn(
                    "h-full rounded-[9px] flex items-center justify-center gap-[5px] transition-all cursor-pointer px-3",
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
        {/* Loading Spinner */}
        {isLoading ? (
          <div className="w-full flex flex-col gap-3 py-12 items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#74a156] border-t-transparent" />
            <p className="text-xs text-stone-500">የእርሻ ምርቶችን በማምጣት ላይ...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-[12px] p-8 text-center w-full border border-stone-200 my-4">
            <p className="text-[#62748e] text-[15px] font-medium">
              በዚህ ምድብ ምንም ምርቶች አልተገኙም
            </p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-2 gap-[12px] w-full pt-1">
            {filteredProducts.map((product) => {
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
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Stock pill */}
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                      {product.availableStock} {product.unit}
                    </div>
                  </div>

                  {/* Body Content Area */}
                  <div className="p-[10px] flex flex-col justify-between flex-1 gap-1">
                    <div>
                      <h3 className="font-bold text-[13px] text-[#1a1c19] line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[#868685] line-clamp-1 mt-0.5">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-auto border-t border-stone-100">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-extrabold text-[#163422] leading-tight">
                          {formatETB(product.priceETB)}
                        </span>
                        <span className="text-[9px] text-[#868685] uppercase">
                          / {product.unit}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddProduct(product)}
                        className={cn(
                          "size-[32px] rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90",
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
            })}
          </div>
        )}
      </div>

      {/* Floating Cart Bar */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-[68px] left-0 right-0 z-30 flex justify-center w-full px-[14px] pointer-events-none">
          <div className="w-full max-w-[430px] pointer-events-auto">
            <Link
              href="/shop/cart"
              className="bg-[#163422] hover:bg-[#0f2317] text-white p-3.5 rounded-xl shadow-lg flex items-center justify-between transition-all active:scale-[0.99] border border-emerald-900/40 block"
            >
              <div className="flex items-center gap-3">
                <div className="relative bg-[#74a156] p-2 rounded-lg text-white">
                  <ShoppingBag size={20} color="#ffffff" variant="Bold" />
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-bold size-5 rounded-full flex items-center justify-center border-2 border-[#163422]">
                    {totalCartCount}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                    {t.shop.viewCart}
                  </span>
                  <p className="text-sm font-extrabold text-white">
                    {formatETB(totalCartAmount)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold text-xs bg-white/10 px-3 py-1.5 rounded-lg">
                <span>{t.shop.cartTitle}</span>
                <span className="text-emerald-400">→</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
