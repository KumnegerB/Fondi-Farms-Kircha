'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Call,
  Location,
  Headphone,
  DocumentText,
  ArrowRight2,
  Translate,
  TickCircle,
} from 'iconsax-react';
import { useTelegram } from '@/hooks/useTelegram';
import { useI18n, useAppStore } from '@/store/useAppStore';
import { APP_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useTelegram();
  const { t, language, setLanguage } = useI18n();
  const { userPhone, setUserPhone } = useAppStore();

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState(userPhone || '+251 911 234 567');

  const displayName = user
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : 'Mathias A.';

  const handleUpdatePhone = () => {
    setUserPhone(phoneInput);
    setIsEditingPhone(false);
  };

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[140px] flex flex-col items-center">
      {/* Top Header (43:332) */}
      <div className="bg-white w-full flex h-[68px] items-center justify-center px-[14px] py-[12px] border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-30">
        <h1 className="font-semibold text-[#111827] text-[20px] text-center tracking-[-0.33px]">
          {t.profile.title}
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[430px] flex flex-col gap-[16px] items-center py-[14px] px-[16px]">
        {/* User Identity Header Card (44:524) */}
        <div className="bg-white border border-[rgba(194,200,192,0.2)] rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] w-full p-[20px] relative overflow-hidden flex flex-col items-center">
          {/* Subtle decorative gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(152.67deg, rgba(200, 235, 208, 0.3) 0%, rgba(200, 235, 208, 0) 100%)',
            }}
          />

          <div className="relative z-10 w-full flex flex-col items-center gap-[12px]">
            {/* Avatar & User Details */}
            <div className="flex items-center gap-[14px] w-full">
              {/* Avatar Circle (44:527) */}
              <div className="bg-[#74a156] border-4 border-[#f9faf4] shadow-xs size-[74px] rounded-full flex items-center justify-center shrink-0">
                <User size={34} color="#ffffff" variant="Bold" />
              </div>

              {/* Info (44:543) */}
              <div className="flex flex-col gap-[4px] min-w-0 flex-1">
                <h2 className="text-[20px] font-extrabold text-[#1a1c19] tracking-[-0.48px] truncate">
                  {displayName}
                </h2>
                <div className="flex items-center gap-[6px] text-[#424843]">
                  <Call size={15} color="#424843" variant="Linear" className="shrink-0" />
                  <span className="text-[14px] font-medium tracking-tight">
                    {userPhone || '+251 911 234 567'}
                  </span>
                </div>
                <span className="text-[11px] text-[#74a156] font-semibold">
                  {t.profile.telegramUser}
                </span>
              </div>
            </div>

            {/* Edit Phone Input */}
            {isEditingPhone ? (
              <div className="w-full flex flex-col gap-2 pt-2 border-t border-stone-200/70">
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-stone-300 rounded-[10px] px-3 py-2 text-sm font-semibold focus:outline-[#74a156]"
                  placeholder="+251 9..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdatePhone}
                    className="flex-1 bg-[#74a156] text-white text-xs font-bold py-2 rounded-lg cursor-pointer"
                  >
                    {t.common.save}
                  </button>
                  <button
                    onClick={() => setIsEditingPhone(false)}
                    className="px-3 bg-stone-200 text-stone-700 text-xs font-semibold py-2 rounded-lg cursor-pointer"
                  >
                    {t.common.cancel}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setPhoneInput(userPhone);
                  setIsEditingPhone(true);
                }}
                className="w-full bg-[#f2f4f2] hover:bg-[#e4e6e4] text-[#1a1c19] text-[12px] font-bold py-2 rounded-[8px] transition-all cursor-pointer"
              >
                {t.profile.editPhone}
              </button>
            )}
          </div>
        </div>

        {/* Language Selection Card */}
        <div className="bg-white border border-[rgba(194,200,192,0.25)] rounded-[12px] p-[16px] shadow-2xs w-full flex flex-col gap-[10px]">
          <div className="flex items-center gap-[8px]">
            <Translate size={20} color="#74a156" variant="Bold" />
            <h3 className="text-[14px] font-bold text-[#1a1c19]">
              {t.profile.language}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                'flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer',
                language === 'en'
                  ? 'border-[#74a156] bg-emerald-50 text-[#74a156] font-bold shadow-2xs'
                  : 'border-stone-200 hover:bg-stone-50 text-stone-700 font-medium'
              )}
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold">English (US)</span>
                <span className="text-[10px] text-stone-500">Default</span>
              </div>
              {language === 'en' && (
                <TickCircle size={16} color="#74a156" variant="Bold" />
              )}
            </button>

            <button
              onClick={() => setLanguage('am')}
              className={cn(
                'flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer',
                language === 'am'
                  ? 'border-[#74a156] bg-emerald-50 text-[#74a156] font-bold shadow-2xs'
                  : 'border-stone-200 hover:bg-stone-50 text-stone-700 font-medium'
              )}
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold">አማርኛ</span>
                <span className="text-[10px] text-stone-500">Amharic</span>
              </div>
              {language === 'am' && (
                <TickCircle size={16} color="#74a156" variant="Bold" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Options List */}
        <div className="bg-white border border-[rgba(194,200,192,0.25)] rounded-[12px] overflow-hidden shadow-2xs w-full flex flex-col divide-y divide-stone-100">
          {/* Pickup Info */}
          <div className="flex items-center justify-between p-[14px] hover:bg-stone-50 transition-colors">
            <div className="flex items-center gap-[12px]">
              <div className="size-[36px] rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                <Location size={18} color="#1a1c19" variant="Linear" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1a1c19]">
                  {t.profile.pickupInfoTitle}
                </span>
                <span className="text-[11px] text-[#868685]">
                  {APP_CONFIG.defaultPickupLocation}
                </span>
              </div>
            </div>
          </div>

          {/* Support */}
          <a
            href={`https://t.me/${APP_CONFIG.supportTelegram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-[14px] hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-[12px]">
              <div className="size-[36px] rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                <Headphone size={18} color="#1a1c19" variant="Linear" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1a1c19]">
                  {t.profile.support}
                </span>
                <span className="text-[11px] text-[#868685]">
                  {APP_CONFIG.supportTelegram}
                </span>
              </div>
            </div>
            <ArrowRight2 size={16} color="#868685" />
          </a>

          {/* Telegram Account / Login Link */}
          <Link
            href="/login"
            className="flex items-center justify-between p-[14px] hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-[12px]">
              <div className="size-[36px] rounded-full bg-[#24A1DE]/15 flex items-center justify-center shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.23 15.51 16.01C15.37 16.76 15.09 17.01 14.83 17.04C14.25 17.09 13.81 16.66 13.25 16.29C12.37 15.71 11.87 15.35 11.02 14.79C10.03 14.14 10.68 13.78 11.23 13.2C11.38 13.05 13.88 10.77 13.93 10.56C13.94 10.53 13.94 10.43 13.88 10.37C13.82 10.31 13.73 10.34 13.66 10.35C13.56 10.37 12.02 11.39 9.05 13.4C8.61 13.7 8.22 13.85 7.86 13.84C7.47 13.83 6.72 13.62 6.16 13.44C5.47 13.22 4.93 13.1 4.98 12.72C5.01 12.52 5.28 12.32 5.81 12.11C9.07 10.69 11.25 9.77 12.34 9.32C15.46 8.02 16.11 7.8 16.53 7.8C16.62 7.8 16.83 7.82 16.96 7.93C17.07 8.02 17.1 8.15 17.11 8.25C17.11 8.33 17.13 8.56 16.64 8.8Z"
                    fill="#24A1DE"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1a1c19]">
                  {t.auth.loginWithTelegram}
                </span>
                <span className="text-[11px] text-[#868685]">
                  {t.auth.changeAccount}
                </span>
              </div>
            </div>
            <ArrowRight2 size={16} color="#868685" />
          </Link>

          {/* Terms */}
          <div className="flex items-center justify-between p-[14px] hover:bg-stone-50 transition-colors">
            <div className="flex items-center gap-[12px]">
              <div className="size-[36px] rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                <DocumentText size={18} color="#1a1c19" variant="Linear" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1a1c19]">
                  {t.profile.terms}
                </span>
                <span className="text-[11px] text-[#868685]">
                  Ambo Farm Kircha Rules & Policies
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Version */}
        <p className="text-[11px] text-[#868685] text-center pt-2">
          {t.profile.appVersion}
        </p>
      </div>
    </div>
  );
}
