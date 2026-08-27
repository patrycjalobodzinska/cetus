"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
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
 *
 * Z tego samego powodu (cudza ramka zjada zdarzenia wskaźnika) rolki mają na
 * sobie przezroczystą nakładkę - bez niej nie dałoby się przeciągnąć karuzeli
 * myszką, bo pointerdown nigdy nie doszedłby do paska. Nakładka jest tylko na
 * wskaźnikach precyzyjnych: palcem pasek przewija się natywnie, a dotknięcie
 * ma od razu włączać film. Kliknięcie nakładki odsłania odtwarzacz tej rolki
 * (przeciągnięcie - nie, ScrollRow gasi wtedy kliknięcie).
 */
export default function ReelsCarousel({
  reels,
  width,
  height,
  ariaLabel,
}: ReelsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);
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
            <div className="relative">
              <ReelPlayer
                src={reel.src}
                width={width}
                height={height}
                title={reel.title}
                index={i}
                active={activeIndex === i}
              />
              {!unlocked.includes(i) && (
                // Nakładka jest wyłącznie afordancją wskaźnika, więc nie jest
                // fokusowalna i jest ukryta przed czytnikami: sama ramka rolki
                // wciąż łapie się Tabem, a fokusowalny element w klonowanym,
                // aria-hidden kaflu byłby błędem dostępności.
                <div
                  role="presentation"
                  aria-hidden="true"
                  onClick={() => setUnlocked((prev) => [...prev, i])}
                  className="group absolute inset-0 z-10 hidden cursor-grab items-center justify-center active:cursor-grabbing [@media(hover:hover)_and_(pointer:fine)]:flex"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-slate-900/50 text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                    <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                  </span>
                </div>
              )}
            </div>
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
