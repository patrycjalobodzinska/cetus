"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Poziomy pasek z ręcznym scrollem i strzałkami (full-bleed, z wygaszeniem
 * po bokach). Strzałki zapętlają się: z końca wracają na początek i odwrotnie.
 *
 * CELOWO BEZ scroll-snap. Przy `scroll-snap-type: x mandatory` przeglądarka
 * nie zatrzymuje kontenera tam, gdzie każe mu kod - dosnapowuje do najbliższego
 * punktu i przerywa programowe smooth-scrollowanie. Przy `snap-center` kilka
 * ostatnich kafli daje ten sam, przycięty do maksimum punkt snapu, więc
 * pozycja spoczynkowa na końcu paska była nieprzewidywalna i warunek
 * „jesteśmy na końcu" łapał tylko czasami - klik w strzałkę wyglądał wtedy
 * tak, jakby nic nie robił. Bez snapu `scrollLeft` dobija dokładnie do
 * `scrollWidth - clientWidth`, więc detekcja krańców jest deterministyczna.
 */
export default function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Strzałki mają sens tylko wtedy, gdy pasek faktycznie wystaje poza kadr.
  // Siedem rolek to ~2000 px treści - na szerokim monitorze wszystko się
  // mieści i klikanie nic nie robi. Zamiast martwych kontrolek chowamy je.
  const [scrollable, setScrollable] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setScrollable(el.scrollWidth - el.clientWidth > 1);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Kafle to iframe'y Facebooka - ich rozmiar ustala się po załadowaniu,
    // więc mierzymy też po zmianie rozmiaru dzieci.
    Array.from(el.children).forEach((c) => ro.observe(c));

    return () => ro.disconnect();
  }, []);

  const scrollByDir = (dir: number) => {
    const el = ref.current;
    if (!el) return;

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (maxScroll <= 1) return; // nic nie wystaje poza kadr

    // 2 px tolerancji na zaokrąglenia subpikselowe przy zoomie przeglądarki.
    const EPS = 2;

    if (dir > 0 && el.scrollLeft >= maxScroll - EPS) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (dir < 0 && el.scrollLeft <= EPS) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div
        ref={ref}
        className="scrollbar-hide flex gap-5 overflow-x-auto px-6 py-2 pb-3 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]"
      >
        {children}
      </div>

      {scrollable && (
        <>
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
        </>
      )}
    </div>
  );
}
