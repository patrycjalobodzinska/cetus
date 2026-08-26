"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export interface MosaicCase {
  id: string;
  title: string;
  category: string;
  description: string;
  slug: string;
  image: string | null;
}

// Ile kafli pokazujemy w sekcji.
const VISIBLE = 6;

// Powyżej tego progu dolny rząd jest wygaszany i pojawia się „Zobacz więcej”.
const FADE_AFTER = 4;

// Jednorazowy reveal - ten sam próg co w sekcji Proces, żeby animacja
// rozgrywała się na środku ekranu, a nie tuż nad jego krawędzią.
function useInView<T extends HTMLElement>(rootMargin = "0px 0px -42% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.58 && rect.bottom > 0) {
      setSeen(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin },
    );
    io.observe(el);

    // Failsafe - treść nigdy nie może zostać na opacity: 0.
    const failsafe = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.58 && r.bottom > 0) setSeen(true);
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [rootMargin]);

  return { ref, seen };
}

/**
 * Siatka realizacji - jednolite karty po dwie w rzędzie: tekst przy górnej
 * krawędzi, zrzut aplikacji wysunięty w prawym dolnym narożniku.
 * Kolejność ustala Sanity: realizacja z „featured" idzie pierwsza, dalej od
 * najnowszej. Nadwyżka nad VISIBLE ląduje na karcie „+N".
 */
export default function CaseStudiesMosaic({
  locale,
  cases,
  total,
}: {
  locale: string;
  cases: MosaicCase[];
  total: number;
}) {
  const t = useTranslations("home.caseStudies");
  const { ref, seen } = useInView<HTMLDivElement>();

  // Podgląd układu przy większej liczbie realizacji: /test?mock=8.
  // Klonuje realizacje z CMS-u, więc nie dotyka danych w Sanity.
  // Bez parametru sekcja działa na prawdziwych danych.
  const [mock, setMock] = useState(0);
  useEffect(() => {
    const n = parseInt(new URLSearchParams(window.location.search).get("mock") ?? "", 10);
    if (n > 0 && n <= 24) setMock(n);
  }, []);

  const pool = mock > 0 && cases.length
    ? Array.from({ length: mock }, (_, i) => ({ ...cases[i % cases.length], id: `mock-${i}` }))
    : cases;
  const count = mock > 0 ? mock : total;

  const shown = pool.slice(0, VISIBLE);
  if (!shown.length) return null;

  const hasMore = count > FADE_AFTER;

  return (
    <div ref={ref} className={seen ? "cs-in" : ""}>
      <div className="text-center">
        <p className="cs-tile mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          - {t("eyebrow")}
        </p>
        <h2
          className="cs-tile section-title text-slate-900"
          style={{ ["--d" as string]: "60ms" }}
        >
          {t("title")}
        </h2>
        <p
          className="cs-tile mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 text-pretty"
          style={{ ["--d" as string]: "120ms" }}
        >
          {t("lead")}
        </p>
        <Link
          href={`/${locale}/case-studies`}
          className="cs-tile group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors duration-150 ease-out hover:text-blue-600"
          style={{ ["--d" as string]: "180ms" }}
        >
          {t("allLink")}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Jednolite karty - wszystkie tej samej wielkości i w tym samym stylu,
          po dwie w rzędzie. Tekst przy górnej krawędzi, zrzut wysunięty
          w prawym dolnym narożniku. Kolejność ustala Sanity („featured"). */}
      <div className="relative mt-10">
        <div
          className={`grid auto-rows-[21rem] gap-4 md:auto-rows-[25rem] md:grid-cols-2 lg:gap-6 ${
            hasMore ? "max-h-[54rem] overflow-hidden md:max-h-[64rem]" : ""
          }`}
        >
        {shown.map((c, i) => (
          <Link
            key={c.id}
            href={`/${locale}/case-studies/${c.slug}`}
            className="cs-tile cs-card group relative flex flex-col overflow-hidden rounded-3xl border bg-white border-slate-200"
            style={{ ["--d" as string]: `${240 + i * 80}ms` }}
          >
            {/* Tło karty: delikatny gradient + siatka kropek. Zrzut ma własny
                cień i obwódkę, więc na tonowanym tle odcina się jak osobny
                obiekt, a nie zlewa z białą płaszczyzną. */}
            <span
              aria-hidden="true"
              className="pv-dots  pointer-events-none absolute inset-0 opacity-50"
            />
            {c.image && (
              <>
                {/* Zrzut wychodzi za prawą i dolną krawędź karty - przycina go
                    overflow-hidden karty. Bez rounded i bez ringu: obwódka na
                    ściętej krawędzi czyta się jak przypadkowa ramka, a
                    zaokrąglone narożniki odsłaniają tło karty. */}
                <img
                  src={c.image}
                  alt=""
                  aria-hidden="true"
                  className="rounded-tl-2xl border-l-6 border-t-6 border-gray-800  cs-card-shot shadow-2xl shadow-blue-300  pointer-events-none absolute -bottom-8 right-2 h-48 w-72 object-[0%_top] object-cover   md:-bottom-12 md:-right-0 md:h-64 md:w-96 lg:h-80 lg:w-[30rem]"
                />
                <span aria-hidden="true" className="cs-card-glow pointer-events-none absolute inset-0" />
              </>
            )}

            {/* Rozmyty panel pod tekstem zamiast gradientu - zrzut zostaje
                w pełnym, stałym kryciu, a nagłówek i tak jest czytelny. */}
            <div className="relative  px-6 pt-5 pb-0 ">
              {c.category && (
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                  {c.category}
                </span>
              )}
              <h3 className="mt-0 flex items-start gap-2 text-lg font-bold leading-snug text-slate-900 lg:text-xl">
                <span className="flex-1">{c.title}</span>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
              </h3>
              {c.description && (
                <p className="mt-0 line-clamp-2 max-w-xl text-sm leading-relaxed text-slate-600">
                  {c.description}
                </p>
              )}
            </div>
          </Link>
        ))}

        </div>

        {/* Dolny rząd wygaszony: rozmycie z maską (żeby samo rozmycie też
            zanikało w górę, a nie kończyło się ostrą krawędzią) plus biały
            gradient. Przycisk leży na tej warstwie i przenosi na listing. */}
        {hasMore && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-64 items-end justify-center md:h-72">
            <span
              aria-hidden="true"
              className="absolute inset-0 backdrop-blur-sm [mask-image:linear-gradient(to_top,#000_30%,transparent_85%)]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-transparent"
            />
            <Link
              href={`/${locale}/case-studies`}
              className="pointer-events-auto relative mb-2 inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {t("seeMore")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
