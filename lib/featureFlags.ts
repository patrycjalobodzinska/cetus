/**
 * Przełączniki widoczności sekcji, które chwilowo nie idą na produkcję.
 *
 * Flaga jest czytana i na serwerze, i w komponentach klienckich, dlatego musi
 * być zwykłą stałą z `NEXT_PUBLIC_*`/`NODE_ENV` - Next podstawia obie wartości
 * w czasie builda, więc nawigacja i strona główna widzą dokładnie to samo.
 */

/**
 * Realizacje (nawigacja + sekcja na stronie głównej).
 *
 * Ukryte na produkcji, dopóki w CMS jest tylko kilka wdrożeń - trzy kafle
 * czytają się jak brak portfolio, a nie jak portfolio. Na dev-serwerze sekcja
 * jest widoczna normalnie, na produkcji można ją włączyć bez wdrożenia kodu,
 * ustawiając `NEXT_PUBLIC_SHOW_CASE_STUDIES=1` i przebudowując projekt.
 *
 * Same trasy `/case-studies` zostają dostępne pod adresem (i pod skrótem
 * Ctrl+Shift+K z `HiddenCaseStudiesAccess`) - znikają tylko linki i sekcja.
 */
export const SHOW_CASE_STUDIES =
  process.env.NEXT_PUBLIC_SHOW_CASE_STUDIES === "1" || process.env.NODE_ENV !== "production";

/**
 * Galeria „Zespół w jednym ujęciu" na /o-nas (DomeGallery na desktopie,
 * marquee na mobile).
 *
 * Ukryta na życzenie klienta (2026-08-28). Komponenty i zapytanie do CMS-u
 * zostają - włączenie to zmiana tej stałej na `true`.
 */
export const SHOW_TEAM_GALLERY = false;

/**
 * Podstrona „O nas" (`/o-nas`).
 *
 * Ukryta na życzenie klienta (2026-08-28): znika z nagłówka, ze stopki,
 * z podpowiedzi na stronie 404, z danych strukturalnych i z sitemapy, a sama
 * trasa dostaje `noindex`. Adres nadal działa, więc wysłane wcześniej linki
 * się nie psują - wystarczy zmienić tę stałą na `true`, by wróciła.
 */
export const SHOW_ABOUT_PAGE = false;

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
