"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PaintReveal from "./PaintReveal";

export default function HeroCurosora() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-white">
      {/* ── Tło: poświaty ───────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute top-1/4 -right-24 h-[34rem] w-[34rem] rounded-full bg-sky-300/20 blur-3xl" />
      </div>

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
        <div className="w-full flex-1 bg-gray-100" />
      </div>

      <div className="relative mx-auto flex min-h-[min(100vh,1000px)] w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8 pt-[var(--page-top-offset)] pb-16 lg:pb-24">
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Tekst */}
          <div className="relative z-30 order-1 flex flex-col items-start text-left lg:col-start-1 lg:row-start-1">
            <h1
              className="tracking-tight text-slate-900 text-3xl sm:text-4xl lg:text-[3.4rem] leading-[1.15]"
              style={{ fontFamily: "var(--font-michroma)" }}>
              <span className="block">{t("title")}</span>
              <span className="block">
                <span className="font-extrabold text-blue-600">{t("titleHighlight")}</span>{" "}
                {t("titleAfterHighlight")}
              </span>
              <span className="block">{t("titleThirdLine")}</span>
            </h1>

            {t("subtitle") && (
              <p className="mt-6 max-w-md text-base sm:text-lg text-slate-600 leading-relaxed">
                {t("subtitle")}
              </p>
            )}

            {t("buttonText") && (
              <Link
                href={`/${locale}/kontakt`}
                className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-blue-600 pl-7 pr-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700">
                {t("buttonText")}
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Ilustracja (szkic → malowanie) */}
          <div className="relative order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-w-0 lg:overflow-visible">
            <div className="relative z-10 -mx-4 sm:mx-0 lg:w-[min(72vh,52rem)] lg:min-w-[34rem]">
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
                alt="Norbert - CetusPro"
                aspect="1 / 1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
