'use client';

import React from 'react';
import Image from 'next/image';
import { Add } from 'iconsax-react';
import { ShopProduct } from '@/types/shop';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatETB } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: ShopProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const image =
    product.images[0] ||
    'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80';

  return (
    <Card className="flex flex-col h-full hover:border-stone-300 transition-all">
      <div className="relative aspect-4/3 w-full bg-stone-100">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 448px) 50vw, 220px"
        />
        {product.availableStock <= 5 && (
          <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            Only {product.availableStock} left
          </span>
        )}
      </div>

      <CardContent className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <h4 className="font-semibold text-xs text-stone-900 line-clamp-1">
            {product.name}
          </h4>
          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
            Per {product.unit.replace('_', ' ')}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-xs text-stone-900">
            {formatETB(product.priceETB)}
          </span>
          <Button
            size="sm"
            variant="primary"
            onClick={() => addItem(product, 1)}
            className="h-7 w-7 p-0 rounded-lg"
          >
            <Add size={16} color="#ffffff" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
