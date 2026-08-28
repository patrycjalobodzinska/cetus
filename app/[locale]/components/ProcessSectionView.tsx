"use client";

import { useTranslations } from "next-intl";
import Slider from "../../components/Slider";
import { useReveal } from "../../components/useReveal";

export interface ProcessStep {
  _key: string;
  stepLabel: string;
  title: string;
  description: string;
}

export interface ProcessData {
  title: string;
  description: string;
  steps: ProcessStep[];
}

const RISE = 30; // przyrost wysokości karty na każdy krok (px)

// ─── Warstwa graficzna ────────────────────────────────────────────────────────

// Tło sekcji - siatka kropek + dwie miękkie poświaty. Czysta dekoracja.
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="pv-dots absolute inset-0" />
      <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-sky-400/[0.08] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
    </div>
  );
}

// ─── Reveal ───────────────────────────────────────────────────────────────────


// ─── Karta kroku ──────────────────────────────────────────────────────────────

function StepBody({ step, delay = 0 }: { step: ProcessStep; delay?: number }) {
  return (
    // Na desktopie min-height trzyma treść wszystkich kart na jednej
    // wysokości, mimo że same karty rosną schodkowo.
    <div
      className="pv-fade relative lg:min-h-[11.5rem]"
      style={{ ["--d" as string]: `${delay}ms` }}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
        {step.stepLabel}
      </p>
      <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-slate-900">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
    </div>
  );
}

// ─── Sekcja ───────────────────────────────────────────────────────────────────

/**
 * Warstwa widoku - dane przychodzą gotowe z serwera (patrz ProcessSection.tsx).
 * Klientem jest tylko przez animację wejścia i slider na mobile.
 */
export default function ProcessSectionView({ data }: { data: ProcessData | null }) {
  const t = useTranslations("home.process");
  // Odsłonięcie dopiero, gdy schody są realnie w kadrze - przy wcześniejszym
  // progu animacja kończyła się, zanim sekcja doszła do środka ekranu.
  const { ref, seen } = useReveal<HTMLDivElement>();

  const fallbackKeys = ["audit", "roadmap", "management", "acceptance", "maintenance"];
  const steps: ProcessStep[] = data?.steps?.length
    ? data.steps
    : fallbackKeys.map((key) => ({
        _key: key,
        stepLabel: t(`steps.${key}.stepLabel`),
        title: t(`steps.${key}.title`),
        description: t(`steps.${key}.description`),
      }));

  const sectionTitle = data?.title ?? t("title");
  const sectionDesc = data?.description ?? t("description");
  const count = steps.length;

  return (
    // Full-bleed: tło wychodzi poza max-w kontenera strony, treść zostaje w siatce.
    <section className="section-y relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
      <Backdrop />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative text-center">
          {/* znak wodny - liczba kroków za nagłówkiem */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none text-[9rem] leading-none text-slate-900/[0.035]"
            style={{ fontFamily: "var(--font-michroma)" }}>
            {String(count).padStart(2, "0")}
          </span>

          <h2
            className="section-title relative mb-4 text-slate-900">
            {sectionTitle}
          </h2>
          <p className="relative mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            {sectionDesc}
          </p>
        </div>

        <div ref={ref} className={`mt-20 ${seen ? "pv-in" : ""}`}>
          {/* Schody - desktop: karty na wspólnej podstawie, rosnąca wysokość */}
          <div className="relative hidden lg:block">
            <ol className="relative flex items-end gap-3">
              {steps.map((step, i) => {
                const progress = ((i + 1) / count) * 100;
                return (
                  <li
                    key={step._key}
                    className="relative flex-1">
                    {/* pionowy stopień - łączy górę tej karty z górą następnej */}
                    {i < count - 1 && (
                      <span
                        aria-hidden="true"
                        className="pv-tick absolute -right-1.5 w-px border-l border-dashed border-blue-300/70"
                        style={{ top: -RISE, height: RISE, ["--d" as string]: `${380 + i * 70}ms` }}
                      />
                    )}

                    <article
                      className="pv-grow pv-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 pb-7 pt-7 shadow-sm"
                      style={{ ["--d" as string]: `${i * 70}ms` }}>
                      {/* pasek postępu - narasta z każdym krokiem */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-[3px] w-full bg-slate-100">
                        <span
                          className="block h-full bg-gradient-to-r from-blue-600 to-sky-400"
                          style={{
                            width: `${progress}%`,
                            transform: seen ? "scaleX(1)" : "scaleX(0)",
                            transformOrigin: "left center",
                            transition: "transform 420ms var(--ease-out)",
                            transitionDelay: `${400 + i * 110}ms`,
                          }}
                        />
                      </span>

                      {/* tekstura + poświata hoveru + numer w tle */}
                      <span
                        aria-hidden="true"
                        className="pv-dots pointer-events-none absolute inset-0 opacity-70"
                      />
                      <span
                        aria-hidden="true"
                        className="pv-card-num pointer-events-none absolute -bottom-3 right-3 text-6xl text-slate-900/[0.055]"
                        style={{ fontFamily: "var(--font-michroma)" }}>
                        {i + 1}
                      </span>

                      {/* stopień - to on nadaje karcie schodkową wysokość */}
                      <span aria-hidden="true" className="shrink-0" style={{ height: i * RISE }} />

                      <StepBody step={step} delay={i * 70 + 260} />
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Tablet - te same karty w siatce */}
          <ol className="hidden gap-4 sm:grid sm:grid-cols-2 lg:hidden">
            {steps.map((step, i) => (
              <li key={step._key} className="relative">
                <StepCard step={step} index={i} count={count} delay={i * 70} />
              </li>
            ))}
          </ol>

          {/* Mobile - slider */}
          <Slider className="sm:hidden" slideWidth="80%" ariaLabel="Kroki procesu">
            {steps.map((step, i) => (
              <StepCard key={step._key} step={step} index={i} count={count} delay={i * 70} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

// Karta w wersji kompaktowej (tablet / mobile) - bez narastającej wysokości.
function StepCard({
  step,
  index,
  count,
  delay = 0,
}: {
  step: ProcessStep;
  index: number;
  count: number;
  delay?: number;
}) {
  const progress = ((index + 1) / count) * 100;
  return (
    <article
      className="pv-grow pv-card relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 pb-6 pt-7 shadow-sm"
      style={{ ["--d" as string]: `${delay}ms` }}>
      <span aria-hidden="true" className="absolute left-0 top-0 h-[3px] w-full bg-slate-100">
        <span
          className="block h-full bg-gradient-to-r from-blue-600 to-sky-400"
          style={{ width: `${progress}%` }}
        />
      </span>
      <span
        aria-hidden="true"
        className="pv-card-num pointer-events-none absolute -bottom-3 right-3 text-5xl text-slate-900/[0.055]"
        style={{ fontFamily: "var(--font-michroma)" }}>
        {index + 1}
      </span>
      <StepBody step={step} delay={delay + 260} />
    </article>
  );
}
