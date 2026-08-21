"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

const CONTENT = {
  pl: {
    eyebrow: "Realizacja · IoT + Software",
    title: "Od pomysłu do urządzenia",
    titleHighlight: "w produkcji",
    description:
      "Kompletny produkt: elektronika, firmware, aplikacja i backend - zaprojektowane, zbudowane i utrzymywane przez jeden zespół.",
    stats: [
      { n: "1 zespół", l: "hardware → software" },
      { n: "0 → MVP", l: "jeden cykl" },
      { n: "produkcja", l: "gotowe na skalę" },
    ],
    chips: ["Embedded / IoT", "Cloud backend", "Aplikacja mobilna", "UX/UI"],
  },
  en: {
    eyebrow: "Case study · IoT + Software",
    title: "From idea to a device",
    titleHighlight: "in production",
    description:
      "A complete product: electronics, firmware, app and backend - designed, built and maintained by one team.",
    stats: [
      { n: "1 team", l: "hardware → software" },
      { n: "0 → MVP", l: "one cycle" },
      { n: "production", l: "ready to scale" },
    ],
    chips: ["Embedded / IoT", "Cloud backend", "Mobile app", "UX/UI"],
  },
} as const;

export default function CaseFeatureSection() {
  const locale = useLocale();
  const t = CONTENT[locale === "en" ? "en" : "pl"];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Wizual produktu */}
          <div className="relative rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-blue-50 p-8 lg:p-12 flex justify-center">
            <div
              aria-hidden="true"
              className="absolute w-1/2 h-1/2 left-1/4 top-1/4 bg-blue-500/20 blur-3xl rounded-full"
            />
            <Image
              src="/new_hero.png"
              alt="Beer-o-Meter - urządzenie IoT zaprojektowane i wdrożone przez CetusPro"
              width={520}
              height={520}
              className="relative z-10 w-auto max-h-[340px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Treść */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
              {t.eyebrow}
            </p>
            <h2
              className="heading-1 text-gray-900 mb-4 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              {t.title} <span className="text-blue-600">{t.titleHighlight}</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
              {t.description}
            </p>

            <div className="flex flex-wrap gap-8 mt-8">
              {t.stats.map((s, i) => (
                <div key={i}>
                  <div
                    className="text-2xl text-blue-600"
                    style={{ fontFamily: "var(--font-michroma)" }}
                  >
                    {s.n}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {t.chips.map((c, i) => (
                <span
                  key={i}
                  className="text-sm text-slate-600 border border-gray-200 rounded-full px-4 py-1.5 bg-white"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
