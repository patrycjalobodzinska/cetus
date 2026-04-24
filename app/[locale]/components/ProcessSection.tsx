"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import StarGradientButton from "@/app/components/ui/gradientBackground";
import { client } from "@/sanity/lib/client";

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
        className="rounded-2xl shadow-md shadow-blue-300/50 p-0.5 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-400/50 h-full"
      >
        <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {step.stepLabel}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-3 italic">{step.question}</p>
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
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
      <svg viewBox="0 0 64 24" fill="none" className="w-16 h-6" overflow="visible">
        <defs>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="4" y1="12" x2="60" y2="12">
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
        <rect x="2" y="10" width="4" height="4" fill="#3b82f6" transform="rotate(45 4 12)" filter={`url(#${filterId})`} />
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
        <rect x="58" y="10" width="4" height="4" fill="#93c5fd" transform="rotate(45 60 12)" filter={`url(#${filterId})`} />
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
    <div className="hidden lg:block w-full h-14 relative">
      <svg
        viewBox="0 0 1000 56"
        fill="none"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="560" y1="6" x2="500" y2="52">
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
        <rect x="557" y="3" width="6" height="6" fill="#3b82f6" transform="rotate(45 560 6)" filter={`url(#${filterId})`} />
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
        <rect x="497" y="49" width="6" height="6" fill="#93c5fd" transform="rotate(45 500 52)" filter={`url(#${filterId})`} />
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
    <div className="hidden lg:block w-full h-14 relative">
      <svg
        viewBox="0 0 1000 56"
        fill="none"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="500" y1="6" x2="440" y2="52">
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
        <rect x="497" y="3" width="6" height="6" fill="#3b82f6" transform="rotate(45 500 6)" filter={`url(#${filterId})`} />
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
        <rect x="437" y="49" width="6" height="6" fill="#93c5fd" transform="rotate(45 440 52)" filter={`url(#${filterId})`} />
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
          { locale }
        );
        if (result?.steps?.length) setData(result);
      } catch {
        // silently fall back to i18n data
      }
    }
    fetchData();
  }, [locale]);

  const fallbackKeys = ["audit", "roadmap", "management", "acceptance", "maintenance"];
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
    <section className="md:py-24 py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <h2
            className="heading-1 text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {sectionTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {sectionDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/kontakt`}>
              <StarGradientButton>{t("cta.designIdea")}</StarGradientButton>
            </Link>
          </div>
        </div>

        {/* Steps — układ 2-1-2 */}
        <div className="flex flex-col items-center gap-6 lg:gap-0">

          {/* Wiersz 1: 2 karty */}
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 w-full max-w-4xl">
            <div className="flex-1">
              <StepCard step={steps[0]} />
            </div>
            <HorizontalArc id="arcH1" />
            <div className="flex-1">
              <StepCard step={steps[1]} />
            </div>
          </div>

          {/* Łuk: wiersz 1 → wiersz 2 */}
          <ArcDownToCenter id="arcD1" />

          {/* Wiersz 2: 1 karta na środku */}
          <div className="w-full max-w-sm">
            <StepCard step={steps[2]} />
          </div>

          {/* Łuk: wiersz 2 → wiersz 3 */}
          <ArcDownFromCenter id="arcD2" />

          {/* Wiersz 3: 2 karty */}
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 w-full max-w-4xl">
            <div className="flex-1">
              <StepCard step={steps[3]} />
            </div>
            <HorizontalArc id="arcH3" />
            <div className="flex-1">
              <StepCard step={steps[4]} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
