"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Poziomy pasek z ręcznym scrollem i strzałkami (full-bleed, z wygaszeniem po bokach).
export default function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Skrajne pozycje, które scroll faktycznie może osiągnąć.
  //
  // Przy snap-center ostatni kafel zatrzymuje się wyśrodkowany, więc jeśli
  // kafle są szerokie względem kadru, scrollLeft nie dobija do
  // scrollWidth - clientWidth i porównanie z tym maksimum nigdy nie byłoby
  // prawdziwe. Dla obecnych rolek (267 px w kadrze 1440 px) pozycja snapu
  // przycina się do maksimum, ale dla szerszych kafli już nie - liczymy więc
  // realne pozycje snapu pierwszego i ostatniego kafla.
  const snapBounds = (el: HTMLDivElement) => {
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const items = Array.from(el.children) as HTMLElement[];
    if (!items.length) return { start: 0, end: maxScroll, maxScroll };

    const snapOf = (child: HTMLElement) =>
      Math.min(
        Math.max(child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2, 0),
        maxScroll,
      );

    return { start: snapOf(items[0]), end: snapOf(items[items.length - 1]), maxScroll };
  };

  // Skok przez całą szerokość paska (zapętlenie) wymaga wyłączenia snapu na
  // czas animacji. Przy scroll-snap-type: mandatory przeglądarka dosnapowuje
  // kontener do najbliższego punktu i przerywa programowe smooth-scrollowanie -
  // klik w strzałkę na końcu wyglądał wtedy tak, jakby nic nie robił.
  const jumpTo = (el: HTMLDivElement, left: number) => {
    el.style.scrollSnapType = "none";

    const restore = () => {
      el.style.scrollSnapType = "";
    };
    if ("onscrollend" in el) {
      el.addEventListener("scrollend", restore, { once: true });
      // Zabezpieczenie: gdyby scrollend nie doszedł (przerwany scroll),
      // snap i tak musi wrócić.
      window.setTimeout(restore, 1000);
    } else {
      window.setTimeout(restore, 700);
    }

    el.scrollTo({ left, behavior: "smooth" });
  };

  const scrollByDir = (dir: number) => {
    const el = ref.current;
    if (!el) return;

    const { start, end, maxScroll } = snapBounds(el);
    if (maxScroll <= 0) return; // nic nie wystaje poza kadr - brak czego przewijać

    const EPS = 8;

    if (dir > 0 && el.scrollLeft >= end - EPS) {
      jumpTo(el, start); // koniec -> wróć na początek
      return;
    }
    if (dir < 0 && el.scrollLeft <= start + EPS) {
      jumpTo(el, end); // początek -> przeskocz na koniec
      return;
    }

    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 py-2 pb-3 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]"
      >
        {children}
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
