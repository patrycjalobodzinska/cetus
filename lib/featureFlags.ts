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
