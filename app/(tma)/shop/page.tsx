'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bag2 } from 'iconsax-react';
import { Header } from '@/components/tma/Header';
import { ProductCard } from '@/components/tma/ProductCard';
import { MOCK_SHOP_PRODUCTS } from '@/lib/mock-data';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { totalItemCount } = useCart();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'eggs', label: 'Eggs' },
    { id: 'poultry', label: 'Poultry' },
  ];

  const products = MOCK_SHOP_PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Farm Shop"
        showLocation={false}
        rightAction={
          <Link href="/shop/cart" className="relative p-2 text-stone-700">
            <Bag2 size={22} color="#111827" variant="Linear" />
            {totalItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </Link>
        }
      />

      <div className="p-4 space-y-4">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all',
                activeCategory === c.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
