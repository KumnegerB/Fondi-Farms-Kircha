import React from "react";
import Script from "next/script";
import { CartProvider } from "@/components/providers/CartProvider";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { BottomNav } from "@/components/tma/BottomNav";

export default function TMALayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AuthGuard>
        <div className="min-h-screen bg-stone-100 flex justify-center">
          {/* Telegram WebApp script */}
          <Script
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="beforeInteractive"
          />

          {/* Mobile Viewport Container */}
          <div className="w-full max-w-md min-h-screen bg-stone-50 text-stone-900 flex flex-col shadow-xl pb-20 relative">
            <main className="flex-1 flex flex-col">{children}</main>
            <BottomNav />
          </div>
        </div>
      </AuthGuard>
    </CartProvider>
  );
}
