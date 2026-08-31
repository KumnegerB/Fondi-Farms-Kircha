'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { cn } from '@/lib/utils';

interface CattleImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  autoSlideInterval?: number; // default 5000ms (5 seconds)
  onImageClick?: (index: number) => void;
  showControls?: boolean;
  aspectRatioClass?: string;
}

export function CattleImageSlider({
  images,
  alt,
  className = '',
  autoSlideInterval = 5000,
  onImageClick,
  showControls = false,
  aspectRatioClass = 'h-[150px]',
}: CattleImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (!images || images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images, autoSlideInterval]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(index);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (onImageClick) {
      onImageClick(currentIndex);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className={cn('relative w-full bg-stone-200', aspectRatioClass, className)} />
    );
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-stone-900 select-none group cursor-pointer',
        aspectRatioClass,
        className
      )}
      onClick={handleContainerClick}
    >
      {/* Images Slider Container */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imgSrc, idx) => (
          <div key={idx} className="relative h-full w-full shrink-0">
            <Image
              src={imgSrc}
              alt={`${alt} - Photo ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Optional / on Hover) */}
      {showControls && images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 z-10 cursor-pointer shadow-md"
            aria-label="Previous image"
          >
            <ArrowLeft2 size={16} color="#ffffff" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 z-10 cursor-pointer shadow-md"
            aria-label="Next image"
          >
            <ArrowRight2 size={16} color="#ffffff" />
          </button>
        </>
      )}

      {/* Pagination Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5 z-10 pointer-events-auto">
          {images.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={(e) => handleDotClick(e, dotIdx)}
              className={cn(
                'rounded-full transition-all duration-300 cursor-pointer',
                dotIdx === currentIndex
                  ? 'bg-white w-4 h-1.5 shadow-xs'
                  : 'bg-white/50 w-1.5 h-1.5 hover:bg-white/80'
              )}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
