"use client";

import { useLocale } from "next-intl";

const CONTENT = {
  pl: {
    eyebrow: "Branże",
    title: "Rozumiemy",
    titleHighlight: "Wasz sektor",
    description:
      "Realizujemy projekty w regulowanych i wymagających środowiskach.",
    items: [
      "Finanse i fintech",
      "Produkcja",
      "Logistyka",
      "Energetyka",
      "Retail / e-commerce",
      "Sektor publiczny",
      "Healthtech",
    ],
  },
  en: {
    eyebrow: "Industries",
    title: "We understand",
    titleHighlight: "your sector",
    description:
      "We deliver projects in regulated and demanding environments.",
    items: [
      "Finance & fintech",
      "Manufacturing",
      "Logistics",
      "Energy",
      "Retail / e-commerce",
      "Public sector",
      "Healthtech",
    ],
  },
} as const;

export default function IndustriesSection() {
  const locale = useLocale();
  const t = CONTENT[locale === "en" ? "en" : "pl"];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
          {t.eyebrow}
        </p>
        <h2
          className="heading-1 text-gray-900 mb-4 leading-tight"
          style={{ fontFamily: "var(--font-michroma)" }}
        >
          {t.title} <span className="text-blue-600">{t.titleHighlight}</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">{t.description}</p>

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {t.items.map((item, i) => (
            <span
              key={i}
              className="bg-white border border-gray-200 rounded-full px-5 py-2.5 font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
