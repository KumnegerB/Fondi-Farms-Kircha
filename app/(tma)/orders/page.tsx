'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CardTick, Danger, InfoCircle } from 'iconsax-react';
import { cn } from '@/lib/utils';

interface KirchaOrder {
  id: string;
  cattleName: string;
  tagNumber: string;
  cattleImage: string;
  reservedUnitsText: string;
  reservedSharesText: string;
  totalValueETB: number;
  paidDepositETB: number;
  remainingBalanceETB: number;
  status: 'balance_due' | 'paid' | 'ready_for_pickup' | 'collected';
  statusLabel: string;
}

interface ShopOrder {
  id: string;
  orderNumber: string;
  productName: string;
  quantityText: string;
  totalETB: number;
  statusLabel: string;
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'kircha' | 'shop'>('kircha');

  const kirchaOrders: KirchaOrder[] = [
    {
      id: 'krc-ord-1',
      cattleName: 'Arsi Bull K-025',
      tagNumber: 'OX K-024',
      cattleImage: '/images/arsi_bull.png',
      reservedUnitsText: '1.25 Units',
      reservedSharesText: '(5/4 shares)',
      totalValueETB: 22500,
      paidDepositETB: 4500,
      remainingBalanceETB: 18000,
      status: 'balance_due',
      statusLabel: 'BALANCE DUE',
    },
    {
      id: 'krc-ord-2',
      cattleName: 'Borana Prime Ox K-024',
      tagNumber: 'OX K-020',
      cattleImage: '/images/figma_banner.png',
      reservedUnitsText: '0.50 Units',
      reservedSharesText: '(2/4 shares)',
      totalValueETB: 10000,
      paidDepositETB: 2000,
      remainingBalanceETB: 8000,
      status: 'balance_due',
      statusLabel: 'BALANCE DUE',
    },
  ];

  const shopOrders: ShopOrder[] = [
    {
      id: 'shp-ord-1',
      orderNumber: 'SHP-1092',
      productName: 'Fresh Farm Eggs (2 Trays)',
      quantityText: '2 Trays (60 Eggs)',
      totalETB: 1300,
      statusLabel: 'READY FOR PICKUP',
    },
  ];

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[110px] flex flex-col items-center">
      {/* Top Header (52:2115) */}
      <div className="bg-white w-full flex h-[68px] items-center justify-center px-[14px] py-[12px] border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-30">
        <h1 className="font-semibold text-[#111827] text-[22px] text-center tracking-[-0.33px]">
          ትዛዝ
        </h1>
      </div>

      {/* Main Content Area (52:1975) */}
      <div className="w-full max-w-[393px] flex flex-col gap-[12px] items-center py-[10px] px-[14px]">
        {/* Dual Tab Switcher (61:2575) */}
        <div className="w-[366px] bg-[#f8fafc] border border-[rgba(226,232,240,0.7)] h-[44px] rounded-[12px] p-[5px] flex items-center justify-between shrink-0 shadow-2xs">
          {/* Tab 1: ቅርጫ */}
          <button
            onClick={() => setActiveTab('kircha')}
            className={cn(
              'flex-1 h-full rounded-[9px] flex items-center justify-center gap-[5px] transition-all',
              activeTab === 'kircha'
                ? 'bg-[#74a156] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]'
                : 'hover:bg-stone-200/50'
            )}
          >
            <span
              className={cn(
                'text-[12px] whitespace-nowrap',
                activeTab === 'kircha' ? 'text-white font-medium' : 'text-[#62748e]'
              )}
            >
              ቅርጫ
            </span>
            <div
              className={cn(
                'size-[18px] rounded-full flex items-center justify-center shrink-0',
                activeTab === 'kircha' ? 'bg-white' : 'bg-[#74a156]'
              )}
            >
              <span
                className={cn(
                  'text-[10px] font-semibold leading-none',
                  activeTab === 'kircha' ? 'text-[#74a156]' : 'text-white'
                )}
              >
                {kirchaOrders.length}
              </span>
            </div>
          </button>

          {/* Tab 2: ሌሎች ምርቶች ትዛዝ */}
          <button
            onClick={() => setActiveTab('shop')}
            className={cn(
              'flex-1 h-full rounded-[9px] flex items-center justify-center gap-[5px] transition-all',
              activeTab === 'shop'
                ? 'bg-[#74a156] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]'
                : 'hover:bg-stone-200/50'
            )}
          >
            <span
              className={cn(
                'text-[12px] whitespace-nowrap',
                activeTab === 'shop' ? 'text-white font-medium' : 'text-[#62748e]'
              )}
            >
              ሌሎች ምርቶች ትዛዝ
            </span>
            <div
              className={cn(
                'size-[18px] rounded-full flex items-center justify-center shrink-0',
                activeTab === 'shop' ? 'bg-white' : 'bg-[#74a156]'
              )}
            >
              <span
                className={cn(
                  'text-[10px] font-semibold leading-none',
                  activeTab === 'shop' ? 'text-[#74a156]' : 'text-white'
                )}
              >
                {shopOrders.length}
              </span>
            </div>
          </button>
        </div>

        {/* Tab 1: Kircha Orders List (52:2234) */}
        {activeTab === 'kircha' && (
          <div className="flex flex-col gap-[16px] w-full items-center">
            {kirchaOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[rgba(194,200,192,0.3)] rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] w-[358px] overflow-hidden flex flex-col shrink-0"
              >
                {/* Media Hero Header (52:2235) */}
                <div className="h-[160px] w-full relative bg-[#edeee8] overflow-hidden">
                  <Image
                    src={order.cattleImage}
                    alt={order.cattleName}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Balance Due Status Badge (52:2237) */}
                  <div className="absolute right-[12px] top-[12px] bg-[rgba(230,138,0,0.15)] border border-[rgba(230,138,0,0.3)] backdrop-blur-[6px] px-[11px] py-[4px] rounded-full flex items-center justify-center">
                    <span className="text-[#e68a00] text-[11px] font-bold tracking-[0.55px] uppercase">
                      {order.statusLabel}
                    </span>
                  </div>

                  {/* ID Tag Overlay (52:2239) */}
                  <div className="absolute left-[12px] bottom-[12px] bg-white/90 backdrop-blur-[2px] px-[8px] py-[4px] rounded-[6px]">
                    <span className="text-[#1a1c19] text-[12px] font-bold tracking-[0.6px]">
                      ID: {order.tagNumber}
                    </span>
                  </div>
                </div>

                {/* Card Content Area (52:2241) */}
                <div className="p-[14px] flex flex-col gap-[10px] w-full">
                  {/* Top Row: Unit Info & Total Value (52:2242) */}
                  <div className="flex items-end justify-between border-b border-[#e2e3dd] pb-[12px]">
                    {/* Reserved Share */}
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-[12px] font-medium text-[#424843] tracking-[0.6px] uppercase">
                        RESERVED SHARE
                      </span>
                      <div className="flex items-baseline gap-[4px]">
                        <span className="text-[18px] font-bold text-[#1a1c19] leading-[24px]">
                          {order.reservedUnitsText}
                        </span>
                        <span className="text-[13px] text-[#424843]">
                          {order.reservedSharesText}
                        </span>
                      </div>
                    </div>

                    {/* Total Value */}
                    <div className="flex flex-col items-end gap-[2px]">
                      <span className="text-[12px] font-medium text-[#424843] tracking-[0.6px] uppercase">
                        TOTAL VALUE
                      </span>
                      <div className="flex items-baseline gap-[4px] text-[#163422]">
                        <span className="text-[20px] font-extrabold leading-[24px]">
                          {order.totalValueETB.toLocaleString()}
                        </span>
                        <span className="text-[12px] font-medium">ETB</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Breakdown (52:2255) */}
                  <div className="flex flex-col gap-[8px] w-full">
                    {/* Paid Deposit Row */}
                    <div className="flex items-center justify-between px-[2px]">
                      <div className="flex items-center gap-[8px]">
                        <CardTick size={16} color="#74a156" variant="Bold" />
                        <span className="text-[13px] text-[#424843]">
                          Paid Deposit
                        </span>
                      </div>
                      <span className="text-[15px] font-medium text-[#1a1c19]">
                        {order.paidDepositETB.toLocaleString()} ETB
                      </span>
                    </div>

                    {/* Highlighted Remaining Balance Box (52:2264) */}
                    <div className="bg-[rgba(255,218,214,0.3)] border border-[rgba(255,218,214,0.5)] rounded-[8px] p-[12px] flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <Danger size={16} color="#d32f2f" variant="Bold" />
                        <span className="text-[12px] font-bold text-[#1a1c19]">
                          Remaining Balance
                        </span>
                      </div>
                      <span className="text-[17px] font-bold text-[#e68a00]">
                        {order.remainingBalanceETB.toLocaleString()} ETB
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons (52:2289) */}
                  <div className="flex gap-[10px] items-center pt-[4px]">
                    <button
                      onClick={() =>
                        alert(
                          `Paying balance of ${order.remainingBalanceETB.toLocaleString()} ETB via Chapa`
                        )
                      }
                      className="flex-1 bg-[#74a156] hover:bg-[#669049] active:scale-[0.98] transition-all text-white rounded-[8px] py-[12px] text-[12px] font-bold text-center shadow-xs"
                    >
                      Pay Balance
                    </button>

                    <Link
                      href={`/kircha/krc-1`}
                      className="border border-[#74a156] hover:bg-[#74a156]/10 active:scale-95 transition-all rounded-[8px] w-[48px] h-[42px] flex items-center justify-center shrink-0"
                      aria-label="Order Details"
                    >
                      <InfoCircle size={20} color="#74a156" variant="Linear" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Shop Orders List */}
        {activeTab === 'shop' && (
          <div className="flex flex-col gap-[12px] w-full items-center">
            {shopOrders.map((shopOrd) => (
              <div
                key={shopOrd.id}
                className="bg-white border border-[rgba(194,200,192,0.3)] rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] w-[358px] p-[14px] flex flex-col gap-[8px]"
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
                  <span>Quantity: {shopOrd.quantityText}</span>
                  <span className="font-extrabold text-[15px] text-[#28a745]">
                    {shopOrd.totalETB.toLocaleString()} ETB
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
