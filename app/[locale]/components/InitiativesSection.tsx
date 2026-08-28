import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

/**
 * „Nasze inicjatywy" - trzy programy prowadzone przez CETUSPRO poza pracą
 * dla klientów. Treść siedzi w tłumaczeniach (home.initiatives), bo to
 * stabilny fragment strony, a nie coś, co redakcja zmienia co tydzień.
 *
 * Każda karta prowadzi tam, gdzie jest treść: hackathon na stronę wydarzenia,
 * Academy na podstronę z praktykami, Elevate na stronę programu.
 *
 * `darkLogo` dostaje znak, w którym część liter jest biała - na białej karcie
 * byłyby niewidoczne, więc takie logo kładziemy na ciemnym kaflu (tak samo
 * rozwiązuje to LogoWall w sekcji „Zaufali nam").
 */
const ITEMS = [
  {
    key: "vibe",
    logo: "/initiatives/vibe-the-future.png",
    darkLogo: true,
    href: "https://vibethelimit.pl/",
    external: true,
  },
  {
    key: "academy",
    logo: "/initiatives/cetuspro.png",
    darkLogo: false,
    href: "/oferta/akademia-i-szkolenia",
    external: false,
  },
  {
    key: "elevate",
    logo: "/initiatives/cetus-elevate.png",
    darkLogo: false,
    href: "https://elevate.cetuspro.com/",
    external: true,
  },
] as const;

export default async function InitiativesSection() {
  const locale = await getLocale();
  const t = await getTranslations("home.initiatives");

  return (
    <section className="section-y relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            - {t("eyebrow")}
          </p>
          <h2 className="section-title mx-auto max-w-4xl text-slate-900">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 text-pretty">
            {t("lead")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {ITEMS.map(({ key, logo, darkLogo, href, external }) => {
            const name = t(`items.${key}.name`);
            const description = t(`items.${key}.description`);
            const linkText = t(`items.${key}.linkText`);

            const body = (
              <>
                {/* Stała wysokość bloku z logo, żeby nagłówki wszystkich
                    trzech kart stały w jednej linii niezależnie od proporcji
                    znaku. Nazwa programu jest w nagłówku pod logo, więc znak
                    jest dekoracją - czytnik ekranu nie czyta jej dwa razy. */}
                <span
                  className={
                    darkLogo
                      ? "flex h-14 items-center self-start rounded-xl bg-slate-900 px-3"
                      : "flex h-14 items-center"
                  }
                >
                  <Image
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    width={600}
                    height={313}
                    className={darkLogo ? "h-9 w-auto" : "h-8 w-auto"}
                  />
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{name}</h3>
                <p className="mt-3 grow text-sm leading-relaxed text-slate-600">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors duration-150 ease-out group-hover:text-blue-600">
                  {linkText}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </>
            );

            // Ten sam wygląd karty dla linku wewnętrznego i zewnętrznego -
            // różni je tylko element (`Link` vs `a`) i atrybuty bezpieczeństwa.
            const cardClass =
              "group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-[translate,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

            return external ? (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {body}
              </a>
            ) : (
              <Link key={key} href={`/${locale}${href}`} className={cardClass}>
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
