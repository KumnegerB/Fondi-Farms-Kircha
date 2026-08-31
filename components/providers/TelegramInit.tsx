'use client';

import { useEffect } from 'react';

export function TelegramInit() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      try {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        if (tg.setHeaderColor) tg.setHeaderColor('#ffffff');
        if (tg.setBackgroundColor) tg.setBackgroundColor('#f2f4f2');
      } catch (err) {
        console.warn('Telegram WebApp initialization notice:', err);
      }
    }
  }, []);

  return null;
}