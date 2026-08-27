"use client";

import { useEffect, useRef, useState } from "react";
import ScrollRow from "./ScrollRow";
import ReelPlayer from "./ReelPlayer";

interface Reel {
  src: string;
  caption?: string;
  title: string;
}

interface ReelsCarouselProps {
  reels: Reel[];
  width: number;
  height: number;
  ariaLabel: string;
}

/**
 * Karuzela rolek, w której gra tylko jedna rolka naraz.
 *
 * Odtwarzacz Facebooka siedzi w cudzej ramce (iframe z innej domeny), więc nie
 * da się mu wysłać "pauzy" - nie mamy dostępu do jego API. Wykrywamy natomiast,
 * że użytkownik kliknął W ramkę: przeglądarka przenosi wtedy fokus na iframe,
 * a strona dostaje `blur`. Po tym poznajemy, którą rolkę ktoś włączył.
 *
 * Zatrzymanie poprzedniej robimy przez przeładowanie jej ramki (zmiana `key`
 * w `ReelPlayer`) - to jedyny sposób, żeby cudzy odtwarzacz przestał grać.
 */
export default function ReelsCarousel({
  reels,
  width,
  height,
  ariaLabel,
}: ReelsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onBlur = () => {
      // `blur` leci przed aktualizacją activeElement - stąd odczyt w kolejnej klatce.
      window.setTimeout(() => {
        const el = document.activeElement;
        if (!el || el.tagName !== "IFRAME") return;
        if (!containerRef.current?.contains(el)) return;

        const index = Number((el as HTMLIFrameElement).dataset.reelIndex);
        if (Number.isNaN(index)) return;

        setActiveIndex((current) => (current === index ? current : index));
      }, 0);
    };

    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  return (
    <div ref={containerRef}>
      <ScrollRow ariaLabel={ariaLabel}>
        {reels.map((reel, i) => (
          <div
            key={`${reel.src}-${i}`}
            className="shrink-0 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md shadow-blue-500/10"
            style={{ width }}
          >
            <ReelPlayer
              src={reel.src}
              width={width}
              height={height}
              title={reel.title}
              index={i}
              active={activeIndex === i}
            />
            {reel.caption && (
              <p className="px-3 py-3 text-slate-700 text-sm font-medium text-center">
                {reel.caption}
              </p>
            )}
          </div>
        ))}
      </ScrollRow>
    </div>
  );
}
