"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home2, Graph, Bag2, ProfileCircle } from "iconsax-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      id: "home",
      label: "መነሻ",
      href: "/",
      exact: true,
      icon: Home2,
    },
    {
      id: "kircha",
      label: "ቅርጫ",
      href: "/kircha",
      exact: false,
      icon: Graph,
    },
    {
      id: "orders",
      label: "ትዛዝ",
      href: "/orders",
      exact: false,
      icon: Bag2,
    },
    {
      id: "profile",
      label: "መገለጫ",
      href: "/profile",
      exact: false,
      icon: ProfileCircle,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[393px] border-t border-[rgba(0,0,0,0.08)] bg-white">
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
              className="flex min-w-0 flex-1 flex-col items-center justify-center gap-[6px] py-1 transition-all"
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

      {/* iPhone Home Indicator bar */}
      <div className="flex justify-center pb-2">
        <div className="h-[5px] w-[135px] rounded-[100px] bg-[#687588]" />
      </div>
    </nav>
  );
}
