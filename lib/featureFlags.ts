/**
 * Przełączniki widoczności sekcji, które są zdjęte z produkcji.
 *
 * Jedna gałąź kodu obsługuje dwa środowiska (produkcja na GitLabie, staging
 * z GitHuba) - różni je wyłącznie zmienna środowiskowa, nie zawartość
 * repozytorium. Rozjeżdżanie `main` między remote'ami skończyłoby się tym, że
 * poprawka wdrożona na jednym środowisku ginie przy następnym merge'u.
 *
 * Jak to działa:
 * - `NEXT_PUBLIC_SITE_STAGE=staging` (albo lokalny `next dev`) pokazuje
 *   WSZYSTKO - staging ma służyć do pracy nad ukrytymi sekcjami,
 * - produkcyjny build bez tej zmiennej ukrywa to, co poniżej ma domyślnie
 *   `false`. Domyślnie ukryte, bo pominięta zmienna na produkcji nie może
 *   odsłonić czegoś, co klient kazał schować.
 *
 * Pojedynczą sekcję można też włączyć na produkcji bez zmiany kodu - własną
 * zmienną `NEXT_PUBLIC_SHOW_*=1` (patrz `.env.example`).
 *
 * Wartości są czytane i na serwerze, i w komponentach klienckich, dlatego to
 * zwykłe stałe z `process.env` - Next podstawia je w czasie builda, więc
 * nawigacja, strona główna i sitemapa widzą dokładnie to samo.
 */

/** Staging (`NEXT_PUBLIC_SITE_STAGE=staging`) albo lokalny dev. */
export const IS_STAGING =
  process.env.NEXT_PUBLIC_SITE_STAGE === "staging" || process.env.NODE_ENV !== "production";

const show = (value: string | undefined) => value === "1" || IS_STAGING;

/**
 * Realizacje (nawigacja + sekcja na stronie głównej).
 *
 * Ukryte na produkcji, dopóki w CMS jest tylko kilka wdrożeń - trzy kafle
 * czytają się jak brak portfolio, a nie jak portfolio. Same trasy
 * `/case-studies` zostają dostępne pod adresem (i pod skrótem Ctrl+Shift+K
 * z `HiddenCaseStudiesAccess`), tylko z `noindex` - znikają linki i sekcja.
 */
export const SHOW_CASE_STUDIES = show(process.env.NEXT_PUBLIC_SHOW_CASE_STUDIES);

/**
 * Podstrona „O nas" (`/o-nas`).
 *
 * Ukryta na życzenie klienta (2026-08-28): znika z nagłówka, ze stopki,
 * z podpowiedzi na stronie 404, z danych strukturalnych i z sitemapy, a trasa
 * dostaje `noindex`. Adres nadal działa, więc wysłane wcześniej linki żyją.
 */
export const SHOW_ABOUT_PAGE = show(process.env.NEXT_PUBLIC_SHOW_ABOUT_PAGE);

/**
 * Galeria „Zespół w jednym ujęciu" na /o-nas (DomeGallery na desktopie,
 * marquee na mobile). Ukryta na życzenie klienta (2026-08-28).
 */
export const SHOW_TEAM_GALLERY = show(process.env.NEXT_PUBLIC_SHOW_TEAM_GALLERY);

/**
 * Czy adres prowadzi do sekcji ukrytej flagą.
 *
 * Część linków wpisuje się ręcznie w Sanity (moduły strony głównej, kolumny
 * stopki), więc mogą wskazywać stronę, którą właśnie zdjęliśmy z nawigacji.
 * Ten warunek pilnuje, żeby taki link nie pojawił się w serwisie.
 */
export function isHiddenPath(link?: string): boolean {
  if (!link) return false;
  if (!SHOW_ABOUT_PAGE && link.includes("/o-nas")) return true;
  if (!SHOW_CASE_STUDIES && link.includes("/case-studies")) return true;
  return false;
}
