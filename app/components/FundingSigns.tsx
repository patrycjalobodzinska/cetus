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
} as const;

const SIGN_SET = {
  pl: {
    src: "/fundusze/fe-popw-rp-efrr-pl.png",
    alt: "Fundusze Europejskie Polska Wschodnia, Rzeczpospolita Polska, Unia Europejska - Europejski Fundusz Rozwoju Regionalnego",
  },
  en: {
    src: "/fundusze/fe-popw-rp-efrr-en.png",
    alt: "European Funds Eastern Poland, Republic of Poland, European Union - European Regional Development Fund",
  },
} as const;

type Sign = { src: string; alt: string };

const pick = (map: { pl: Sign; en: Sign }, locale: string): Sign =>
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

/** Pełne zestawienie znaków: FE Polska Wschodnia + barwy RP + UE z EFRR. */
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
  return (
    <Image
      src={sign.src}
      alt={sign.alt}
      width={1600}
      height={172}
      className={className}
      priority={priority}
    />
  );
}
