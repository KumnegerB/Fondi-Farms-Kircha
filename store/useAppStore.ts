import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ShopProduct, CartItem } from "@/types/shop";
import { Language, translations } from "@/lib/i18n";

export interface KirchaReservation {
  id: string;
  cattleId: string;
  cattleName: string;
  tagNumber: string;
  cattleImage: string;
  quarterUnits: number;
  totalPriceETB: number;
  depositPaidETB: number;
  remainingBalanceETB: number;
  status: "balance_due" | "paid" | "ready_for_pickup" | "collected";
  slaughterDate: string;
  reservedAt: string;
}

interface AppState {
  // Language Localization State
  language: Language;
  setLanguage: (lang: Language) => void;

  // Cart State
  cartItems: CartItem[];
  addToCart: (product: ShopProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;

  // Kircha Reservations State
  reservations: KirchaReservation[];
  addReservation: (reservation: KirchaReservation) => void;
  getOrdersCount: () => number;

  // User & Auth State
  isAuthenticated: boolean;
  authToken: string | null;
  telegramInitData: string | null;
  userName: string;
  userPhone: string;
  setUserName: (name: string) => void;
  setUserPhone: (phone: string) => void;
  setTelegramInitData: (initData: string) => void;
  setAuth: (token: string, user: { name?: string; phone: string }) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: "am", // Default to Amharic as requested
      setLanguage: (lang: Language) => set({ language: lang }),

      cartItems: [
        {
          product: {
            id: "shp-1",
            name: "1L Milk & Yogurt",
            category: "dairy",
            priceETB: 250,
            unit: "liter",
            images: ["/images/fresh_milk_yogurt.png"],
            description: "Fresh pasteurized farm milk & natural yogurt",
            availableStock: 25,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          quantity: 1,
        },
        {
          product: {
            id: "shp-2",
            name: "Eggs",
            category: "eggs",
            priceETB: 24,
            unit: "piece",
            images: ["/images/fresh_milk_yogurt.png"],
            description: "Fresh organic free-range farm eggs",
            availableStock: 120,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          quantity: 1,
        },
      ],

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.cartItems.find(
            (i) => i.product.id === product.id,
          );
          if (existing) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { product, quantity }],
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.product.id !== productId),
        }));
      },

      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ cartItems: [] }),

      getCartCount: () => {
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },

      getCartTotal: () => {
        return get().cartItems.reduce(
          (sum, item) => sum + item.product.priceETB * item.quantity,
          0,
        );
      },

      reservations: [
        {
          id: "res-sample-1",
          cattleId: "krc-1",
          cattleName: "Arsi Bull (K-025)",
          tagNumber: "FR10018159",
          cattleImage: "/images/arsi_bull.png",
          quarterUnits: 1,
          totalPriceETB: 16500,
          depositPaidETB: 4950,
          remainingBalanceETB: 11550,
          status: "balance_due",
          slaughterDate: "Sep 7, 2026 (ጳጉሜ 2, 2018)",
          reservedAt: new Date().toISOString(),
        },
      ],

      addReservation: (reservation) => {
        set((state) => ({
          reservations: [reservation, ...state.reservations],
        }));
      },

      getOrdersCount: () => {
        return get().reservations.length + 1; // sample shop order + kircha
      },

      // User & Auth State
      isAuthenticated: false,
      authToken: null,
      telegramInitData: null,
      userName: "Mathias A.",
      userPhone: "+251 91 234 5678",
      setUserName: (name) => set({ userName: name }),
      setUserPhone: (phone) => set({ userPhone: phone }),
      setTelegramInitData: (initData) => set({ telegramInitData: initData }),
      setAuth: (token, user) =>
        set({
          isAuthenticated: true,
          authToken: token,
          userName: user.name || get().userName,
          userPhone: user.phone || get().userPhone,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          authToken: null,
          telegramInitData: null,
        }),
    }),
    {
      name: "fondi-farms-storage",
    },
  ),
);

/**
 * Custom hook to access active language strings easily
 */
export function useI18n() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const t = translations[language] || translations.en;

  return {
    language,
    setLanguage,
    t,
  };
}
