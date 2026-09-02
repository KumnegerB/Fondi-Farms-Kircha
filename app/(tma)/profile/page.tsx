'use client';

import React, { useState } from 'react';
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
