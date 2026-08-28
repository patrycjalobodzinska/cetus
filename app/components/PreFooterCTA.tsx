"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

/**
 * Sekcja tuż nad stopką: ilustracja z hero wjeżdża od dołu, obok krótka
 * zachęta do kontaktu.
 *
 * Ilustracja jest odbita w poziomie (`scale-x-[-1]`), żeby postać patrzyła
 * w stronę treści, a nie poza ekran - i żeby nie była dosłownym powtórzeniem
 * hero na tej samej stronie.
 */
export default function PreFooterCTA() {
  const t = useTranslations("preFooter");
  const locale = useLocale();
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Bez animacji, gdy użytkownik prosi o ograniczenie ruchu.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Drugi warunek: gdy ktoś skoczy od razu na dół strony (klawisz End,
        // link kotwiczący), sekcja bywa już nad ekranem i nigdy się nie
        // "przecina" - wtedy pokazujemy ilustrację od razu, zamiast zostawiać
        // pustą dziurę nad stopką.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    // IntersectionObserver nie zgłosi nic, jeśli strona przeskoczy sekcję
    // w jednej klatce (End, kotwica, przywrócona pozycja scrolla). Dlatego
    // dokładamy tani nasłuch scrolla, który sprawdza pozycję i sam się zdejmuje.
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setRevealed(true);
        window.removeEventListener("scroll", onScroll);
        observer.disconnect();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Na stronie kontaktu ta zachęta prowadziłaby sama do siebie.
  if (pathname?.startsWith(`/${locale}/kontakt`) || pathname === "/kontakt") {
    return null;
  }

  // Wspólna baza przejścia dla wszystkich trzech kolumn - różni je tylko
  // kierunek wejścia i opóźnienie, żeby sekcja składała się kaskadowo.
  const motion = "transition-[translate,opacity] ease-out will-change-[translate,opacity]";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface-muted pt-20 md:pt-28"
      aria-labelledby="prefooter-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_minmax(0,24rem)_1fr] lg:gap-16 xl:gap-20">
          {/* Lewa kolumna - wjeżdża od lewej krawędzi */}
          <div
            className={`order-1 space-y-6 pb-6 duration-[900ms] lg:pb-20 ${motion} ${
              revealed
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: revealed ? "120ms" : "0ms" }}
          >
            <p className="text-lg leading-relaxed text-slate-700">{t("left")}</p>
            <p className="text-lg font-semibold leading-relaxed text-slate-900">
              {t("leftHighlight")}
            </p>
          </div>

          {/* Ilustracja - unosi się od dołu, wolniej niż tekst i z rozjaśnieniem. */}
          <div className="order-3 flex justify-center overflow-hidden lg:order-2">
            <div
              className={`relative w-[min(20rem,72vw)] duration-[1600ms] lg:w-full ${motion} ${
                revealed ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
            >
              {/* Spód: czysty szkic ołówkiem. */}
              <Image
                src="/Norbert2.png"
                alt=""
                aria-hidden="true"
                width={1400}
                height={1400}
                sizes="(max-width: 1024px) 72vw, 24rem"
                className="h-auto w-full scale-x-[-1] select-none"
                priority={false}
              />
              {/* Wierzch: ta sama ilustracja w kolorze, wyciszona - akwarela
                  ma tylko podbarwić szkic, a nie go przykryć. Oba pliki mają
                  identyczny kadr 1400x1400, więc nakładają się co do piksela. */}
              <Image
                src="/Norbert3.png"
                alt=""
                aria-hidden="true"
                width={1400}
                height={1400}
                sizes="(max-width: 1024px) 72vw, 24rem"
                className="pointer-events-none absolute inset-0 h-auto w-full scale-x-[-1] select-none opacity-40"
                priority={false}
              />
            </div>
          </div>

          {/* Prawa kolumna - karta kontaktowa, wjeżdża od prawej krawędzi */}
          <div
            className={`order-2 flex flex-col justify-end pb-6 duration-[900ms] lg:order-3 ${motion} ${
              revealed
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: revealed ? "240ms" : "0ms" }}
          >
            {/* Bez własnej karty - blok siedzi wprost na tle sekcji i wyrównuje
                się dolną krawędzią do ilustracji, żeby nie unosił się nad nią. */}
            <div>
              <h2
                id="prefooter-title"
                className="heading-3 text-slate-900"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                {t("personName")}
              </h2>
              <p className="mt-2 text-base font-extrabold uppercase tracking-[0.16em] text-blue-600">
                {t("personRole")}
              </p>

              <p className="mt-5 text-slate-600 leading-relaxed">
                {t("description")}
              </p>

              {/* Sam przycisk - adres e-mail jest w stopce kilka pikseli
                  niżej, więc powtarzanie go tutaj tylko dublowało treść. */}
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href={`/${locale}/kontakt`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-[translate,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {t("linkText")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
