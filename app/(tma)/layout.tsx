import React from 'react';
import { CartProvider } from '@/components/providers/CartProvider';
import { TelegramInit } from '@/components/providers/TelegramInit';
import { BottomNav } from '@/components/tma/BottomNav';

export default function TMALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <TelegramInit />
      <div className="min-h-screen bg-stone-100 flex justify-center">
        {/* Mobile Viewport Container matching Telegram Mini App */}
        <div className="w-full max-w-[393px] min-h-screen bg-[#f2f4f2] text-stone-900 flex flex-col shadow-xl relative overflow-x-hidden">
          <main className="flex-1 flex flex-col">{children}</main>
          <BottomNav />
        </div>
      </div>
    </CartProvider>
  );
}
