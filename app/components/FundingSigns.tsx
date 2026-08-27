import Image from "next/image";

/**
 * Oficjalne znaki Funduszy Europejskich (perspektywa 2014-2020, POPW).
 *
 * Pliki pochodzą z pakietów udostępnionych przez Ministerstwo Funduszy
 * i Polityki Regionalnej (zasady dla umów podpisanych od 1 stycznia 2018 r.)
 * i leżą w `public/fundusze`. Nie wolno ich przerysowywać ani przebudowywać -
 * są elementem Księgi Identyfikacji Wizualnej.
 *
 * Wymagania, które realizują te dwa komponenty (Załącznik nr 8 do umowy
 * o dofinansowanie POPW, rozdz. 4):
 *  - `EuSign` - flaga UE z napisem „Unia Europejska" musi być widoczna
 *    w momencie wejścia na stronę, bez przewijania w dół (rozwiązanie nr 2),
 *  - `FundingSignSet` - pełne zestawienie znaków (Fundusze Europejskie
 *    Polska Wschodnia, barwy RP, Unia Europejska z nazwą funduszu) w dalszej
 *    części serwisu; kolejność znaków jest częścią pliku, więc nie da się jej
 *    przypadkiem odwrócić.
 */

const EU_SIGN = {
  pl: { src: "/fundusze/unia-europejska-pl.png", alt: "Unia Europejska" },
  en: { src: "/fundusze/unia-europejska-en.png", alt: "European Union" },
};

const SIGN_SET_ALT = {
  pl: "Fundusze Europejskie Polska Wschodnia, Rzeczpospolita Polska, Unia Europejska - Europejski Fundusz Rozwoju Regionalnego",
  en: "European Funds Eastern Poland, Republic of Poland, European Union - European Regional Development Fund",
};

// Poziom i pion tego samego zestawienia. Pion nie jest ozdobą: w wąskiej
// kolumnie poziomy pasek musiałby zejść do ~35 px wysokości, a wtedy podpis
// „Polska Wschodnia" (13,5% wysokości znaku) ma poniżej 5 px i przestaje być
// czytelny - a czytelność znaków jest wymogiem, nie preferencją.
const SIGN_SET = {
  pl: {
    horizontal: "/fundusze/fe-popw-rp-efrr-pl.png",
    vertical: "/fundusze/fe-popw-rp-efrr-pl-pion.png",
  },
  en: {
    horizontal: "/fundusze/fe-popw-rp-efrr-en.png",
    vertical: "/fundusze/fe-popw-rp-efrr-en-pion.png",
  },
};

const pick = <T,>(map: { readonly pl: T; readonly en: T }, locale: string): T =>
  locale === "en" ? map.en : map.pl;

/** Flaga UE z napisem „Unia Europejska" - do nagłówka (widoczna bez przewijania). */
export function EuSign({
  locale,
  className = "",
}: {
  locale: string;
  className?: string;
}) {
  const sign = pick(EU_SIGN, locale);
  return (
    <Image
      src={sign.src}
      alt={sign.alt}
      width={900}
      height={203}
      className={className}
      priority
    />
  );
}

/**
 * Pełne zestawienie znaków: FE Polska Wschodnia + barwy RP + UE z EFRR.
 *
 * Na wąskim ekranie renderuje wariant pionowy, od `sm` poziomy - w obu
 * przypadkach na tyle duży, żeby najmniejszy podpis w znaku był czytelny.
 */
export function FundingSignSet({
  locale,
  className = "",
  priority = false,
}: {
  locale: string;
  className?: string;
  priority?: boolean;
}) {
  const sign = pick(SIGN_SET, locale);
  const alt = pick(SIGN_SET_ALT, locale);

  return (
    <>
      {/* Mobile: pion w stałej szerokości - `className` (szerokości poziomego
          paska) świadomie go nie dotyczy, żeby klasy `w-*` się nie biły. */}
      <Image
        src={sign.vertical}
        alt={alt}
        width={666}
        height={700}
        className="h-auto w-[240px] max-w-full sm:hidden"
        priority={priority}
      />
      <Image
        src={sign.horizontal}
        alt={alt}
        aria-hidden="true"
        width={1600}
        height={172}
        className={`hidden sm:block ${className}`.trim()}
        priority={priority}
      />
    </>
  );
}
