"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAppStore } from "@/store/useAppStore";

const emptySubscribe = () => () => {};

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, authToken } = useAppStore();

  // SSR-safe hydration detector using React's official standard hook
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Enforce authentication routing
  useEffect(() => {
    if (!isHydrated) return;

    const isAuthed = Boolean(isAuthenticated && authToken);

    if (!isAuthed && pathname !== "/login") {
      router.replace("/login");
    } else if (isAuthed && pathname === "/login") {
      router.replace("/");
    }
  }, [isHydrated, isAuthenticated, authToken, pathname, router]);

  // Splash Loading screen while verifying local session
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 select-none">
        <div className="relative size-[160px] animate-pulse flex items-center justify-center">
          <Image
            src="/images/fondi_logo.png"
            alt="Fondi Farms"
            width={160}
            height={160}
            priority
            className="object-contain"
          />
        </div>
        <div className="mt-8 flex items-center gap-2">
          <div className="size-2 rounded-full bg-[#74a156] animate-bounce [animation-delay:-0.3s]" />
          <div className="size-2 rounded-full bg-[#74a156] animate-bounce [animation-delay:-0.15s]" />
          <div className="size-2 rounded-full bg-[#74a156] animate-bounce" />
        </div>
      </div>
    );
  }

  // Prevent flash of protected screen before redirect
  const isAuthed = Boolean(isAuthenticated && authToken);
  if (!isAuthed && pathname !== "/login") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#74a156] border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
