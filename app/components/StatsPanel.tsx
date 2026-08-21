"use client";

import React from "react";
import { useTranslations } from "next-intl";

// ── Spark - mała ciemno niebieska kropka z delikatnym shadow ─────────────────
interface SparkProps {
  path: string;
  dur?: string;
  begin?: string;
  filterId: string;
}

function Spark({ path, dur = "9s", begin = "0s", filterId }: SparkProps) {
  return (
    <circle r="2" fill="#3b82f6" filter={`url(#${filterId})`}>
      <animateMotion
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        path={path}
      />
    </circle>
  );
}

// ── Glow filter - rozmyta kopia pod spodem daje wyraźny neon efekt ───────────
function NeonGlowFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-300%" y="-300%" width="700%" height="700%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="blur2" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function StatsPanel() {
  const t = useTranslations("stats");

  const stats = [
    { key: "projects", count: Number(t("projects.count")) },
    { key: "clients", count: Number(t("clients.count")) },
    { key: "experts", count: Number(t("experts.count")) },
    { key: "experience", count: Number(t("experience.count")) },
  ];

  return (
    <div className="relative w-full mx-auto lg:mb-10 md:px-4 overflow-visible">
      <div className="relative max-w-6xl mx-auto flex justify-center items-center py-12 overflow-visible">
        {/* ── Stats box ────────────────────────────────────────────────────── */}
        <div
          className="relative w-full mx-6 md:mx-16 max-w-5xl min-h-40 py-6 md:h-28 bg-white border border-gray-100 text-gray-900 flex flex-col md:flex-row items-center justify-around sm:px-12 px-6 md:px-16 drop-shadow-xl z-10 stats-polygon"
          style={{
            filter:
              "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
          }}>
          <div className="relative w-full md:grid-cols-4 grid grid-cols-2 md:py-4 gap-4 md:gap-8 z-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col justify-between text-center min-w-[120px]">
                <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium tracking-wide uppercase">
                  {t(`${stat.key}.title`)}
                </div>
                <div className="text-2xl md:text-5xl font-medium text-gray-900 tracking-wider">
                  <span aria-hidden="true">{stat.count}+</span>
                  <span className="sr-only">Ponad {stat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop - left line ──────────────────────────────────────────── */}
        <div
          className="absolute hidden md:block left-0 bottom-0 w-[400px] h-[80px] pointer-events-none z-0"
          style={{ left: "0px", top: "calc(5px)" }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 300 70"
            preserveAspectRatio="none"
            aria-hidden="true">
            <defs>
              <linearGradient
                id="neonGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
              <filter
                id="softNeon"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <NeonGlowFilter id="sparkGlowL" />
            </defs>
            <path
              d="M10 65 L35 65 L60 20 L300 20 L400 20"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              filter="url(#softNeon)"
              strokeLinecap="round"
            />
            <rect
              x="7"
              y="62"
              width="6"
              height="6"
              fill="#3b82f6"
              transform="rotate(45 10 65)"
              filter="url(#softNeon)"
            />
            <Spark
              path="M300 20 L60 20 L35 65 L10 65"
              dur="9s"
              begin="0s"
              filterId="sparkGlowL"
            />
          </svg>
        </div>

        {/* ── Mobile - left line ───────────────────────────────────────────── */}
        <div
          className="absolute md:hidden left-0 bottom-0 w-[80px] h-[200px] pointer-events-none z-0"
          style={{ left: "0px", top: "calc(5px)" }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 70 200"
            preserveAspectRatio="none"
            aria-hidden="true">
            <defs>
              <linearGradient
                id="neonGradientMobL"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
              <filter
                id="softNeonMobL"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <NeonGlowFilter id="sparkGlowMobL" />
            </defs>
            <path
              d="M25 35 L10 55 L10 150"
              fill="none"
              stroke="url(#neonGradientMobL)"
              strokeWidth="2"
              filter="url(#softNeonMobL)"
              strokeLinecap="round"
            />
            <rect
              x="25"
              y="30"
              width="6"
              height="6"
              fill="#3b82f6"
              filter="url(#softNeonMobL)"
            />
            <Spark
              path="M10 150 L10 55 L25 35"
              dur="9s"
              begin="0s"
              filterId="sparkGlowMobL"
            />
          </svg>
        </div>

        {/* ── Mobile - right line (rotated 180°) ──────────────────────────── */}
        <div
          className="absolute md:hidden rotate-180 right-10 bottom-10 w-[80px] h-[200px] pointer-events-none z-0"
          style={{ right: "0", bottom: "calc(5px)" }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 70 200"
            preserveAspectRatio="none"
            aria-hidden="true">
            <defs>
              <linearGradient
                id="neonGradientMobR"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
              <filter
                id="softNeonMobR"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <NeonGlowFilter id="sparkGlowMobR" />
            </defs>
            <path
              d="M25 35 L10 55 L10 150"
              fill="none"
              stroke="url(#neonGradientMobR)"
              strokeWidth="2"
              filter="url(#softNeonMobR)"
              strokeLinecap="round"
            />
            <rect
              x="25"
              y="30"
              width="6"
              height="6"
              fill="#3b82f6"
              filter="url(#softNeonMobR)"
            />
            <Spark
              path="M25 35 L10 55 L10 150"
              dur="9s"
              begin="4.5s"
              filterId="sparkGlowMobR"
            />
          </svg>
        </div>

        {/* ── Desktop - right line ─────────────────────────────────────────── */}
        <div
          className="absolute hidden md:block w-[400px] h-[80px] pointer-events-none z-0"
          style={{ right: "0px", bottom: "calc(20px)" }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 300 70"
            preserveAspectRatio="none"
            aria-hidden="true">
            <defs>
              <NeonGlowFilter id="sparkGlowR" />
            </defs>
            <path
              d="M10 65 L240 65 L265 20 L290 20 L294 20"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              filter="url(#softNeon)"
              strokeLinecap="round"
            />
            <rect
              x="287"
              y="17"
              width="6"
              height="6"
              fill="#93c5fd"
              transform="rotate(45 290 20)"
              filter="url(#softNeon)"
            />
            <Spark
              path="M10 65 L240 65 L265 20 L290 20 L294 20"
              dur="9s"
              begin="4.5s"
              filterId="sparkGlowR"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
