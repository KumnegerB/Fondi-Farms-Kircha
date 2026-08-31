'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash, Add, Minus, ShoppingBag } from 'iconsax-react';
import { Header } from '@/components/tma/Header';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { formatETB } from '@/lib/utils';
import { APP_CONFIG } from '@/lib/constants';

export default function ShopCartPage() {
  const { items, updateQuantity, removeItem, totalAmountETB } =
    useCart();

  const handleCheckout = () => {
    alert(
      `Initiating 100% full payment of ${formatETB(totalAmountETB)} via Chapa for pickup at ${APP_CONFIG.defaultPickupLocation}`
    );
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Farm Shop Cart" showBack showLocation={false} />

      <div className="p-4 flex-1 flex flex-col justify-between">
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
              <ShoppingBag size={32} color="#868685" variant="Linear" />
            </div>
            <h3 className="font-bold text-stone-800 text-base">
              Your cart is empty
            </h3>
            <p className="text-xs text-stone-500 max-w-xs">
              Explore our dairy, eggs, and poultry products produced fresh at
              our Ambo farm.
            </p>
            <Link href="/shop" className="pt-2">
              <Button size="md" variant="primary">
                Browse Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items List */}
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-stone-200"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <Image
                      src={
                        product.images[0] ||
                        'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80'
                      }
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-stone-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-stone-800 mt-0.5">
                      {formatETB(product.priceETB)}
                    </p>
                    <span className="text-[11px] text-stone-500">
                      Per {product.unit}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        quantity === 1
                          ? removeItem(product.id)
                          : updateQuantity(product.id, quantity - 1)
                      }
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
                    >
                      {quantity === 1 ? (
                        <Trash size={16} color="#d32f2f" variant="Linear" />
                      ) : (
                        <Minus size={14} color="#1a1c19" />
                      )}
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
                    >
                      <Add size={14} color="#1a1c19" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pickup Info Note */}
            <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600 space-y-1">
              <span className="font-bold text-stone-900 block">
                Pickup Location:
              </span>
              <span>{APP_CONFIG.defaultPickupLocation}</span>
              <span className="block text-[11px] text-stone-500">
                (Shop orders require 100% full upfront payment)
              </span>
            </div>

            {/* Order Total & Checkout */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-stone-900">
                <span>Total Amount:</span>
                <span className="text-emerald-700 text-base">
                  {formatETB(totalAmountETB)}
                </span>
              </div>
              <Button
                fullWidth
                size="lg"
                variant="primary"
                onClick={handleCheckout}
              >
                Pay Full Amount with Chapa ({formatETB(totalAmountETB)})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
