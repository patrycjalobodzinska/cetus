"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Jednorazowy scroll-reveal.
 *
 * Wspólny dla sekcji, które startują na `opacity: 0` (Proces, Realizacje).
 * Wcześniej każda miała własną kopię hooka z jednym warunkiem wejścia:
 * "górna krawędź musi minąć 58% okna". Sekcja potrafiła przez to nigdy się nie
 * odsłonić - wystarczyło, że użytkownik wszedł na stronę z przywróconą pozycją
 * scrolla, skoczył kotwicą albo klawiszem End i sekcja była już NAD ekranem:
 * observer nie zgłasza wtedy nic, a failsafe sprawdzał dokładnie ten sam,
 * niespełniony warunek. Treść zostawała niewidoczna aż do przeładowania.
 *
 * Tutaj są trzy niezależne drogi do odsłonięcia, więc żadna pojedyncza
 * nieodpalona ścieżka nie zostawia pustej dziury:
 *  1. pomiar przy montowaniu (sekcja już w kadrze albo już przewinięta),
 *  2. IntersectionObserver - normalna, płynna ścieżka podczas scrollowania,
 *  3. tani, samozdejmujący się nasłuch scroll/resize jako zabezpieczenie,
 *     gdy strona przeskoczy sekcję w jednej klatce albo observer utknie
 *     (np. zapchany główny wątek).
 */
export function useReveal<T extends HTMLElement>(
  /**
   * Ile okna musi „zjeść” sekcja, zanim się odsłoni
   * (0.42 = górna krawędź mija 58% ekranu). Wartość ujemna działa odwrotnie -
   * poszerza kadr, czyli odpala wcześniej, jeszcze przed wjazdem na ekran.
   *
   * Domyślnie ujemna: sekcja odsłania się chwilę PRZED wjazdem na ekran, więc
   * użytkownik nie widzi pustego kadru czekającego na animację.
   */
  bottomMargin = -0.1,
) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Prośba o ograniczenie ruchu - pokazujemy od razu, bez wejścia.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }

    // Widoczna albo już przewinięta = odsłonięta natychmiast.
    const reached = () => {
      const r = el.getBoundingClientRect();
      return r.bottom <= 0 || r.top < window.innerHeight * (1 - bottomMargin);
    };

    if (reached()) {
      setSeen(true);
      return;
    }

    let cleanup = () => {};

    const done = () => {
      setSeen(true);
      cleanup();
    };

    if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(
        ([entry]) => {
          // Drugi warunek łapie sekcję, która wyjechała górą ekranu -
          // wtedy `isIntersecting` jest już false, a treść musi być widoczna.
          if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) done();
        },
        { threshold: 0, rootMargin: `0px 0px ${-Math.round(bottomMargin * 100)}% 0px` },
      );
      io.observe(el);
      cleanup = () => io.disconnect();
    }

    const onScroll = () => {
      if (reached()) done();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const prevCleanup = cleanup;
    cleanup = () => {
      prevCleanup();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    return () => cleanup();
  }, [bottomMargin]);

  return { ref, seen };
}
