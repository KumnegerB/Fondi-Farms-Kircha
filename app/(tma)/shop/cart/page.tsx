"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft2,
  Trash,
  Add,
  Minus,
  ShoppingBag,
  Location,
  CardTick,
  TickCircle,
} from "iconsax-react";
import { useAppStore } from "@/store/useAppStore";
import { formatETB } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/constants";

export default function ShopCartPage() {
  const router = useRouter();
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useAppStore();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const totalAmountETB = getCartTotal();

  const handleCheckout = () => {
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[150px] flex flex-col items-center">
      {/* Top Header */}
      <header className="bg-white w-full flex h-[68px] items-center justify-between px-[14px] py-[12px] border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-30">
        <button
          onClick={() => router.back()}
          className="bg-[#f2f4f2] hover:bg-[#e6e8e6] active:scale-95 transition-all rounded-full size-[40px] flex items-center justify-center shrink-0 cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft2 size={20} color="#111827" variant="Linear" />
        </button>

        <h1 className="font-semibold text-[#111827] text-[20px] text-center tracking-[-0.33px]">
          የግዢ ቅርጫት
        </h1>

        {cartItems.length > 0 ? (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2 py-1"
          >
            Clear
          </button>
        ) : (
          <div className="w-[40px]" />
        )}
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-[430px] flex flex-col gap-[14px] items-center py-[12px] px-[14px]">
        {cartItems.length === 0 ? (
          <div className="flex-1 w-full flex flex-col items-center justify-center text-center p-8 space-y-4 my-12 bg-white rounded-[16px] border border-[rgba(194,200,192,0.3)] shadow-xs">
            <div className="size-16 bg-[#f2f4f2] rounded-full flex items-center justify-center text-stone-400 mx-auto">
              <ShoppingBag size={32} color="#74a156" variant="Linear" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">
                Your cart is empty
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-[220px]">
                Explore fresh dairy, eggs, and poultry products produced at our
                Ambo farm.
              </p>
            </div>
            <Link href="/shop" className="pt-2 w-full">
              <button className="w-full bg-[#74a156] hover:bg-[#669049] active:scale-95 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-xs cursor-pointer">
                Browse Farm Shop
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-[12px]">
            {/* Cart Items List */}
            <div className="flex flex-col gap-[10px] w-full">
              {cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-[12px] bg-white p-[12px] rounded-[12px] border border-[rgba(194,200,192,0.3)] shadow-2xs"
                >
                  {/* Thumbnail Image */}
                  <div className="relative size-[64px] rounded-[8px] overflow-hidden bg-[#e2e3dd] shrink-0">
                    <Image
                      src={product.images[0] || "/images/fresh_milk_yogurt.png"}
                      alt={product.name}
                      fill
                      className="object-cover mix-blend-multiply"
                    />
                  </div>

                  {/* Title & Unit Price */}
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <h4 className="font-bold text-[13px] text-[#1a1c19] truncate">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-[#868685]">
                      {formatETB(product.priceETB)} / {product.unit}
                    </span>
                    <span className="font-extrabold text-[14px] text-[#163422] pt-0.5">
                      {formatETB(product.priceETB * quantity)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-[8px] bg-[#f8fafc] border border-stone-200/80 rounded-[8px] p-1">
                    <button
                      type="button"
                      onClick={() =>
                        quantity === 1
                          ? removeFromCart(product.id)
                          : updateCartQuantity(product.id, quantity - 1)
                      }
                      className="size-[26px] flex items-center justify-center rounded-[6px] bg-white hover:bg-stone-100 text-stone-700 shadow-2xs cursor-pointer active:scale-90"
                      aria-label="Decrease quantity"
                    >
                      {quantity === 1 ? (
                        <Trash size={14} color="#d32f2f" variant="Linear" />
                      ) : (
                        <Minus size={12} color="#1a1c19" />
                      )}
                    </button>

                    <span className="text-[13px] font-bold w-4 text-center text-[#1a1c19]">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateCartQuantity(product.id, quantity + 1)
                      }
                      className="size-[26px] flex items-center justify-center rounded-[6px] bg-white hover:bg-stone-100 text-stone-700 shadow-2xs cursor-pointer active:scale-90"
                      aria-label="Increase quantity"
                    >
                      <Add size={12} color="#1a1c19" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pickup Location Card */}
            <div className="bg-white border border-[#e2e3dd] rounded-[12px] p-[12px] flex items-center gap-[12px] shadow-2xs">
              <div className="bg-[#fed3c7] size-[38px] rounded-full flex items-center justify-center shrink-0">
                <Location size={18} color="#d32f2f" variant="Bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-[#868685]">
                  Designated Pickup Spot
                </span>
                <span className="text-[13px] font-semibold text-[#1a1c19]">
                  {APP_CONFIG.defaultPickupLocation}
                </span>
              </div>
            </div>

            {/* Order Total & Payment Summary Card */}
            <div className="bg-[#f3f4ee] border border-[rgba(194,200,192,0.4)] rounded-[12px] p-[14px] flex flex-col gap-[8px] shadow-2xs">
              <div className="flex justify-between items-center text-[13px] text-[#424843]">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#1a1c19]">
                  {formatETB(totalAmountETB)}
                </span>
              </div>
              <div className="flex justify-between items-center text-[13px] text-[#424843]">
                <span>Pickup Fee:</span>
                <span className="font-semibold text-[#74a156]">FREE</span>
              </div>

              <div className="h-px bg-[#c2c8c0] my-1" />

              <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold text-[#1a1c19]">
                  Total Payment:
                </span>
                <span className="text-[18px] font-extrabold text-[#163422]">
                  {formatETB(totalAmountETB)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-[#74a156] hover:bg-[#669049] active:scale-[0.98] transition-all text-white font-bold py-[16px] rounded-[12px] text-[16px] flex items-center justify-center gap-2 shadow-sm drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] cursor-pointer mt-1"
            >
              <CardTick size={18} color="#ffffff" variant="Bold" />
              <span>Pay Full Amount with Chapa</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 space-y-4 shadow-xl text-center">
            <div className="w-12 h-12 bg-emerald-100 text-[#74a156] rounded-full flex items-center justify-center mx-auto">
              <TickCircle size={28} color="#74a156" variant="Bold" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Your shop order is confirmed for collection at{" "}
                <strong>{APP_CONFIG.defaultPickupLocation}</strong>.
              </p>
              <div className="bg-stone-50 rounded-xl p-3 mt-3 text-xs space-y-1 text-left border border-stone-200">
                <div className="flex justify-between">
                  <span>Paid Total:</span>
                  <strong className="text-emerald-700">
                    {formatETB(totalAmountETB)}
                  </strong>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Status:</span>
                  <span className="font-semibold text-amber-600">
                    READY FOR PICKUP
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  clearCart();
                  setIsSuccessModalOpen(false);
                  router.push("/orders");
                }}
                className="flex-1 bg-[#74a156] text-white py-2.5 rounded-xl text-xs font-bold"
              >
                View in Orders
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setIsSuccessModalOpen(false);
                  router.push("/shop");
                }}
                className="px-4 border border-stone-300 py-2.5 rounded-xl text-xs text-stone-600"
              >
                Back to Shop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
