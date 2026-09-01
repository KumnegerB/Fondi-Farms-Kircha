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

  // Touch / Mouse Swipe references
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Auto slide timer
  useEffect(() => {
    if (!images || images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images, autoSlideInterval]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (images && images.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoSlideInterval);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetTimer();
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetTimer();
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(index);
    resetTimer();
  };

  // Touch Swipe Handlers for Telegram Mini Apps
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
    isDraggingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
    if (touchStartXRef.current !== null) {
      const diff = Math.abs(touchEndXRef.current - touchStartXRef.current);
      if (diff > 10) {
        isDraggingRef.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diffX = touchStartXRef.current - touchEndXRef.current;
      const swipeThreshold = 40; // minimum 40px to trigger swipe

      if (diffX > swipeThreshold) {
        // Swiped Left -> Next image
        handleNext();
      } else if (diffX < -swipeThreshold) {
        // Swiped Right -> Prev image
        handlePrev();
      } else if (!isDraggingRef.current && onImageClick) {
        // Tap without drag -> Open Lightbox
        onImageClick(currentIndex);
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
    isDraggingRef.current = false;
  };

  // Mouse Drag Handlers for Desktop Testing
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartXRef.current = e.clientX;
    touchEndXRef.current = e.clientX;
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartXRef.current !== null) {
      touchEndXRef.current = e.clientX;
      const diff = Math.abs(e.clientX - touchStartXRef.current);
      if (diff > 10) {
        isDraggingRef.current = true;
      }
    }
  };

  const handleMouseUp = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diffX = touchStartXRef.current - touchEndXRef.current;
      const swipeThreshold = 40;

      if (diffX > swipeThreshold) {
        handleNext();
      } else if (diffX < -swipeThreshold) {
        handlePrev();
      } else if (!isDraggingRef.current && onImageClick) {
        onImageClick(currentIndex);
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
    isDraggingRef.current = false;
  };

  if (!images || images.length === 0) {
    return (
      <div className={cn('relative w-full bg-stone-200', aspectRatioClass, className)} />
    );
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-stone-900 select-none group cursor-pointer touch-pan-y',
        aspectRatioClass,
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Images Slider Container */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out pointer-events-none"
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
              draggable={false}
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
