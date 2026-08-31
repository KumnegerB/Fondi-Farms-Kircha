'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft2, Location } from 'iconsax-react';
import { APP_CONFIG } from '@/lib/constants';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showLocation?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({
  title,
  showBack = false,
  showLocation = true,
  rightAction,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/60 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="p-1 -ml-1 text-stone-700 hover:text-stone-900 rounded-lg active:bg-stone-100"
          >
            <ArrowLeft2 size={22} color="#111827" variant="Linear" />
          </button>
        ) : null}

        <div>
          {title ? (
            <h1 className="text-lg font-bold text-stone-900 leading-tight">
              {title}
            </h1>
          ) : (
            <div>
              <h1 className="text-base font-bold text-stone-900 leading-tight">
                {APP_CONFIG.name}
              </h1>
              {showLocation && (
                <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                  <Location size={14} color="#74a156" variant="Bold" />
                  <span>Ambo, Ethiopia</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}
