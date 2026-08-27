"use client";

import { useLocale } from "next-intl";

const CONTENT = {
  pl: {
    eyebrow: "Kim jesteśmy",
    dark: "Budujemy oprogramowanie, które trafia na produkcję.",
    gray: " Doradztwo, product design i development w jednym zespole - ",
    blue: "przewidywalnie, bezpiecznie, z odpowiedzialnością za wynik.",
  },
  en: {
    eyebrow: "Who we are",
    dark: "We build software that ships to production.",
    gray: " Advisory, product design and development in one team - ",
    blue: "predictably, securely, with accountability for the outcome.",
  },
} as const;

export default function ValueStatementSection() {
  const locale = useLocale();
  const t = CONTENT[locale === "en" ? "en" : "pl"];

  return (
    <section className="relative overflow-hidden bg-gray-100 py-[clamp(3.5rem,9vw,8rem)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 mb-8">
          - {t.eyebrow}
        </p>
        <p className="font-extrabold tracking-tight leading-[1.12] text-3xl sm:text-4xl lg:text-5xl text-balance">
          <span className="text-slate-900">{t.dark}</span>
          <span className="text-slate-400">{t.gray}</span>
          <span className="text-blue-600">{t.blue}</span>
        </p>
      </div>
    </section>
  );
}
