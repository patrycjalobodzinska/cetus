"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FloatProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function Float({
  imageSrc = "/cetus2.png",
  imageAlt = "Cetus"
}: FloatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomElementRef = useRef<HTMLDivElement>(null);
  const topElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomElementRef.current || !topElementRef.current) return;

    // Animacja dla dolnego elementu
    const tlBottom = gsap.timeline({ repeat: -1, ease: "power1.inOut" });
    tlBottom.to(bottomElementRef.current, {
      y: -10,
      duration: 2,
    })
    .to(bottomElementRef.current, {
      y: 0,
      duration: 2,
    });

    // Animacja dla górnego elementu z opóźnieniem
    const tlTop = gsap.timeline({ repeat: -1, ease: "power1.inOut" });
    tlTop.delay(0.5)
    .to(topElementRef.current, {
      y: -8,
      duration: 2,
    })
    .to(topElementRef.current, {
      y: 0,
      duration: 2,
    });
  }, []);

  return (
    <div ref={containerRef} className="relative z-50">
      <div className="relative  bg-white overflow-hidden rounded-[2.5rem]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-96 object-contain "
        />
      </div>

      {/* Dolny element animowany */}
      <div
        ref={bottomElementRef}
        className="absolute -bottom-8 -left-8 bg-white rounded-3xl p-6 shadow-md z-10"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">50+</span>
          </div>
          <div>
            <div className="font-bold text-gray-900">Projekty</div>
            <div className="text-sm text-gray-600">Ukończone</div>
          </div>
        </div>
      </div>

      {/* Górny element animowany */}
      <div
        ref={topElementRef}
        className="absolute -top-6 -right-6 bg-white rounded-3xl px-6 py-3 shadow-md z-10"
      >
        <div className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          #1 Secure AI Infrastructure
        </div>
      </div>
    </div>
  );
}
