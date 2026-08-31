"use client";

import { useEffect, useState } from "react";
import { TelegramUser, TelegramWebApp } from "@/types/telegram";

export function useTelegram() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      setWebApp(tg);
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
      setIsReady(true);
    }
  }, []);

  const triggerHaptic = (
    type:
      | "light"
      | "medium"
      | "heavy"
      | "selection"
      | "success"
      | "error" = "light",
  ) => {
    if (!webApp?.HapticFeedback) return;
    if (type === "selection") {
      webApp.HapticFeedback.selectionChanged();
    } else if (type === "success" || type === "error") {
      webApp.HapticFeedback.notificationOccurred(type);
    } else {
      webApp.HapticFeedback.impactOccurred(type);
    }
  };

  return {
    webApp,
    user,
    isReady,
    initData: webApp?.initData || "",
    triggerHaptic,
  };
}
