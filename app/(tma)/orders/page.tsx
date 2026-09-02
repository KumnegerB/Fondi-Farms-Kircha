"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardTick, Danger, InfoCircle } from "iconsax-react";
import { useAppStore, useI18n } from "@/store/useAppStore";
import { cn, formatETB } from "@/lib/utils";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"kircha" | "shop">("kircha");
  const { t } = useI18n();
  const { reservations } = useAppStore();

  const shopOrders = [
    {
      id: "shp-ord-1",
      orderNumber: "SHP-1092",
      productName: "Fresh Farm Eggs (2 Trays)",
      quantityText: "2 Trays (60 Eggs)",
      totalETB: 1300,
      statusLabel: t.orders.statusReady,
    },
  ];

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[140px] flex flex-col items-center">
      {/* Sticky Header with Tab Switcher */}
      <div className="sticky top-0 z-40 w-full bg-white border-b border-[rgba(0,0,0,0.06)]">
        {/* Top Header */}
        <div className="w-full flex h-[68px] items-center justify-center px-[14px] py-[12px]">
          <h1 className="font-semibold text-[#111827] text-[20px] text-center tracking-[-0.33px]">
            {t.orders.title}
          </h1>
        </div>

        {/* Dual Tab Switcher */}
        <div className="w-full px-[14px] pt-[8px] pb-[8px] bg-white">
          <div className="w-full bg-[#f8fafc] border border-[rgba(226,232,240,0.7)] h-[44px] rounded-[12px] p-[5px] flex items-center justify-between shadow-2xs">
            {/* Tab 1: Kircha */}
            <button
              onClick={() => setActiveTab("kircha")}
              className={cn(
                "flex-1 h-full rounded-[9px] flex items-center justify-center gap-[5px] transition-all cursor-pointer",
                activeTab === "kircha"
                  ? "bg-[#74a156] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]"
                  : "hover:bg-stone-200/50",
              )}
            >
              <span
                className={cn(
                  "text-[12px] whitespace-nowrap",
                  activeTab === "kircha"
                    ? "text-white font-semibold"
                    : "text-[#62748e] font-medium",
                )}
              >
                {t.orders.kirchaTab}
              </span>
              <div
                className={cn(
                  "size-[18px] rounded-full flex items-center justify-center shrink-0",
                  activeTab === "kircha" ? "bg-white" : "bg-[#74a156]",
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-bold leading-none",
                    activeTab === "kircha" ? "text-[#74a156]" : "text-white",
                  )}
                >
                  {reservations.length}
                </span>
              </div>
            </button>

            {/* Tab 2: Shop Orders */}
            <button
              onClick={() => setActiveTab("shop")}
              className={cn(
                "flex-1 h-full rounded-[9px] flex items-center justify-center gap-[5px] transition-all cursor-pointer",
                activeTab === "shop"
                  ? "bg-[#74a156] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]"
                  : "hover:bg-stone-200/50",
              )}
            >
              <span
                className={cn(
                  "text-[12px] whitespace-nowrap",
                  activeTab === "shop"
                    ? "text-white font-semibold"
                    : "text-[#62748e] font-medium",
                )}
              >
                {t.orders.shopTab}
              </span>
              <div
                className={cn(
                  "size-[18px] rounded-full flex items-center justify-center shrink-0",
                  activeTab === "shop" ? "bg-white" : "bg-[#74a156]",
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-bold leading-none",
                    activeTab === "shop" ? "text-[#74a156]" : "text-white",
                  )}
                >
                  {shopOrders.length}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[430px] flex flex-col gap-[12px] items-center py-[6px] px-[14px]">
        {/* Tab 1: Kircha Orders List */}
        {activeTab === "kircha" && (
          <div className="flex flex-col gap-[16px] w-full items-center">
            {reservations.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-stone-500 w-full text-xs border border-stone-200">
                {t.orders.emptyKirchaOrders}
              </div>
            ) : (
              reservations.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-[rgba(194,200,192,0.3)] rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] w-full overflow-hidden flex flex-col shrink-0"
                >
                  {/* Media Hero Header */}
                  <div className="h-[160px] w-full relative bg-[#edeee8] overflow-hidden">
                    <Image
                      src={order.cattleImage}
                      alt={order.cattleName}
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Balance Due Status Badge */}
                    <div className="absolute right-[12px] top-[12px] bg-[rgba(230,138,0,0.15)] border border-[rgba(230,138,0,0.3)] backdrop-blur-[6px] px-[11px] py-[4px] rounded-full flex items-center justify-center">
                      <span className="text-[#e68a00] text-[11px] font-bold tracking-[0.55px] uppercase">
                        {t.orders.statusBalanceDue}
                      </span>
                    </div>
                  </div>

                  {/* Body Content Area */}
                  <div className="p-[14px] flex flex-col gap-[10px] w-full">
                    {/* Header Row: Ox Title & Portion Quantity */}
                    <div className="flex items-start justify-between w-full">
                      <div className="flex flex-col gap-[2px]">
                        <h2 className="text-[17px] font-bold text-[#1a1c19] leading-[22px]">
                          {order.cattleName}
                        </h2>
                        <span className="text-[11px] font-semibold text-[#868685]">
                          {t.orders.tagId} {order.tagNumber}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[14px] font-bold text-[#74a156]">
                          {(order.quarterUnits * 0.25).toFixed(2)} Unit
                        </span>
                        <p className="text-[11px] text-[#868685]">
                          ({order.quarterUnits}/4 share)
                        </p>
                      </div>
                    </div>

                    {/* Slaughter Schedule Row */}
                    <div className="text-[12px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-100 flex justify-between">
                      <span>{t.orders.slaughterDate}</span>
                      <strong className="text-stone-800">
                        {order.slaughterDate}
                      </strong>
                    </div>

                    {/* Balance Breakdown Surface */}
                    <div className="bg-[#f3f4ee] rounded-[10px] p-[12px] flex flex-col gap-[6px]">
                      <div className="flex justify-between items-center text-[12px] text-[#424843]">
                        <span>{t.kircha.totalSellingPrice}:</span>
                        <span className="font-semibold text-[#1a1c19]">
                          {formatETB(order.totalPriceETB)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] text-[#424843]">
                        <span>{t.orders.depositPaid}</span>
                        <span className="font-semibold text-[#74a156]">
                          {formatETB(order.depositPaidETB)}
                        </span>
                      </div>
                      <div className="h-px bg-[#c2c8c0] my-[2px]" />
                      <div className="flex justify-between items-center text-[13px] font-bold">
                        <span className="text-[#d32f2f] flex items-center gap-[4px]">
                          <Danger size={14} color="#d32f2f" variant="Bold" />
                          <span>{t.orders.balanceRemaining}</span>
                        </span>
                        <span className="text-[#d32f2f] text-[15px] font-extrabold">
                          {formatETB(order.remainingBalanceETB)}
                        </span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-[10px] pt-1">
                      <button className="flex-1 bg-[#74a156] hover:bg-[#669049] active:scale-[0.98] transition-all text-white py-[12px] rounded-[10px] flex items-center justify-center gap-[6px] shadow-xs cursor-pointer">
                        <CardTick size={16} color="#ffffff" variant="Bold" />
                        <span className="text-[13px] font-bold">
                          {t.orders.payBalance}
                        </span>
                      </button>

                      <Link
                        href={`/kircha/${order.cattleId}`}
                        className="bg-white border border-[#c2c8c0] hover:bg-[#f2f4f2] active:scale-95 transition-all size-[44px] rounded-[10px] flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
                        aria-label="Order Details"
                      >
                        <InfoCircle
                          size={20}
                          color="#74a156"
                          variant="Linear"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Shop Orders List */}
        {activeTab === "shop" && (
          <div className="flex flex-col gap-[12px] w-full items-center">
            {shopOrders.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-stone-500 w-full text-xs border border-stone-200">
                {t.orders.emptyShopOrders || "No shop orders found"}
              </div>
            ) : (
              shopOrders.map((shopOrd) => (
                <div
                  key={shopOrd.id}
                  className="bg-white border border-[rgba(194,200,192,0.3)] rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] w-full p-[14px] flex flex-col gap-[8px]"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-[#1a1c19]">
                      {shopOrd.orderNumber}
                    </span>
                    <span className="bg-[#74a156]/15 text-[#74a156] text-[10px] font-bold px-[8px] py-[3px] rounded-full uppercase">
                      {shopOrd.statusLabel}
                    </span>
                  </div>
                  <p className="text-[14px] font-bold text-stone-900">
                    {shopOrd.productName}
                  </p>
                  <div className="flex justify-between items-center text-[12px] text-stone-500 pt-1 border-t border-stone-100">
                    <span>{shopOrd.quantityText}</span>
                    <strong className="text-[14px] text-stone-900">
                      {formatETB(shopOrd.totalETB)}
                    </strong>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
