"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import PaintReveal from "./PaintReveal";

export default function HeroCurosora() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-surface-muted">
      {/* ── Fala (grzbiet stały wzgl. zdjęcia + wypełnienie rosnące w dół) ── */}
      <div
        aria-hidden="true"
        className="hidden pointer-events-none absolute inset-x-0 bottom-0 z-20 flex-col top-[20rem] sm:top-[24rem] lg:top-[30rem]">
        {/* grzbiet – stała wysokość, bez rozciągania */}
        <svg
          className="h-16 w-full shrink-0 sm:h-24 lg:h-32"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none">
          <path
            transform="scale(-1,1) translate(-1440,0)"
            d="M0 60 C 160 40, 260 82, 440 70 S 640 44, 820 56 S 1020 78, 1180 44 S 1340 18, 1440 12 L1440 120 L0 120 Z"
            fill="#f3f4f6"
          />
        </svg>
        {/* wypełnienie – rośnie w dół przy wyższym ekranie */}
        <div className="w-full flex-1 bg-surface-muted" />
      </div>

      <div className="relative mx-auto flex min-h-[min(100vh,1000px)] w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8 pt-[var(--page-top-offset)] pb-8 sm:pb-12 lg:pb-24">
        {/* poświaty - trzymają się treści (nie uciekają na bok na szerokim ekranie) */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-10 z-0 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/3 z-0 h-[30rem] w-[30rem] rounded-full bg-sky-300/20 blur-3xl" />
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Tekst */}
          <div className="relative z-30 order-1 flex flex-col items-start justify-center text-left lg:col-start-1 lg:-mt-10">
            <h1
              className="font-bold tracking-tight text-slate-900 text-4xl sm:text-6xl lg:text-[5rem] leading-[1.05]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}>
              <span className="block">{t("title")}</span>
              <span className="block">
                <span className="text-blue-600">{t("titleHighlight")}</span>{" "}
                {t("titleAfterHighlight")}
              </span>
              <span className="block">{t("titleThirdLine")}</span>
            </h1>

            {t("buttonText") && (
              <Link
                href={`/${locale}/kontakt`}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                className="mt-10 inline-flex items-center rounded-2xl bg-blue-600 px-9 py-4 text-lg font-semibold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
              >
                {t("buttonText")}
              </Link>
            )}
          </div>

          {/* Ilustracja (szkic → malowanie) */}
          <div className="relative order-2 lg:col-start-2 lg:min-w-0 lg:overflow-visible">
            <div className="relative z-10 -mx-4 sm:mx-0 lg:w-[min(80vh,58rem)] lg:min-w-[38rem]">
              {/* kropelki farby po bokach – subtelne */}
              <span className="pointer-events-none absolute left-[4%] top-[28%] z-10 h-2.5 w-2.5 rounded-full bg-blue-400/40 blur-[1px]" />
              <span className="pointer-events-none absolute left-[9%] top-[52%] z-10 h-1.5 w-1.5 rounded-full bg-sky-400/40 blur-[1px]" />
              <span className="pointer-events-none absolute left-[2%] top-[64%] z-10 h-1 w-1 rounded-full bg-blue-300/50 blur-[0.5px]" />
              <span className="pointer-events-none absolute right-[5%] top-[20%] z-10 h-2 w-2 rounded-full bg-blue-400/40 blur-[1px]" />
              <span className="pointer-events-none absolute right-[10%] top-[58%] z-10 h-1.5 w-1.5 rounded-full bg-sky-400/40 blur-[1px]" />
              <span className="pointer-events-none absolute right-[3%] top-[74%] z-10 h-1 w-1 rounded-full bg-blue-300/50 blur-[0.5px]" />

              <PaintReveal
                sketchSrc="/Norbert2.png"
                paintedSrc="/Norbert3.png"
                alt="Norbert - CETUSPRO"
                aspect="1 / 1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
