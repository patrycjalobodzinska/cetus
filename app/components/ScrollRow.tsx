"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Poziomy pasek z ręcznym scrollem i strzałkami (full-bleed, z wygaszeniem po bokach).
export default function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: number) => {
    const el = ref.current;
    if (!el) return;
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
