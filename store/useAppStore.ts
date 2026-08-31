import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShopProduct, CartItem } from '@/types/shop';

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
  status: 'balance_due' | 'paid' | 'ready_for_pickup' | 'collected';
  slaughterDate: string;
  reservedAt: string;
}

interface AppState {
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

  // User State
  userName: string;
  userPhone: string;
  setUserName: (name: string) => void;
  setUserPhone: (phone: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      cartItems: [
        {
          product: {
            id: 'shp-1',
            name: '1L Milk & Yogurt',
            category: 'dairy',
            priceETB: 250,
            unit: 'liter',
            images: ['/images/fresh_milk_yogurt.png'],
            description: 'Fresh pasteurized farm milk & natural yogurt',
            availableStock: 25,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          quantity: 1,
        },
        {
          product: {
            id: 'shp-2',
            name: 'Eggs',
            category: 'eggs',
            priceETB: 24,
            unit: 'piece',
            images: ['/images/fresh_milk_yogurt.png'],
            description: 'Fresh organic free-range farm eggs',
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
            (i) => i.product.id === product.id
          );
          if (existing) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
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
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getCartCount: () => {
        return get().cartItems.reduce((acc, item) => acc + item.quantity, 0);
      },

      getCartTotal: () => {
        return get().cartItems.reduce(
          (acc, item) => acc + item.product.priceETB * item.quantity,
          0
        );
      },

      // Reservations
      reservations: [
        {
          id: 'krc-ord-1',
          cattleId: 'krc-1',
          cattleName: 'Arsi Bull K-025',
          tagNumber: 'OX K-024',
          cattleImage: '/images/arsi_bull.png',
          quarterUnits: 5,
          totalPriceETB: 22500,
          depositPaidETB: 4500,
          remainingBalanceETB: 18000,
          status: 'balance_due',
          slaughterDate: 'Saturday, Sept 5',
          reservedAt: new Date().toISOString(),
        },
        {
          id: 'krc-ord-2',
          cattleId: 'krc-2',
          cattleName: 'Borana Prime Ox K-024',
          tagNumber: 'OX K-020',
          cattleImage: '/images/figma_banner.png',
          quarterUnits: 2,
          totalPriceETB: 10000,
          depositPaidETB: 2000,
          remainingBalanceETB: 8000,
          status: 'balance_due',
          slaughterDate: 'Sunday, Sept 6',
          reservedAt: new Date().toISOString(),
        },
      ],

      addReservation: (reservation) => {
        set((state) => ({
          reservations: [reservation, ...state.reservations],
        }));
      },

      getOrdersCount: () => {
        return get().reservations.length;
      },

      // User
      userName: 'Mathias A.',
      userPhone: '+251 911 234 567',
      setUserName: (userName) => set({ userName }),
      setUserPhone: (userPhone) => set({ userPhone }),
    }),
    {
      name: 'fondi-farms-storage',
    }
  )
);
