"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Poziomy pasek z nieskończoną pętlą.
 *
 * Ścieżka zawiera dwie kopie kafli. Pozycja scrolla jest trzymana w zakresie
 * [0, szerokość jednej kopii) - gdy przekroczy granicę, odejmujemy tę
 * szerokość natychmiastowo. Ponieważ treść za granicą jest identyczna,
 * przeskok jest wizualnie niewidoczny, a pasek nie ma końca: po ostatnim
 * kaflu od razu pojawia się pierwszy, w obie strony i przy przewijaniu palcem.
 *
 * Normalizacja dzieje się PRZED animacją, nie w jej trakcie - inaczej
 * korekta scrollLeft przerywałaby smooth-scrollowanie.
 *
 * Bez scroll-snap: przy `snap-mandatory` przeglądarka dosnapowuje kontener
 * do własnych punktów i przerywa programowe przewijanie.
 */
export default function ScrollRow({
  children,
  ariaLabel = "Karuzela",
}: {
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const items = React.Children.toArray(children);
  const count = items.length;

  /** Szerokość jednej kopii ścieżki - mierzona z odległości między kopiami. */
  const setWidth = useCallback(
    (el: HTMLDivElement) => {
      const kids = Array.from(el.children) as HTMLElement[];
      if (kids.length < count * 2 || count === 0) return 0;
      return kids[count].offsetLeft - kids[0].offsetLeft;
    },
    [count],
  );

  /** Krok = jeden kafel plus odstęp. */
  const step = useCallback((el: HTMLDivElement) => {
    const kids = Array.from(el.children) as HTMLElement[];
    if (kids.length < 2) return el.clientWidth * 0.8;
    return kids[1].offsetLeft - kids[0].offsetLeft;
  }, []);

  const scrollByDir = (dir: number) => {
    const el = ref.current;
    if (!el) return;

    const one = setWidth(el);
    if (one <= 0) return;

    let target = el.scrollLeft + dir * step(el);

    // W lewo trzeba przeskoczyć PRZED animacją, bo przeglądarka przycina
    // scrollLeft do zera i animacja nie miałaby gdzie się rozegrać.
    // Skok o szerokość jednej kopii jest wizualnie niewidoczny (ta sama treść).
    if (target < 0) {
      el.scrollLeft += one;
      target += one;
    }

    // W prawo NIE korygujemy z góry: druga kopia daje zapas, więc animacja
    // ma gdzie dojechać, a pozycję zawija dopiero handler po wyhamowaniu.
    // Korekta przed animacją cofałaby scrollLeft poniżej zera (przycięcie
    // do 0) i dawała widoczny przeskok w tył.
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  // ─── Przeciąganie kursorem ──────────────────────────────────────────────
  // Palcem pasek przewija się natywnie, myszką - nie, bo nie ma widocznego
  // suwaka. Dlatego na wskaźnikach precyzyjnych (mysz, trackpad) łapiemy
  // pointerdown i sami przesuwamy scrollLeft. Zdarzenia dochodzą tu również
  // z przezroczystych nakładek nad ramkami rolek (iframe sam ich nie
  // przepuszcza) - patrz ReelsCarousel.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // palcem przewija przeglądarka
    if (e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    ref.current?.releasePointerCapture?.(e.pointerId);
  };

  // Po przeciągnięciu nie chcemy kliknięcia w kafel (np. wejścia w link czy
  // odsłonięcia odtwarzacza) - gasimy je w fazie przechwytywania.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return;
    drag.current.moved = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // Przewijanie palcem też musi się zawijać - normalizujemy po wyhamowaniu.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer = 0;
    const normalize = () => {
      const one = setWidth(el);
      if (one <= 0) return;
      // Tylko w prawo: przeglądarka przycina scrollLeft do zera, więc w lewo
      // nie da się wyjechać poza początek ścieżki. Zawijanie w lewo palcem
      // wymagałoby trzeciej kopii kafli (i trzeciego zestawu iframe'ów);
      // strzałka w lewo zawija się mimo tego, bo koryguje pozycję sama.
      if (el.scrollLeft >= one) el.scrollLeft -= one;
    };

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(normalize, 120);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [setWidth]);

  if (!count) return null;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      {/* Przewijany obszar musi dać się sfokusować, żeby dało się go przewinąć
          strzałkami klawiatury (WCAG 2.1.1). */}
      <div
        ref={ref}
        tabIndex={0}
        role="group"
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="scrollbar-hide flex touch-pan-y gap-5 overflow-x-auto px-6 py-2 pb-3 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] [@media(hover:hover)_and_(pointer:fine)]:cursor-grab [@media(hover:hover)_and_(pointer:fine)]:active:cursor-grabbing"
      >
        {items.map((child, i) => (
          <React.Fragment key={`a-${i}`}>{child}</React.Fragment>
        ))}
        {/* Druga kopia domyka pętlę. Klonujemy same kafle - bez opakowania,
            bo `display: contents` nie ma boksa i zepsułoby pomiar offsetLeft.
            aria-hidden, żeby czytnik ekranu nie czytał listy dwa razy. */}
        {items.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ "aria-hidden"?: string }>, {
                key: `b-${i}`,
                "aria-hidden": "true",
              })
            : child,
        )}
      </div>

      <button
        type="button"
        onClick={() => scrollByDir(-1)}
        aria-label="Poprzednie"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-gray-200 bg-white/90 p-2 text-slate-700 shadow-md backdrop-blur transition hover:border-blue-300 hover:text-blue-600 sm:grid"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByDir(1)}
        aria-label="Następne"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-gray-200 bg-white/90 p-2 text-slate-700 shadow-md backdrop-blur transition hover:border-blue-300 hover:text-blue-600 sm:grid"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
