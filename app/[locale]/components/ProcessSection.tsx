"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { client } from "@/sanity/lib/client";
// Animowany SVG - pulsujący sygnał (rozchodzące się kółko + kropka)
function PulseDot({ dark = false }: { dark?: boolean }) {
  const c = dark ? "#60a5fa" : "#2563eb";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="overflow-visible" aria-hidden="true">
      <circle cx="8" cy="8" r="3.5" fill={c} />
      <circle cx="8" cy="8" r="3.5" fill="none" stroke={c} strokeWidth="1.5">
        <animate attributeName="r" values="3.5;10" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// Karta kroku procesu (styl jak w referencji, karta 03 ciemna)
function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  const isDark = index === 2;
  return (
    <article
      className={`group rounded-2xl border p-6 flex flex-col h-full transition-all duration-300 ${
        isDark
          ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20"
          : "bg-white border-gray-200 text-slate-900 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-mono uppercase tracking-widest ${
            isDark ? "text-white/55" : "text-slate-400"
          }`}
        >
          {step.stepLabel}
        </span>
        <PulseDot dark={isDark} />
      </div>
      {step.question && (
        <p className={`text-sm italic mb-3 ${isDark ? "text-white/60" : "text-slate-500"}`}>
          {step.question}
        </p>
      )}
      <h3
        className={`text-lg font-bold leading-snug tracking-tight mb-3 hyphens-auto ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {step.title}
      </h3>
      <p className={`text-sm leading-relaxed ${isDark ? "text-white/80" : "text-slate-600"}`}>
        {step.description}
      </p>
    </article>
  );
}

interface ProcessStep {
  _key: string;
  stepLabel: string;
  question: string;
  title: string;
  description: string;
}

interface ProcessData {
  title: string;
  description: string;
  steps: ProcessStep[];
}

const CARD_GRADIENT =
  "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)";

function StepCard({ step }: { step: ProcessStep }) {
  return (
    <div className="group h-full">
      <div
        style={{ background: CARD_GRADIENT }}
        className="rounded-2xl shadow-md shadow-blue-300/50 p-0.5 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-400/50 h-full">
        <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {step.stepLabel}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-1 italic">{step.question}</p>
          <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
            {step.title}
          </h3>
          <p className="text-slate-600 leading-relaxed flex-1">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Linia pozioma między kartami w tym samym wierszu
// Kształt: skos w prawo → prosta → skos w dół (jak w Offer/StatsPanel)
function HorizontalArc({ id }: { id: string }) {
  const gradId = `grad-${id}`;
  const filterId = `neon-${id}`;
  return (
    <div className="hidden lg:flex items-center justify-center w-16 flex-shrink-0">
      <svg
        viewBox="0 0 64 24"
        fill="none"
        className="w-16 h-6"
        overflow="visible">
        <defs>
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1="4"
            y1="12"
            x2="60"
            y2="12">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <filter id={filterId} x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* diament start */}
        <rect
          x="2"
          y="10"
          width="4"
          height="4"
          fill="#3b82f6"
          transform="rotate(45 4 12)"
          filter={`url(#${filterId})`}
        />
        {/* skos w prawo → prosta → skos w dół */}
        <path
          d="M 4 12 L 16 4 L 48 4 L 60 12"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
        />
        {/* diament koniec */}
        <rect
          x="58"
          y="10"
          width="4"
          height="4"
          fill="#93c5fd"
          transform="rotate(45 60 12)"
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  );
}

// Linia kątowa: wiersz 1 (prawa karta) → wiersz 2 (środek)
// Kształt: skos w prawo → prosta → skos w dół (jak Offer.tsx)
function ArcDownToCenter({ id }: { id: string }) {
  const gradId = `grad-${id}`;
  const filterId = `neon-${id}`;
  return (
    <div className="hidden lg:block w-full h-8 relative">
      <svg
        viewBox="0 0 1000 56"
        fill="none"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none">
        <defs>
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1="560"
            y1="6"
            x2="500"
            y2="52">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* diament start */}
        <rect
          x="557"
          y="3"
          width="6"
          height="6"
          fill="#3b82f6"
          transform="rotate(45 560 6)"
          filter={`url(#${filterId})`}
        />
        {/* skos w prawo → prosta → skos w dół */}
        <path
          d="M 560 6 L 540 20 L 520 20 L 500 52"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
          vectorEffect="non-scaling-stroke"
        />
        {/* diament koniec */}
        <rect
          x="497"
          y="49"
          width="6"
          height="6"
          fill="#93c5fd"
          transform="rotate(45 500 52)"
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  );
}

// Linia kątowa: wiersz 2 (środek) → wiersz 3 (lewa karta)
// Kształt: skos w prawo → prosta → skos w dół (jak Offer.tsx)
function ArcDownFromCenter({ id }: { id: string }) {
  const gradId = `grad-${id}`;
  const filterId = `neon-${id}`;
  return (
    <div className="hidden lg:block w-full h-8 relative">
      <svg
        viewBox="0 0 1000 56"
        fill="none"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none">
        <defs>
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1="500"
            y1="6"
            x2="440"
            y2="52">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* diament start */}
        <rect
          x="497"
          y="3"
          width="6"
          height="6"
          fill="#3b82f6"
          transform="rotate(45 500 6)"
          filter={`url(#${filterId})`}
        />
        {/* skos w prawo → prosta → skos w dół */}
        <path
          d="M 500 6 L 480 20 L 460 20 L 440 52"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
          vectorEffect="non-scaling-stroke"
        />
        {/* diament koniec */}
        <rect
          x="437"
          y="49"
          width="6"
          height="6"
          fill="#93c5fd"
          transform="rotate(45 440 52)"
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  );
}

export default function ProcessSection() {
  const t = useTranslations("home.process");
  const locale = useLocale();
  const [data, setData] = useState<ProcessData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch<ProcessData>(
          `*[_type == "processSection"][0] {
            "title": coalesce(title[$locale], title.pl),
            "description": coalesce(description[$locale], description.pl),
            "steps": steps[] {
              _key,
              "stepLabel": coalesce(stepLabel[$locale], stepLabel.pl),
              "question":  coalesce(question[$locale],  question.pl),
              "title":     coalesce(title[$locale],     title.pl),
              "description": coalesce(description[$locale], description.pl)
            }
          }`,
          { locale },
        );
        if (result?.steps?.length) setData(result);
      } catch {
        // silently fall back to i18n data
      }
    }
    fetchData();
  }, [locale]);

  const fallbackKeys = [
    "audit",
    "roadmap",
    "management",
    "acceptance",
    "maintenance",
  ];
  const steps: ProcessStep[] = data?.steps?.length
    ? data.steps
    : fallbackKeys.map((key) => ({
        _key: key,
        stepLabel: t(`steps.${key}.stepLabel`),
        question: t(`steps.${key}.question`),
        title: t(`steps.${key}.title`),
        description: t(`steps.${key}.description`),
      }));

  const sectionTitle = data?.title ?? t("title");
  const sectionDesc = data?.description ?? t("description");

  return (
    <section className="py-10 lg:py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">
            - Proces
          </p>
          <h2
            className="heading-1 text-slate-900 mb-4 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}>
            {sectionTitle}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {sectionDesc}
          </p>
        </div>

        {/* Karty kroków */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <ProcessCard key={step._key} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
