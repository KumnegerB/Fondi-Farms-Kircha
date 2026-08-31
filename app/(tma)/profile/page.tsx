'use client';

import React, { useState } from 'react';
import {
  User,
  Call,
  Setting2,
  Location,
  Headphone,
  DocumentText,
  ArrowRight2,
} from 'iconsax-react';
import { useTelegram } from '@/hooks/useTelegram';
import { APP_CONFIG } from '@/lib/constants';

export default function ProfilePage() {
  const { user } = useTelegram();
  const [phoneNumber, setPhoneNumber] = useState('+251 911 234 567');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState(phoneNumber);

  const displayName = user
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : 'Abebe Kebede';

  const menuLinks = [
    {
      id: 'settings',
      title: 'Account Settings',
      subtitle: 'Preferences, Payment Methods',
      icon: (
        <Setting2 size={20} color="#1a1c19" variant="Linear" />
      ),
      onClick: () => alert('Preferences & Payment Methods settings'),
    },
    {
      id: 'pickup',
      title: 'Pickup Info',
      subtitle: 'Designated Kircha spots',
      icon: (
        <Location size={20} color="#1a1c19" variant="Linear" />
      ),
      onClick: () =>
        alert(`Designated Kircha Pickup Spot: ${APP_CONFIG.defaultPickupLocation}`),
    },
    {
      id: 'support',
      title: 'Help & Support',
      subtitle: 'FAQs, Contact Admin',
      icon: (
        <Headphone size={20} color="#1a1c19" variant="Linear" />
      ),
      onClick: () =>
        alert(`Support: ${APP_CONFIG.supportPhone} | ${APP_CONFIG.supportTelegram}`),
    },
    {
      id: 'legal',
      title: 'Legal',
      subtitle: 'Terms of Service, Privacy',
      icon: (
        <DocumentText size={20} color="#1a1c19" variant="Linear" />
      ),
      onClick: () =>
        alert('Digital Kircha Terms: Non-refundable deposits, Ambo farm collection policy.'),
    },
  ];

  const handleUpdatePhone = () => {
    setPhoneNumber(phoneInput);
    setIsEditingPhone(false);
  };

  return (
    <div className="bg-[#f2f4f2] min-h-screen pb-[110px] flex flex-col items-center">
      {/* Top Header (43:332) */}
      <div className="bg-white w-full flex h-[68px] items-center justify-center px-[14px] py-[12px] border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-30">
        <h1 className="font-semibold text-[#111827] text-[22px] text-center tracking-[-0.33px]">
          መገለጫ
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[393px] flex flex-col gap-[16px] items-center py-[14px] px-[16px]">
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
                <h2 className="text-[22px] font-extrabold text-[#1a1c19] tracking-[-0.48px] truncate">
                  {displayName}
                </h2>
                <div className="flex items-center gap-[6px] text-[#424843]">
                  <Call size={16} color="#424843" variant="Linear" className="shrink-0" />
                  <span className="text-[15px] font-normal tracking-tight">
                    {phoneNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Phone Input Modal/Drawer State */}
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
                    className="flex-1 bg-[#74a156] text-white rounded-full py-2 text-xs font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingPhone(false)}
                    className="px-4 border border-stone-300 rounded-full py-2 text-xs text-stone-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Action Buttons (44:537) */
              <div className="flex gap-[12px] items-center justify-center pt-[10px] w-full">
                <button
                  onClick={() => alert(`Customer: ${displayName}`)}
                  className="bg-[#74a156] hover:bg-[#669049] active:scale-95 transition-all text-white rounded-full px-[24px] py-[8.5px] text-[15px] font-normal shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex-1 text-center"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => setIsEditingPhone(true)}
                  className="border border-[#74a156] hover:bg-[#74a156]/10 active:scale-95 transition-all text-[#74a156] rounded-full px-[22px] py-[8.5px] text-[15px] font-normal flex-1 text-center"
                >
                  Update Number
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Settings Links Layout (44:545) */}
        <div className="flex flex-col gap-[10px] w-full">
          {menuLinks.map((link) => (
            <button
              key={link.id}
              onClick={link.onClick}
              className="bg-white border border-[rgba(194,200,192,0.2)] rounded-[12px] shadow-[0px_2px_4px_rgba(0,0,0,0.04)] hover:border-[#74a156]/40 active:scale-[0.99] transition-all flex items-center justify-between px-[16px] py-[10px] w-full text-left"
            >
              <div className="flex items-center gap-[14px]">
                {/* Icon Circle (44:548) */}
                <div className="bg-[#edeee8] size-[40px] rounded-full flex items-center justify-center shrink-0">
                  {link.icon}
                </div>

                {/* Text (44:551) */}
                <div className="flex flex-col gap-[1px]">
                  <span className="text-[17px] font-bold text-[#1a1c19] leading-[22px]">
                    {link.title}
                  </span>
                  <span className="text-[13px] font-normal text-[#424843] leading-[18px]">
                    {link.subtitle}
                  </span>
                </div>
              </div>

              {/* Chevron Right (44:556) */}
              <div className="shrink-0 pl-2">
                <ArrowRight2 size={16} color="#868685" variant="Linear" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
