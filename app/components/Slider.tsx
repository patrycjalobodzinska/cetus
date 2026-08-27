"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  children: React.ReactNode;
  /** szerokość slajdu na mobile, np. "82%" */
  slideWidth?: string;
  className?: string;
  /** nazwa karuzeli dla czytnika ekranu */
  ariaLabel?: string;
}

// Poziomy slider (scroll-snap) ze strzałkami i kropkami - do użycia na mobile.
export default function Slider({
  children,
  slideWidth = "82%",
  className = "",
  ariaLabel = "Karuzela",
}: SliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = React.Children.toArray(children);
  const count = items.length;

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(count - 1, i));
    const child = el.children[clamped] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el || count === 0) return;
    const i = Math.round(el.scrollLeft / (el.scrollWidth / count));
    setActive(Math.max(0, Math.min(count - 1, i)));
  };

  return (
    <div className={className}>
      {/* tabIndex + role: przewijany obszar musi być osiągalny z klawiatury
          (WCAG 2.1.1) - inaczej treść za krawędzią jest niedostępna bez myszy. */}
      <div
        ref={ref}
        onScroll={onScroll}
        tabIndex={0}
        role="group"
        aria-label={ariaLabel}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {items.map((child, i) => (
          <div key={i} className="snap-center shrink-0" style={{ width: slideWidth }}>
            {child}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Poprzedni"
          className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 bg-white text-slate-700 shadow-sm transition disabled:opacity-40 enabled:hover:border-blue-300 enabled:hover:text-blue-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            // Kropka ma 8px, więc klikalny obszar powiększamy przezroczystym
            // paddingiem do 24x24 (WCAG 2.5.8), nie zmieniając wyglądu.
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Slajd ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="grid h-6 w-6 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === count - 1}
          aria-label="Następny"
          className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 bg-white text-slate-700 shadow-sm transition disabled:opacity-40 enabled:hover:border-blue-300 enabled:hover:text-blue-600"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
