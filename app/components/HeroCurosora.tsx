"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import StarGradientButton from "./ui/gradientBackground";

export default function HeroCurosora() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative lg:pb-4 overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
      {/* ── Tło: zdjęcie po prawej, rozmycie + fade rozpływające się w lewo ── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
        {/* baza w kolorze tła sekcji (pod zdjęciem) */}
        <div className="absolute inset-0 bg-gray-100" />
        {/* zdjęcie – pełna szerokość, bez twardej krawędzi (fade rozpuszcza lewą część) */}
        <div className="absolute inset-0">
          <Image
            src="/career_2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_40%]"
          />
        </div>
        {/* warstwa rozmycia – najmocniej przy lewej stronie */}
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg,#000 0%,#000 16%,rgba(0,0,0,.78) 34%,rgba(0,0,0,.45) 52%,rgba(0,0,0,.18) 70%,transparent 88%)",
            maskImage:
              "linear-gradient(90deg,#000 0%,#000 16%,rgba(0,0,0,.78) 34%,rgba(0,0,0,.45) 52%,rgba(0,0,0,.18) 70%,transparent 88%)",
          }}
        />
        {/* rozmycie od dołu – najmocniej przy dolnej krawędzi */}
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            WebkitMaskImage:
              "linear-gradient(0deg,#000 0%,rgba(0,0,0,.6) 18%,transparent 42%)",
            maskImage:
              "linear-gradient(0deg,#000 0%,rgba(0,0,0,.6) 18%,transparent 42%)",
          }}
        />
        {/* fade w kolorze tła (gray-100) – wygładza WSZYSTKIE krawędzie zdjęcia */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,#f3f4f6 0%,#f3f4f6 28%,rgba(243,244,246,.70) 46%,rgba(243,244,246,.20) 70%,rgba(243,244,246,0) 90%)," +
              "linear-gradient(270deg,#f3f4f6 0%,rgba(243,244,246,0) 14%)," +
              "linear-gradient(180deg,#f3f4f6 0%,rgba(243,244,246,0) 16%)," +
              "linear-gradient(0deg,#f3f4f6 0%,rgba(243,244,246,0) 22%)",
          }}
        />
        {/* mocniejszy welon na mobile dla czytelności */}
        <div className="absolute inset-0 bg-gray-100/70 lg:hidden" />
      </div>

      <div className="pt-[var(--page-top-offset)] w-full container mx-auto lg:pb-6 flex flex-col relative overflow-x-hidden">
        <div className="flex flex-col z-30 lg:pt-4 xl:pt-0 items-start justify-center relative px-4 lg:pl-10 lg:pr-0 max-w-2xl">
          <div className="relative">
            <h1
              className="heading-hero text-left tracking-tighter text-slate-900"
              style={{ fontFamily: "var(--font-michroma)" }}>
              <span className="block">{t("title")}</span>
              <span className="block">
                <span className="text-blue-600">{t("titleHighlight")}</span>{" "}
                {t("titleAfterHighlight")}
              </span>
              <span className="block">{t("titleThirdLine")}</span>
            </h1>
          </div>

          <div className="text-left space-y-2 flex flex-col max-w-lg relative w-full mt-5 mb-4">
            {t("subtitle") && (
              <h2 className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                {t("subtitle")}
              </h2>
            )}
            {t("description") && (
              <p className="text-slate-500">{t("description")}</p>
            )}
            {t("buttonText") && (
              <div className="pt-2">
                <StarGradientButton>
                  <Link href={`/${locale}/kontakt`}>{t("buttonText")}</Link>
                </StarGradientButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
