"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import StatsPanel from "./StatsPanel";
import StarGradientButton from "./ui/gradientBackground";

export default function HeroCurosora() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const subtitleParts =
    t("subtitle") && t("subtitleHighlight")
      ? t("subtitle").split(t("subtitleHighlight"))
      : [];

  return (
    <section className="relative lg:pb-20 overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
      <div className="pt-[var(--page-top-offset)] w-full justify-center container mx-auto lg:pb-6 flex flex-col lg:flex-row items-center relative overflow-x-hidden">
        <div className="flex flex-col z-30 lg:pt-4 xl:pt-0 items-center justify-center relative px-4 lg:pl-10 lg:pr-0">
          <div className="relative lg:min-h-[200px] xl:min-h-[230px]">
            <h1
              className="heading-hero text-center tracking-tighter text-slate-900"
              style={{ fontFamily: "var(--font-michroma)" }}>
              <div className="flex items-center justify-center  min-h-[1.2em]">
                <span>{t("title")}</span>
              </div>
              <span className="md:block text-slate-900 text-center">
                <span>
                  <span className="text-blue-600">{t("titleHighlight")}</span>{" "}
                  {t("titleAfterHighlight")}{" "}
                </span>
              </span>
              <span className="md:block text-slate-900 min-h-[1.2em] text-center">
                <span>{t("titleThirdLine")}</span>
              </span>
            </h1>
          </div>

          <div className="text-center space-y-2 items-center justify-center flex flex-col max-w-lg relative w-full px-4 mt-1 mb-4">
            {(t("subtitle") || t("subtitleHighlight")) && (
              <h2 className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                {t("subtitleHighlight") && (
                  <span className="font-bold text-blue-600">
                    {t("subtitleHighlight")}
                  </span>
                )}
                {t("subtitle") && (
                  <>
                    {t("subtitleHighlight") && <br />}
                    {subtitleParts[1]?.trim() || t("subtitle")}
                  </>
                )}
              </h2>
            )}
            {t("description") && (
              <p className="text-slate-600">{t("description")}</p>
            )}
            {t("buttonText") && (
              <StarGradientButton>
                <Link href={`/${locale}/kontakt`}>{t("buttonText")}</Link>
              </StarGradientButton>
            )}
          </div>
        </div>
      </div>

      <StatsPanel />
    </section>
  );
}
