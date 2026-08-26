"use client";

import { useState } from "react";

interface ReelPlayerProps {
  src: string;
  width: number;
  height: number;
  title: string;
}

// Odtwarzacz FB z placeholderem (skeleton) i płynnym pojawieniem po załadowaniu.
export default function ReelPlayer({ src, width, height, title }: ReelPlayerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative" style={{ width, height }}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-t-2xl bg-gradient-to-b from-slate-100 to-slate-200" />
      )}
      <iframe
        src={src}
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
