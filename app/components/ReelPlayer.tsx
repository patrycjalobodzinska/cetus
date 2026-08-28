"use client";

import { useEffect, useRef, useState } from "react";
import EmbedConsentGate from "./consent/EmbedConsentGate";

interface ReelPlayerProps {
  src: string;
  width: number;
  height: number;
  title: string;
  /** pozycja w karuzeli - po niej rozpoznajemy klikniętą ramkę */
  index?: number;
  /** czy to ta rolka, którą użytkownik ostatnio kliknął */
  active?: boolean;
  /** dopóki false, ramka FB w ogóle nie trafia do DOM - widać sam placeholder */
  mounted?: boolean;
}

// Odtwarzacz FB z placeholderem (skeleton) i płynnym pojawieniem po załadowaniu.
export default function ReelPlayer({
  src,
  width,
  height,
  title,
  index,
  active = true,
  mounted = true,
}: ReelPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  // Zmiana `key` przeładowuje ramkę - tak zatrzymujemy odtwarzacz Facebooka,
  // do którego nie mamy API (inna domena). Patrz ReelsCarousel.
  const [reloadKey, setReloadKey] = useState(0);
  const wasActive = useRef(active);

  useEffect(() => {
    // Reset tylko przy przejściu grająca -> nieaktywna; inaczej wszystkie
    // ramki przeładowywałyby się zaraz po pierwszym renderze.
    if (wasActive.current && !active) {
      setLoaded(false);
      setReloadKey((k) => k + 1);
    }
    wasActive.current = active;
  }, [active]);

  return (
    <div className="relative overflow-hidden rounded-t-2xl" style={{ width, height }}>
      {/* Odtwarzacz Facebooka zapisuje cookies od momentu wczytania ramki,
          więc bez zgody na osadzone treści w ogóle go nie renderujemy.
          Skeleton siedzi wewnątrz bramki - inaczej przykrywałby kafel
          z pytaniem o zgodę, bo `loaded` nigdy by się nie zapaliło. */}
      <EmbedConsentGate provider="Facebook">
      {(!loaded || !mounted) && (
        <div className="absolute inset-0 animate-pulse rounded-t-2xl bg-gradient-to-b from-slate-100 to-slate-200" />
      )}
      {mounted && (
        <iframe
          key={reloadKey}
          src={src}
          data-reel-index={index}
          width={width}
          height={height}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ border: "none", overflow: "hidden", display: "block" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
          title={title}
          className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      </EmbedConsentGate>
    </div>
  );
}
