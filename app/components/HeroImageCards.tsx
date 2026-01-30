'use client';

import React, { useState, useEffect } from 'react';

interface ImageCard {
  src: string;
  alt: string;
}

const images: ImageCard[] = [
  { src: '/cetus2.png', alt: 'Cetus 1' },
  { src: '/cetus.png', alt: 'Cetus 2' },
  { src: '/cetus2.png', alt: 'Cetus 3' },
];

export default function HeroImageCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Zmiana co 4 sekundy

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full lg:h-[650px] flex items-center justify-center">
      <div className="relative w-full h-full grid grid-cols-1 grid-rows-1">
        {images.map((image, index) => {
          // Obliczamy pozycję względem aktualnej karty
          let position = index - currentIndex;
          if (position < 0) position += images.length;

          const isActive = index === currentIndex;
          const isNext = position === 1;
          const isBehind = position > 1;

          // Z-index: najwyższa aktywna karta, potem następna, potem pozostałe
          const zIndex = isActive ? images.length + 1 : isNext ? images.length : images.length - position;

          // Offset dla efektu stackowania
          const offset = position * 30;

          // Skala - aktywna największa, następne coraz mniejsze
          const scale = isActive ? 1 : isNext ? 0.92 : 0.85 - (position - 2) * 0.03;

          return (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                zIndex: zIndex,
                transform: `translateY(${offset}px) scale(${Math.max(scale, 0.7)})`,
                opacity: isActive ? 1 : isNext ? 0.8 : Math.max(0.3, 0.6 - position * 0.1),
              }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
