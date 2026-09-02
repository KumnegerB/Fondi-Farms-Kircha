'use client';

import { useEffect, useState } from 'react';
import { TelegramUser, TelegramWebApp } from '@/types/telegram';

export function useTelegram() {
  const [webApp] = useState<TelegramWebApp | null>(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      return window.Telegram.WebApp;
    }
    return null;
  });

  const [user] = useState<TelegramUser | null>(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user) {
      return window.Telegram.WebApp.initDataUnsafe.user;
    }
    return null;
  });

  const isReady = typeof window !== 'undefined' && !!window.Telegram?.WebApp;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      try {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
      } catch {
        // ignore
      }
    }
  }, []);

  const triggerHaptic = (
    type: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'error' = 'light'
  ) => {
    if (!webApp?.HapticFeedback) return;
    if (type === 'selection') {
      webApp.HapticFeedback.selectionChanged();
    } else if (type === 'success' || type === 'error') {
      webApp.HapticFeedback.notificationOccurred(type);
    } else {
      webApp.HapticFeedback.impactOccurred(type);
    }
  };

  return {
    webApp,
    user,
    isReady,
    initData: webApp?.initData || '',
    triggerHaptic,
  };
}
