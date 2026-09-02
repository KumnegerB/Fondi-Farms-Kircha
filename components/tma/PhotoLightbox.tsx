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
  const [activeIdx, setActiveIdx] = useState(initialIndex);
  const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Sync index on open or initialIndex change during render
  if (isOpen !== prevIsOpen || initialIndex !== prevInitialIndex) {
    setPrevIsOpen(isOpen);
    setPrevInitialIndex(initialIndex);
    if (isOpen) {
      setActiveIdx(Math.max(0, Math.min(initialIndex, (images?.length || 1) - 1)));
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentSafeIdx = Math.max(0, Math.min(activeIdx, images.length - 1));
  const currentImage = images[currentSafeIdx] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar Header */}
      <div
        className="w-full flex items-center justify-between p-4 z-10 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          {title && <span className="text-white text-sm font-semibold truncate max-w-[240px]">{title}</span>}
          <span className="text-stone-400 text-xs font-mono">
            {currentSafeIdx + 1} of {images.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Close photo viewer"
        >
          <CloseCircle size={28} color="#ffffff" variant="Linear" />
        </button>
      </div>

      {/* Main Large Image Display with Next/Prev Buttons */}
      <div
        className="relative flex-1 w-full flex items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[65vh] max-h-[500px]">
          <Image
            src={currentImage}
            alt={title || `Photo ${currentSafeIdx + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Previous Image Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 active:scale-95 text-white p-3 rounded-full backdrop-blur-xs transition-all cursor-pointer z-20 shadow-lg"
            aria-label="Previous photo"
          >
            <ArrowLeft2 size={24} color="#ffffff" />
          </button>
        )}

        {/* Next Image Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 active:scale-95 text-white p-3 rounded-full backdrop-blur-xs transition-all cursor-pointer z-20 shadow-lg"
            aria-label="Next photo"
          >
            <ArrowRight2 size={24} color="#ffffff" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div
          className="w-full p-4 bg-gradient-to-t from-black/90 to-transparent z-10 flex items-center justify-center gap-2 overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((imgSrc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`relative size-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                idx === currentSafeIdx
                  ? 'border-[#74a156] scale-105 shadow-md'
                  : 'border-white/30 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={imgSrc} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
