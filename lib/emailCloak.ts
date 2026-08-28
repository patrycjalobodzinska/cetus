/**
 * Zaciemnianie adresu e-mail na drodze serwer -> przeglądarka.
 *
 * Problem, który to rozwiązuje: samo rozbicie adresu na tagi w JSX nie
 * wystarcza, bo propsy komponentu klienckiego Next serializuje do payloadu RSC
 * osadzonego w HTML (`self.__next_f.push(...)`). Adres podany jako
 * `email="ktos@example.com"` siedzi tam jako jeden, gotowy do zebrania
 * ciąg znaków - i żadna sztuczka w renderze go już nie schowa.
 *
 * Dlatego przez granicę serwer/klient przechodzi wyłącznie token: adres
 * z podmienionymi literami (ROT13), odwrócony i bez znaku „@". W HTML nie ma
 * więc ani adresu, ani niczego, co przypomina adres - `ktos@example.com`
 * wygląda jak `zbp.rycznkr!fbgx`. Prawdziwą wartość składa dopiero
 * przeglądarka, w reakcji na kliknięcie użytkownika.
 *
 * To nie jest szyfrowanie - kod odwracający jest publiczny w bundlu. Chodzi
 * o to, żeby adresu nie dało się zebrać przez zassanie HTML-a i puszczenie po
 * nim regexpa, bo tak działa masowy harvesting.
 */

const AT = "!";

function rot13(value: string): string {
  return value.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });
}

const reverse = (value: string) => value.split("").reverse().join("");

/** Adres -> token bezpieczny do wysłania w HTML. Wołane na serwerze. */
export function cloakEmail(email: string): string {
  return reverse(rot13(email)).replace(/@/g, AT);
}

/** Token -> adres. Wołane w przeglądarce, po kliknięciu użytkownika. */
export function uncloakEmail(token: string): string {
  // ROT13 jest swoją własną odwrotnością, więc odkodowanie to te same kroki.
  return rot13(reverse(token.replace(new RegExp(`\\${AT}`, "g"), "@")));
}
