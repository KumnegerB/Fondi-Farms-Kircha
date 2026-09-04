'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Call, TickCircle, ArrowLeft2 } from 'iconsax-react';
import { useTelegram } from '@/hooks/useTelegram';
import { useAppStore, useI18n } from '@/store/useAppStore';
import { telegramSignIn, telegramSignUp } from '@/lib/api/auth';

export default function LoginPage() {
  const router = useRouter();
  const { triggerHaptic } = useTelegram();
  const { t } = useI18n();
  const { setAuth, setTelegramInitData, userPhone, setUserPhone } = useAppStore();

  // Multi-step state: 'splash' -> 'phone_prompt'
  const [step, setStep] = useState<'splash' | 'phone_prompt'>('splash');
  const [capturedInitData, setCapturedInitData] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>(userPhone || '+251 91 234 5678');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 1: User clicks "Login with Telegram" / "Continue with Telegram"
  const handleContinueWithTelegram = async () => {
    triggerHaptic('light');
    setErrorMessage(null);
    setIsLoading(true);

    // Retrieve initData from Telegram WebApp
    const rawInitData =
      (typeof window !== 'undefined' && window.Telegram?.WebApp?.initData) ||
      'query_id=mock_query_id&user=%7B%22id%22%3A123456%7D&auth_date=1725350000&hash=mock_hash';

    setCapturedInitData(rawInitData);
    setTelegramInitData(rawInitData);

    try {
      // First attempt to sign in existing user via POST /api/auth/signin/telegram
      const signInResult = await telegramSignIn(rawInitData);

      if (signInResult && signInResult.session?.token) {
        triggerHaptic('success');
        setAuth(signInResult.session.token, {
          name: signInResult.user.fullName || 'Fondi Customer',
          phone: signInResult.user.phone,
        });
        setUserPhone(signInResult.user.phone);
        router.push('/');
        return;
      }
    } catch {
      // User not registered or server returned 404/401 -> proceed to Step 2
    } finally {
      setIsLoading(false);
    }

    // Move to Step 2 to collect phone number and sign up
    setStep('phone_prompt');
  };

  // Step 2: Request contact via Telegram WebApp native API
  const handleRequestTelegramContact = () => {
    triggerHaptic('medium');
    setErrorMessage(null);

    if (
      typeof window !== 'undefined' &&
      window.Telegram?.WebApp?.requestContact
    ) {
      try {
        window.Telegram.WebApp.requestContact((granted, res) => {
          if (granted && res?.responseUnsafe?.contact?.phone_number) {
            const sharedPhone = res.responseUnsafe.contact.phone_number;
            const formatted = sharedPhone.startsWith('+') ? sharedPhone : `+${sharedPhone}`;
            setPhoneInput(formatted);
            submitSignUpWithData(capturedInitData, formatted);
          } else {
            // User denied or manual fallback needed
            setErrorMessage(t.auth.sharePhoneDesc);
          }
        });
        return;
      } catch (err) {
        console.warn('Native requestContact failed:', err);
      }
    }

    // Fallback: If outside native Telegram or requestContact not supported, use current phone input
    submitSignUpWithData(capturedInitData, phoneInput);
  };

  // Submit sign up (POST /api/auth/signup/telegram) with both initData and phone
  const submitSignUpWithData = async (initDataToSend: string, phoneToSend: string) => {
    if (!phoneToSend || phoneToSend.trim().length < 9) {
      setErrorMessage(t.auth.sharePhoneDesc);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await telegramSignUp({
        initData: initDataToSend,
        phone: phoneToSend.trim(),
      });

      triggerHaptic('success');
      setAuth(response.session.token, {
        name: response.user.fullName || 'Fondi Customer',
        phone: response.user.phone,
      });
      setUserPhone(response.user.phone);

      // Navigate to Home
      router.push('/');
    } catch (err) {
      console.error('Sign up submission error:', err);
      setErrorMessage(t.auth.loginError);
      triggerHaptic('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full max-w-[430px] mx-auto flex flex-col justify-between items-center px-6 py-10 relative overflow-hidden select-none">
      {/* Step 1: Splash / Telegram Login Frame matching Figma (140:358) */}
      {step === 'splash' && (
        <div className="flex-1 w-full flex flex-col justify-center items-center gap-10">
          {/* Logo Center (140:359) */}
          <div className="relative size-[235px] flex items-center justify-center">
            <Image
              src="/images/fondi_logo.png"
              alt="Fondi Farms"
              width={235}
              height={235}
              priority
              className="object-contain"
            />
          </div>

          {/* Telegram Login Button (141:787) */}
          <div className="flex flex-col items-center gap-3 w-full">
            <button
              onClick={handleContinueWithTelegram}
              disabled={isLoading}
              className="bg-[#24A1DE] hover:bg-[#1E88C7] active:scale-95 transition-all text-white font-semibold text-[17px] tracking-[0.1px] h-[52px] w-[240px] max-w-full rounded-[40px] flex items-center justify-center gap-[10px] shadow-[0px_4px_12px_rgba(36,161,222,0.3)] cursor-pointer disabled:opacity-60"
            >
              {/* Telegram Airplane SVG Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.23 15.51 16.01C15.37 16.76 15.09 17.01 14.83 17.04C14.25 17.09 13.81 16.66 13.25 16.29C12.37 15.71 11.87 15.35 11.02 14.79C10.03 14.14 10.68 13.78 11.23 13.2C11.38 13.05 13.88 10.77 13.93 10.56C13.94 10.53 13.94 10.43 13.88 10.37C13.82 10.31 13.73 10.34 13.66 10.35C13.56 10.37 12.02 11.39 9.05 13.4C8.61 13.7 8.22 13.85 7.86 13.84C7.47 13.83 6.72 13.62 6.16 13.44C5.47 13.22 4.93 13.1 4.98 12.72C5.01 12.52 5.28 12.32 5.81 12.11C9.07 10.69 11.25 9.77 12.34 9.32C15.46 8.02 16.11 7.8 16.53 7.8C16.62 7.8 16.83 7.82 16.96 7.93C17.07 8.02 17.1 8.15 17.11 8.25C17.11 8.33 17.13 8.56 16.64 8.8Z"
                  fill="white"
                />
              </svg>

              <span>{isLoading ? t.auth.loggingIn : t.auth.loginWithTelegram}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Request Phone Number Screen */}
      {step === 'phone_prompt' && (
        <div className="flex-1 w-full flex flex-col justify-between py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Back button */}
          <button
            onClick={() => setStep('splash')}
            className="self-start size-10 rounded-full bg-[#f2f4f2] hover:bg-stone-200 flex items-center justify-center text-stone-800 transition-all cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft2 size={20} color="#111827" />
          </button>

          {/* Prompt Body */}
          <div className="flex flex-col items-center text-center gap-6 my-auto">
            <div className="size-20 bg-emerald-50 border-2 border-emerald-100 rounded-full flex items-center justify-center text-[#74a156] shadow-xs">
              <Call size={38} color="#74a156" variant="Bold" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[22px] font-extrabold text-[#111827] tracking-tight">
                {t.auth.sharePhoneNumber}
              </h2>
              <p className="text-xs text-stone-500 max-w-[280px] leading-relaxed">
                {t.auth.sharePhoneDesc}
              </p>
            </div>

            {/* Error notice */}
            {errorMessage && (
              <div className="bg-rose-50 text-rose-700 text-xs px-3 py-2 rounded-lg border border-rose-200">
                {errorMessage}
              </div>
            )}

            {/* Quick Share My Phone Button (Telegram contact request) */}
            <div className="w-full flex flex-col gap-4 pt-2">
              <button
                type="button"
                onClick={handleRequestTelegramContact}
                disabled={isLoading}
                className="w-full bg-[#24A1DE] hover:bg-[#1E88C7] active:scale-[0.98] transition-all text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Call size={18} color="#ffffff" variant="Bold" />
                <span>{isLoading ? t.auth.loggingIn : t.auth.sharePhoneNumber}</span>
              </button>

              {/* Manual Phone Input Option */}
              <div className="w-full flex flex-col gap-1.5 text-left pt-2 border-t border-stone-100">
                <label className="text-[11px] font-semibold text-stone-500">
                  {t.auth.manualPhoneTitle}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder={t.auth.phoneInputPlaceholder}
                    className="flex-1 bg-[#f8fafc] border border-stone-300 focus:border-[#74a156] rounded-xl px-3.5 py-3 text-sm font-semibold text-stone-900 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => submitSignUpWithData(capturedInitData, phoneInput)}
                    disabled={isLoading || !phoneInput.trim()}
                    className="bg-[#74a156] hover:bg-[#669049] active:scale-95 text-white font-bold px-4 py-3 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                  >
                    <TickCircle size={18} color="#ffffff" variant="Bold" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-[10px] text-stone-400 text-center">
            {t.profile.appVersion}
          </p>
        </div>
      )}
    </div>
  );
}
