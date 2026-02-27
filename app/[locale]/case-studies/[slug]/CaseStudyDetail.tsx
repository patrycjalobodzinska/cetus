"use client";

import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import StarGradientButton from "@/app/components/ui/gradientBackground";
import { urlFor } from "@/sanity/lib/image";
import {
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Users,
  Shield,
} from "lucide-react";
import { useTranslations } from "next-intl";

const iconMap: Record<string, any> = {
  TrendingUp,
  Clock,
  Target,
  Zap,
  Users,
  Shield,
  CheckCircle2,
};

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface CsHeroSectionProps {
  _type: "csHeroSection";
  _key: string;
  title?: string;
  category?: string;
  description?: string;
  iframeUrl?: string;
}

interface CsStatsSectionProps {
  _type: "csStatsSection";
  _key: string;
  variant?: "cards" | "horizontal";
  items?: Array<{
    _key: string;
    value?: string;
    label?: string;
    icon?: string;
  }>;
}

interface CsChallengeSectionProps {
  _type: "csChallengeSection";
  _key: string;
  variant?: "narrative" | "two-column";
  intro?: string;
  bullets?: string[];
  consequence?: string;
}

interface CsModulesSectionProps {
  _type: "csModulesSection";
  _key: string;
  variant?: "alternating" | "cards";
  sectionTitle?: string;
  items?: Array<{
    _key: string;
    icon?: string;
    title?: string;
    description?: string[];
    image?: any;
  }>;
}

interface CsResultsSectionProps {
  _type: "csResultsSection";
  _key: string;
  variant?: "numbered" | "checklist" | "stacked";
  sectionTitle?: string;
  items?: Array<{ _key: string; title?: string; description?: string }>;
}

interface CsTechnologiesSectionProps {
  _type: "csTechnologiesSection";
  _key: string;
  variant?: "circuit" | "badges" | "carousel";
  sectionTitle?: string;
  items?: string[];
}

interface CsQuoteSectionProps {
  _type: "csQuoteSection";
  _key: string;
  variant?: "centered" | "blockquote";
  quote?: string;
  author?: string;
}

interface CsScopeSectionProps {
  _type: "csScopeSection";
  _key: string;
  variant?: "list" | "grid";
  sectionTitle?: string;
  items?: Array<{ _key: string; text?: string }>;
  note?: string;
}

interface CsCtaSectionProps {
  _type: "csCtaSection";
  _key: string;
  variant?: "centered" | "banner";
  heading?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

type Section =
  | CsHeroSectionProps
  | CsStatsSectionProps
  | CsChallengeSectionProps
  | CsModulesSectionProps
  | CsResultsSectionProps
  | CsTechnologiesSectionProps
  | CsQuoteSectionProps
  | CsScopeSectionProps
  | CsCtaSectionProps;

interface CaseStudy {
  _id: string;
  sections?: Section[];
}

// ─── StickyResultCard — używany w wariancie "stacked" ────────────────────────
const POLYGON = "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)";

function StickyResultCard({
  item,
  index,
  progress,
  range,
  targetScale,
  cardTop,
}: {
  item: { _key: string; title?: string; description?: string };
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  cardTop: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div style={{ top: `${cardTop}px` }} className="sticky z-20 w-full mb-6">
      <motion.div style={{ scale, transformOrigin: "top" }}>
        <div
          className="p-px rounded-md bg-gradient-to-br from-blue-600 via-sky-400 to-blue-900"
          style={{ clipPath: POLYGON }}
        >
          <div
            className="bg-white px-8 py-8 flex items-start gap-6"
            style={{ clipPath: POLYGON }}
          >
            <div className="relative flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full bg-blue-100 blur-xl opacity-60" />
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-2xl shadow-lg">
                {(index + 1).toString().padStart(2, "0")}
              </div>
            </div>
            <div className="flex-1 py-2">
              {item.title && <p className="text-slate-900 font-semibold text-lg mb-1">{item.title}</p>}
              {item.description && <p className="text-slate-600 leading-relaxed">{item.description}</p>}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── ScaledIframe ─────────────────────────────────────────────────────────────
// Renders a full-desktop-width page (INNER_W) inside the container,
// scaled down so the entire site is visible without scrolling.

const INNER_W = 1280; // px — the width the site is rendered at internally
const INNER_H = 900; // px — how tall the viewport is inside the iframe

function ScaledIframe({ src, title }: { src: string; title?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const skipTargetId = `after-iframe-${src.replace(/\W/g, "")}`;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) {
        setScale(wrapperRef.current.offsetWidth / INNER_W);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div role="region" aria-label={title ? `Podgląd strony: ${title}` : "Podgląd strony"}>
      {/* Skip link — widoczny tylko przy fokusie (WCAG 2.4.1) */}
      <a
        href={`#${skipTargetId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:text-sm focus:font-medium focus:rounded focus:outline-none"
      >
        Pomiń podgląd strony
      </a>

      {/* Informacja dla czytników ekranu */}
      <p className="sr-only">
        Poniżej znajduje się podgląd strony projektu osadzony w ramce. Aby wejść do ramki, naciśnij Tab. Aby wyjść, naciśnij Escape lub Shift+Tab.
      </p>

      <div
        ref={wrapperRef}
        style={{
          width: "100%",
          height: `${INNER_H * scale}px`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          loading="lazy"
          tabIndex={0}
          style={{
            width: `${INNER_W}px`,
            height: `${INNER_H}px`,
            border: "none",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "auto",
          }}
        />
      </div>

      {/* Cel skip linka — focus trafia tutaj po "Pomiń podgląd strony" */}
      <div id={skipTargetId} tabIndex={-1} className="sr-only" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Section components
// ═══════════════════════════════════════════════════════════════════════════════

function CsHeroSection({
  title,
  category,
  description,
  iframeUrl,
}: CsHeroSectionProps) {
  const t = useTranslations("caseStudyDetail");

  return (
    <section className="pt-[var(--page-top-offset)] pb-20 ">
      <div className="max-w-7xl mx-auto px-2">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all mb-8">
          <ArrowLeft className="w-4 h-4" />
          {t("backToList")}
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left: text */}
          <div className="space-y-8 min-w-[40%]">
            {category && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
                {category}
              </div>
            )}
            {title && (
              <h1
                className="heading-1 text-slate-900"
                style={{ fontFamily: "var(--font-michroma)" }}>
                {title}
              </h1>
            )}
            {description && (
              <p className="text-lg text-slate-600 leading-relaxed">
                {description}
              </p>
            )}
            <Link href="/kontakt">
              <StarGradientButton>{t("ctaButton")}</StarGradientButton>
            </Link>
          </div>

          {/* Right: scaled iframe preview */}
          {iframeUrl && (
            <div className="relative max-w-[55%] bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-3 shadow-2xl">
              <div className="bg-black rounded-lg p-2">
                <div className="bg-white rounded-sm overflow-hidden">
                  <ScaledIframe
                    src={iframeUrl}
                    title={title || t("imageAltFallback")}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CsStatsSection({
  variant = "cards",
  items = [],
}: CsStatsSectionProps) {
  if (!items.length) return null;

  if (variant === "horizontal") {
    return (
      <section className="py-16  border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-around gap-8">
            {items.map((stat) => (
              <div key={stat._key} className="text-center">
                <div className="heading-hero font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((stat) => {
            const Icon = stat.icon
              ? iconMap[stat.icon] || TrendingUp
              : TrendingUp;
            return (
              <div
                key={stat._key}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600/30 p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  {stat.value && (
                    <div className="heading-hero font-bold text-blue-600 mb-4">
                      {stat.value}
                    </div>
                  )}
                  {stat.label && (
                    <div className="text-slate-600 font-medium text-lg leading-relaxed">
                      {stat.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CsChallengeSection({
  variant = "narrative",
  intro,
  bullets = [],
  consequence,
}: CsChallengeSectionProps) {
  const t = useTranslations("caseStudyDetail");

  if (variant === "two-column") {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="heading-1 text-slate-900 mb-12"
            style={{ fontFamily: "var(--font-michroma)" }}>
            {t("challengeTitle")}
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              {intro && (
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {intro}
                </p>
              )}
              {bullets.length > 0 && (
                <ul className="space-y-3">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 leading-relaxed">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {consequence && (
              <div className=" rounded-2xl border border-gray-200 p-8">
                <p className="text-lg text-slate-600 leading-relaxed">
                  {consequence}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="heading-1 text-slate-900 mb-8"
          style={{ fontFamily: "var(--font-michroma)" }}>
          {t("challengeTitle")}
        </h2>
        {intro && (
          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
            {intro}
          </p>
        )}
        {bullets.length > 0 && (
          <ul className="space-y-4 max-w-3xl">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        )}
        {consequence && (
          <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-3xl italic">
            {consequence}
          </p>
        )}
      </div>
    </section>
  );
}

function CsModulesSection({
  variant = "alternating",
  sectionTitle,
  items = [],
}: CsModulesSectionProps) {
  const t = useTranslations("caseStudyDetail");
  if (!items.length) return null;

  const title = sectionTitle || t("modulesTitle");

  if (variant === "cards") {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="heading-1 text-slate-900"
              style={{ fontFamily: "var(--font-michroma)" }}>
              {title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((module) => (
              <div
                key={module._key}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:border-blue-600/30 hover:shadow-lg transition-all duration-300 group">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-4">
                  {module.title}
                </h3>
                {module.description && module.description.length > 0 && (
                  <ul className="space-y-2">
                    {module.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2
            className="heading-1 text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}>
            {title}
          </h2>
        </div>
        <div className="space-y-20">
          {items.map((module, index) => {
            if (!module.title) return null;
            const isEven = index % 2 === 0;
            return (
              <div
                key={module._key}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
                  <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-600/30 group">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-6">
                      {module.title}
                    </h3>
                    {module.description && module.description.length > 0 && (
                      <ul className="space-y-3">
                        {module.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span className="text-slate-600 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className={isEven ? "order-2" : "order-2 lg:order-1"}>
                  {module.image ? (
                    <div className="relative rounded-3xl shadow-2xl overflow-hidden">
                      <img
                        src={urlFor(module.image).width(800).height(600).url()}
                        alt={module.title || t("moduleImageAltFallback")}
                        className="w-full h-auto object-cover rounded-3xl"
                      />
                    </div>
                  ) : (
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-16 flex items-center justify-center aspect-video">
                      <p className="text-white/60 text-sm">
                        {t("mockupLabel", { title: module.title })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CsResultsStackedSection({
  title,
  items,
}: {
  title: string;
  items: Array<{ _key: string; title?: string; description?: string }>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-1 text-slate-900 mb-4" style={{ fontFamily: "var(--font-michroma)" }}>
            {title}
          </h2>
        </div>
        <div
          ref={containerRef}
          style={{ minHeight: `${items.length * 120 + 400}px` }}
          className="relative"
        >
          {items.map((item, i) => {
            const targetScale = 1 - (items.length - i) * 0.04;
            const startRange = i * (1 / items.length);
            const cardTop = isMobile ? 120 + i * 16 : 100 + i * 20;
            return (
              <StickyResultCard
                key={item._key || i}
                item={item}
                index={i}
                progress={scrollYProgress}
                range={[startRange, 1]}
                targetScale={targetScale}
                cardTop={cardTop}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CsResultsSection({
  variant = "numbered",
  sectionTitle,
  items = [],
}: CsResultsSectionProps) {
  const t = useTranslations("caseStudyDetail");
  if (!items.length) return null;

  const title = sectionTitle || t("resultsTitle");

  if (variant === "stacked") {
    return <CsResultsStackedSection title={title} items={items} />;
  }

  if (variant === "checklist") {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="heading-1 text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}>
              {title}
            </h2>
          </div>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={item._key || index}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  {item.title && <p className="text-slate-900 font-semibold text-lg">{item.title}</p>}
                  {item.description && <p className="text-slate-600 leading-relaxed mt-0.5">{item.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="heading-1 text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}>
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("resultsDescription")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div key={item._key || index} className="group relative">
              <div
                className="p-[1.5px] rounded-tr-xl rounded-bl-xl bg-gradient-to-br from-blue-600 via-sky-400 to-blue-900"
                style={{
                  clipPath:
                    "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
                }}>
                <div
                  className="h-full w-full rounded-tr-[11px] rounded-bl-[11px] bg-white backdrop-blur-sm border border-white/60 px-8 py-8 flex items-start gap-6"
                  style={{
                    clipPath:
                      "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
                  }}>
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full bg-blue-100 blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-2xl shadow-lg">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flex-1">
                    {item.title && <p className="text-slate-900 font-semibold text-lg mb-1">{item.title}</p>}
                    {item.description && <p className="text-slate-600 leading-relaxed">{item.description}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CsTechnologiesSection({
  variant = "circuit",
  sectionTitle,
  items = [],
}: CsTechnologiesSectionProps) {
  const t = useTranslations("caseStudyDetail");
  if (!items.length) return null;

  const title = sectionTitle || t("technologiesTitle");

  if (variant === "carousel") {
    // Duplicate items so the marquee loops seamlessly
    const doubled = [...items, ...items];
    return (
      <section className="py-24 bg-white overflow-hidden">
        <style>{`
          @keyframes cs-marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2
            className="heading-1 text-slate-900 text-center"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {title}
          </h2>
        </div>
        {/* Track */}
        <div className="relative w-full overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "cs-marquee 28s linear infinite",
            }}
          >
            {doubled.map((tech, index) => (
              <div
                key={index}
                className="mx-4 flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-200 whitespace-nowrap"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                <span className="text-slate-700 font-semibold text-base">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "badges") {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="heading-1 text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}>
              {title}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {items.map((tech, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-blue-50 border border-blue-200 text-blue-700 font-semibold rounded-full text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="heading-1 text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}>
            {title}
          </h2>
        </div>
        <div className="relative w-full mx-auto lg:mb-10 px-4 overflow-visible">
          <div className="relative max-w-6xl mx-auto flex justify-center items-center py-12 overflow-visible">
            <div
              className="relative w-full mx-6 md:mx-16 max-w-5xl min-h-20 py-6 md:h-28 bg-gray-50 border border-gray-100 text-gray-900 flex flex-col md:flex-row items-center justify-around sm:px-12 px-6 md:px-16 drop-shadow-xl z-10 stats-polygon"
              style={{
                filter:
                  "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
              }}>
              <div className="relative w-full md:grid-cols-4 grid grid-cols-2 md:py-4 gap-4 md:gap-8 z-10">
                {items.map((tech, index) => (
                  <span
                    key={index}
                    className="text-slate-700 text-center font-medium text-xl transition-all duration-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="absolute hidden md:block left-0 bottom-0 w-[400px] h-[80px] pointer-events-none z-0"
              style={{ left: "0px", top: "calc(5px)" }}>
              <svg
                className="w-full h-full"
                viewBox="0 0 300 70"
                preserveAspectRatio="none">
                <defs>
                  <linearGradient
                    id="neonGradientCs"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                  <filter
                    id="softNeonCs"
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
                </defs>
                <path
                  d="M10 65 L35 65 L60 20 L300 20 L400 20"
                  fill="none"
                  stroke="url(#neonGradientCs)"
                  strokeWidth="2"
                  filter="url(#softNeonCs)"
                  strokeLinecap="round"
                />
                <rect
                  x="7"
                  y="62"
                  width="6"
                  height="6"
                  fill="#3b82f6"
                  transform="rotate(45 10 65)"
                  filter="url(#softNeonCs)"
                />
              </svg>
            </div>
            <div
              className="absolute hidden md:block w-[400px] h-[80px] pointer-events-none z-0"
              style={{ right: "0px", bottom: "calc(20px)" }}>
              <svg
                className="w-full h-full"
                viewBox="0 0 300 70"
                preserveAspectRatio="none">
                <path
                  d="M10 65 L240 65 L265 20 L290 20 L294 20"
                  fill="none"
                  stroke="url(#neonGradientCs)"
                  strokeWidth="2"
                  filter="url(#softNeonCs)"
                  strokeLinecap="round"
                />
                <rect
                  x="287"
                  y="17"
                  width="6"
                  height="6"
                  fill="#93c5fd"
                  transform="rotate(45 290 20)"
                  filter="url(#softNeonCs)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CsQuoteSection({
  variant = "centered",
  quote,
  author,
}: CsQuoteSectionProps) {
  if (!quote) return null;

  if (variant === "blockquote") {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-blue-600 pl-8">
            <p className="text-2xl text-slate-700 leading-relaxed italic mb-6">
              "{quote}"
            </p>
            {author && (
              <footer className="text-slate-500 font-medium">— {author}</footer>
            )}
          </blockquote>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-3xl md:text-4xl text-slate-700 leading-relaxed italic font-light mb-8">
          "{quote}"
        </p>
        {author && (
          <p className="text-slate-500 font-medium text-lg">— {author}</p>
        )}
      </div>
    </section>
  );
}

function CsScopeSection({
  variant = "list",
  sectionTitle,
  items = [],
  note,
}: CsScopeSectionProps) {
  const t = useTranslations("caseStudyDetail");
  if (!items.length) return null;

  const title = sectionTitle || t("scopeTitle");

  if (variant === "grid") {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="heading-1 text-slate-900"
              style={{ fontFamily: "var(--font-michroma)" }}>
              {title}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {items.map((item, index) => (
              <div
                key={item._key || index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
          {note && (
            <p className="mt-8 text-center text-slate-500 italic max-w-2xl mx-auto">
              {note}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="heading-1 text-slate-900 mb-10"
          style={{ fontFamily: "var(--font-michroma)" }}>
          {title}
        </h2>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={item._key || index}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <span className="text-slate-600 leading-relaxed text-lg">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
        {note && <p className="mt-8 text-slate-500 italic">{note}</p>}
      </div>
    </section>
  );
}

function CsCtaSection({
  variant = "centered",
  heading,
  description,
  buttonLabel,
  buttonHref = "/kontakt",
}: CsCtaSectionProps) {
  const t = useTranslations("caseStudyDetail");
  const label = buttonLabel || t("ctaButton");

  if (variant === "banner") {
    return (
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {heading && (
            <h2
              className="heading-1 text-white mb-6"
              style={{ fontFamily: "var(--font-michroma)" }}>
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              {description}
            </p>
          )}
          <Link href={buttonHref}>
            <StarGradientButton>{label}</StarGradientButton>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {heading && (
          <h2
            className="heading-1 text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-michroma)" }}>
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            {description}
          </p>
        )}
        <Link href={buttonHref}>
          <StarGradientButton>{label}</StarGradientButton>
        </Link>
      </div>
    </section>
  );
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

const sectionComponents: Record<string, React.ComponentType<any>> = {
  csHeroSection: CsHeroSection,
  csStatsSection: CsStatsSection,
  csChallengeSection: CsChallengeSection,
  csModulesSection: CsModulesSection,
  csResultsSection: CsResultsSection,
  csTechnologiesSection: CsTechnologiesSection,
  csQuoteSection: CsQuoteSection,
  csScopeSection: CsScopeSection,
  csCtaSection: CsCtaSection,
};

// ─── Main export ──────────────────────────────────────────────────────────────

export default function CaseStudyDetail({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  return (
    <div className="min-h-screen">
      {caseStudy.sections?.map((section) => {
        const Component = sectionComponents[section._type];
        return Component ? <Component key={section._key} {...section} /> : null;
      })}

      <section className="pb-16 pt-50 border-t border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200 hover:border-blue-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">
              Powrót do wszystkich Case Studies
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
