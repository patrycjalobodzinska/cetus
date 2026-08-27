"use client";

import { useEffect, useRef, useState } from "react";

interface ReelPlayerProps {
  src: string;
  width: number;
  height: number;
  title: string;
  /** pozycja w karuzeli - po niej rozpoznajemy klikniętą ramkę */
  index?: number;
  /** czy to ta rolka, którą użytkownik ostatnio kliknął */
  active?: boolean;
}

// Odtwarzacz FB z placeholderem (skeleton) i płynnym pojawieniem po załadowaniu.
export default function ReelPlayer({
  src,
  width,
  height,
  title,
  index,
  active = true,
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
    <div className="relative" style={{ width, height }}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-t-2xl bg-gradient-to-b from-slate-100 to-slate-200" />
      )}
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
    </div>
  );
}
