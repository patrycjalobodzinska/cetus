"use client";

import { useLocale } from "next-intl";

const CONTENT = {
  pl: {
    eyebrow: "Zaufanie i współpraca",
    title: "Odpowiedź na pierwsze pytania",
    titleHighlight: "CTO i CFO",
    description:
      "Przewidywalność, zgodność i jasne zasady współpracy - zanim padnie pierwsze pytanie.",
    badges: [
      "Bezpieczeństwo (ISO 27001)*",
      "Zgodność RODO / DPA",
      "NDA i ochrona IP",
      "Polityka jakości",
      "SLA i utrzymanie",
    ],
    models: [
      {
        h: "Fixed Price",
        p: "Dla jasno zdefiniowanego zakresu - stały budżet i harmonogram.",
      },
      {
        h: "Time & Material",
        p: "Elastyczny rozwój przy zmiennym zakresie i priorytetach.",
      },
      {
        h: "Team as a Service",
        p: "Dedykowany zespół wpięty w Wasz proces, z governance i raportowaniem.",
      },
    ],
    note: "* w zależności od zakresu - do potwierdzenia posiadanych certyfikatów.",
  },
  en: {
    eyebrow: "Trust & collaboration",
    title: "Answers to the first questions from",
    titleHighlight: "CTOs and CFOs",
    description:
      "Predictability, compliance and clear rules of engagement - before the first question is asked.",
    badges: [
      "Security (ISO 27001)*",
      "GDPR / DPA compliance",
      "NDA & IP protection",
      "Quality policy",
      "SLA & maintenance",
    ],
    models: [
      {
        h: "Fixed Price",
        p: "For a well-defined scope - fixed budget and timeline.",
      },
      {
        h: "Time & Material",
        p: "Flexible development with changing scope and priorities.",
      },
      {
        h: "Team as a Service",
        p: "A dedicated team embedded in your process, with governance and reporting.",
      },
    ],
    note: "* depending on scope - actual certifications to be confirmed.",
  },
} as const;

const CARD_GRADIENT =
  "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)";

export default function TrustSecuritySection() {
  const locale = useLocale();
  const t = CONTENT[locale === "en" ? "en" : "pl"];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
            {t.eyebrow}
          </p>
          <h2
            className="section-title text-gray-900 mb-4"
          >
            {t.title} <span className="text-blue-600">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{t.description}</p>
        </div>

        {/* Odznaki zaufania */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {t.badges.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-4 py-3 font-semibold text-slate-700 text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              {b}
            </div>
          ))}
        </div>

        {/* Modele współpracy – karty z gradientową ramką (spójne z ProcessSection) */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.models.map((m, i) => (
            <div
              key={i}
              style={{ background: CARD_GRADIENT }}
              className="rounded-2xl shadow-md shadow-blue-300/50 p-0.5"
            >
              <div className="bg-white rounded-2xl p-6 h-full">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{m.h}</h3>
                <p className="text-slate-600 leading-relaxed">{m.p}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-center mt-8">{t.note}</p>
      </div>
    </section>
  );
}
