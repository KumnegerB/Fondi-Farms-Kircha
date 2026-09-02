"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home2, Graph, Bag2, ProfileCircle } from "iconsax-react";
import { useAppStore, useI18n } from "@/store/useAppStore";

export function BottomNav() {
  const pathname = usePathname();
  const { getOrdersCount } = useAppStore();
  const { t } = useI18n();
  const ordersCount = getOrdersCount();

  const navItems = [
    {
      id: "home",
      label: t.nav.home,
      href: "/",
      exact: true,
      icon: Home2,
      badge: 0,
    },
    {
      id: "kircha",
      label: t.nav.kircha,
      href: "/kircha",
      exact: false,
      icon: Graph,
      badge: 0,
    },
    {
      id: "orders",
      label: t.nav.orders,
      href: "/orders",
      exact: false,
      icon: Bag2,
      badge: ordersCount,
    },
    {
      id: "profile",
      label: t.nav.profile,
      href: "/profile",
      exact: false,
      icon: ProfileCircle,
      badge: 0,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-[430px] border-t border-[rgba(0,0,0,0.08)] bg-white">
      <div className="flex h-[70px] items-center justify-around px-[12px]">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[6px] py-1 transition-all"
            >
              <div className="relative flex size-[24px] items-center justify-center">
                <Icon
                  size={22}
                  variant={isActive ? "Bold" : "Linear"}
                  color={isActive ? "#74a156" : "#868685"}
                  className={cn(
                    "transition-transform",
                    isActive && "scale-105",
                  )}
                />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#74a156] text-white text-[10px] font-bold rounded-full size-[18px] flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={cn(
                  "whitespace-nowrap text-[12px] leading-[16px] transition-colors",
                  isActive
                    ? "font-bold text-[#74a156]"
                    : "font-medium text-[#868685]",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
