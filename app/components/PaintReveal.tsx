"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface PaintRevealProps {
  sketchSrc: string;
  paintedSrc: string;
  alt?: string;
  /** proporcje kontenera, np. "16 / 10" */
  aspect?: string;
  className?: string;
}

// Desktop: kolor odsłaniany kursorem (canvas). Mobile: całość pulsuje opacity.
export default function PaintReveal({
  sketchSrc,
  paintedSrc,
  alt = "",
  aspect = "16 / 10",
  className = "",
}: PaintRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // brak hovera (telefon/tablet) → tryb pulsujący (opacity), bez rysowania
    const autoPlay = !!window.matchMedia?.("(hover: none)").matches;
    setAuto(autoPlay);

    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d")!;
    const scaled = document.createElement("canvas");
    const sctx = scaled.getContext("2d")!;

    const painted = new window.Image();
    let loaded = false;
    painted.onload = () => {
      loaded = true;
      resize();
    };
    painted.src = paintedSrc;

    let dpr = 1;
    let lastPt: { x: number; y: number } | null = null;
    let phase = 0;

    const buildScaled = () => {
      if (!loaded) return;
      const iw = painted.naturalWidth;
      const ih = painted.naturalHeight;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.min(cw / iw, ch / ih);
      const w = iw * s;
      const h = ih * s;
      sctx.clearRect(0, 0, scaled.width, scaled.height);
      sctx.drawImage(painted, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const cw = Math.max(1, Math.round(rect.width * dpr));
      const ch = Math.max(1, Math.round(rect.height * dpr));
      [canvas, mask, scaled].forEach((c) => {
        c.width = cw;
        c.height = ch;
      });
      buildScaled();
      if (autoPlay && reduceMotion) {
        // redukcja ruchu: pokaż kolor statycznie
        mctx.globalCompositeOperation = "source-over";
        mctx.clearRect(0, 0, mask.width, mask.height);
        mctx.fillStyle = "#ffffff";
        mctx.fillRect(0, 0, mask.width, mask.height);
      }
      render();
    };

    const render = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(scaled, 0, 0);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    };

    const r = () => Math.max(canvas.width, canvas.height) * 0.09;

    const stamp = (x: number, y: number, rad: number = r(), erase = false) => {
      mctx.globalCompositeOperation = erase ? "destination-out" : "source-over";
      const g = mctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.65, "rgba(255,255,255,0.95)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      mctx.fillStyle = g;
      mctx.beginPath();
      mctx.arc(x, y, rad, 0, Math.PI * 2);
      mctx.fill();
      mctx.globalCompositeOperation = "source-over";
    };

    const paintTo = (cx: number, cy: number) => {
      const x = cx * dpr;
      const y = cy * dpr;
      if (lastPt) {
        const dx = x - lastPt.x;
        const dy = y - lastPt.y;
        const dist = Math.hypot(dx, dy);
        const step = r() * 0.35;
        const n = Math.min(64, Math.max(1, Math.floor(dist / step)));
        for (let i = 1; i <= n; i++) {
          stamp(lastPt.x + (dx * i) / n, lastPt.y + (dy * i) / n);
        }
      } else {
        stamp(x, y);
      }
      lastPt = { x, y };
    };

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      paintTo(e.clientX - rect.left, e.clientY - rect.top);
    };
    const onLeave = () => {
      lastPt = null;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // jedna kreska pasma b, postęp t∈[ta,tb]; kierunek naprzemienny (zygzak bez odrywania)
    const drawStroke = (
      b: number,
      ta: number,
      tb: number,
      spacing: number,
      slope: number,
      rad: number,
      erase = false,
    ) => {
      const w = mask.width;
      const h = mask.height;
      // start poniżej dołu (o skos), by pokryć też prawy-dolny róg
      const baseY = h + w * slope - b * spacing;
      const rightToLeft = b % 2 === 1; // co drugie pasmo w drugą stronę
      const stepT = Math.max(0.002, (rad * 0.45) / w);
      for (let t = ta; t <= tb; t += stepT) {
        const x = (rightToLeft ? 1 - t : t) * w;
        const wob = Math.sin(x * 0.014 + b * 0.9) * rad * 0.28; // ręczne drżenie
        const y = baseY - x * slope + wob; // nachylenie w prawo-górę
        if (y < -rad || y > h + rad) continue;
        stamp(x, y, erase ? rad * 1.15 : rad * 0.9, erase);
      }
    };

    let raf = 0;
    let prevProg = 0;
    const tick = () => {
      if (autoPlay) {
        // MOBILE: obraz "kreskuje się" grubymi ukośnymi liniami (zygzak),
        // po wypełnieniu wymazuje się tą samą ścieżką (najstarsze pierwsze).
        if (!reduceMotion) {
          const w = mask.width;
          const h = mask.height;
          const rad = r() * 1.8; // grubsza kreska
          const spacing = rad * 1.15; // mniej pasm
          const slope = 0.55;
          const bands = Math.ceil((h + w * slope + rad * 3) / spacing) + 2;

          // przebiega pasma a→b, rysując lub wymazując
          const runBands = (a: number, b: number, erase: boolean) => {
            if (b <= a) return;
            const bPrev = Math.floor(a);
            const bCur = Math.floor(b);
            if (bCur !== bPrev) {
              drawStroke(bPrev, a - bPrev, 1, spacing, slope, rad, erase);
              drawStroke(bCur, 0, b - bCur, spacing, slope, rad, erase);
            } else {
              drawStroke(bCur, a - bCur, b - bCur, spacing, slope, rad, erase);
            }
          };

          // "kometa": ogon (wymazywanie) rusza z opóźnieniem za głową (rysowaniem)
          const LAG = bands * 0.4; // zacznij znikać po ~40% narysowania
          const cycle = bands + LAG;
          const prev = prevProg;
          phase += 0.035; // wolniejsze malowanie

          if (phase >= cycle) {
            phase = 0;
            prevProg = 0;
            mctx.clearRect(0, 0, w, h);
            render();
            raf = requestAnimationFrame(tick);
            return;
          }

          // głowa: rysowanie (do końca pasm)
          runBands(Math.min(prev, bands), Math.min(phase, bands), false);
          // ogon: wymazywanie tą samą ścieżką, z opóźnieniem LAG
          runBands(
            Math.min(Math.max(prev - LAG, 0), bands),
            Math.min(Math.max(phase - LAG, 0), bands),
            true,
          );

          prevProg = phase;
          render();
        }
        raf = requestAnimationFrame(tick);
        return;
      }
      // DESKTOP: wygaszanie śladu kursora
      if (!reduceMotion) {
        mctx.globalCompositeOperation = "destination-out";
        mctx.fillStyle = "rgba(0,0,0,0.02)";
        mctx.fillRect(0, 0, mask.width, mask.height);
        mctx.globalCompositeOperation = "source-over";
      }
      render();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    if (!autoPlay) {
      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [paintedSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${auto ? "" : "touch-none"} ${className}`}
      style={{ aspectRatio: aspect }}>
      {/* szkic – warstwa bazowa (dół wygaszony do przezroczystości) */}
      <Image
        src={sketchSrc}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain select-none pointer-events-none [mask-image:linear-gradient(to_bottom,#000_58%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_58%,transparent_90%)]"
      />
      {/* warstwa koloru: desktop = kursor, mobile = ukośne kreski (auto) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${auto ? "opacity-70" : ""}`}
      />
    </div>
  );
}
