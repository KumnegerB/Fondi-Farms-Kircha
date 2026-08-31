'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft2, ArrowRight2, CloseCircle } from 'iconsax-react';

interface PhotoLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function PhotoLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title,
}: PhotoLightboxProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const validIndex = Math.max(0, Math.min(initialIndex, (images?.length || 1) - 1));
      setActiveIdx(validIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex, images]);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      if (!images || images.length === 0) return;
      setActiveIdx((prev) => (prev + 1) % images.length);
    },
    [images]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      if (!images || images.length === 0) return;
      setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
    },
    [images]
  );

  const handleThumbnailClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveIdx(idx);
  };

  // Keyboard navigation for testing/accessibility
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[activeIdx] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="flex items-center justify-between text-white w-full max-w-[480px] mx-auto z-20 pt-2 px-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          {title && <span className="font-bold text-sm text-white truncate max-w-[260px]">{title}</span>}
          <span className="text-xs text-stone-400">
            {activeIdx + 1} of {images.length} photos
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="bg-white/15 hover:bg-white/25 active:scale-90 text-white rounded-full p-2 transition-all cursor-pointer"
          aria-label="Close photo viewer"
        >
          <CloseCircle size={22} color="#ffffff" variant="Linear" />
        </button>
      </div>

      {/* Main Image Display */}
      <div
        className="relative flex-1 w-full max-w-[480px] mx-auto flex items-center justify-center py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-h-[68vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
          <Image
            src={currentImage}
            alt={title || 'Cattle Photo'}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 backdrop-blur-xs active:scale-90 transition-all z-20 cursor-pointer shadow-lg"
            aria-label="Previous photo"
          >
            <ArrowLeft2 size={22} color="#ffffff" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 backdrop-blur-xs active:scale-90 transition-all z-20 cursor-pointer shadow-lg"
            aria-label="Next photo"
          >
            <ArrowRight2 size={22} color="#ffffff" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div
          className="flex items-center justify-center gap-2 pb-3 pt-1 overflow-x-auto max-w-[480px] mx-auto z-20 scrollbar-none"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => handleThumbnailClick(e, idx)}
              className={`relative size-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                idx === activeIdx
                  ? 'border-[#74a156] scale-105 opacity-100 shadow-md ring-2 ring-[#74a156]/40'
                  : 'border-white/20 opacity-50 hover:opacity-80'
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
