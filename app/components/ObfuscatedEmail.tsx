"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { uncloakEmail } from "@/lib/emailCloak";

interface ObfuscatedEmailProps {
  /**
   * Adres zaciemniony przez `cloakEmail()` na serwerze. To jedyna forma,
   * w jakiej adres ma prawo przejść przez granicę serwer/klient - patrz
   * komentarz w `lib/emailCloak.ts`.
   */
  token: string;
  /** Temat wiadomości dopisywany do mailto (opcjonalny). */
  subject?: string;
  className?: string;
  /**
   * Treść przycisku, gdy ma być inna niż domyślne „Pokaż adres e-mail"
   * (np. „Napisz do nas" przy przycisku akcji). W tym wariancie adres nigdy
   * nie pojawia się na ekranie - kliknięcie od razu otwiera program pocztowy.
   */
  children?: ReactNode;
}

/**
 * Adres e-mail, którego nie da się zebrać automatem.
 *
 * Zasada: dopóki użytkownik nie kliknie, adresu NIE MA nigdzie - ani w HTML
 * z serwera, ani w payloadzie RSC, ani w DOM, ani w żadnym `href`. Jest tylko
 * token (odwrócony ROT13, bez „@") i przycisk. Adres powstaje w pamięci
 * przeglądarki dopiero w obsłudze kliknięcia.
 *
 * Co to zatrzymuje:
 * - skanery zasysające HTML i szukające regexpem `[\w.]+@[\w.]+\.\w+`,
 * - boty czytające `href="mailto:..."`,
 * - crawlery uruchamiające przeglądarkę (headless Chrome), które ładują stronę
 *   i czytają DOM, ale nie klikają w przyciski - a tak działa ich większość.
 *
 * Czego nie zatrzyma: bota napisanego specjalnie pod tę stronę, który kliknie
 * przycisk albo odwróci `uncloakEmail` z bundla. Ochrona kryptograficzna
 * wymagałaby zrezygnowania z adresu na stronie w ogóle (formularz kontaktowy).
 *
 * Koszt dla użytkownika: jedno kliknięcie. Bez JavaScriptu adres nie jest
 * dostępny - dlatego przyciski „napisz do nas" prowadzące do formularza czy
 * strony kontaktu zostają zwykłymi linkami, a nie tym komponentem.
 */
export default function ObfuscatedEmail({
  token,
  subject,
  className,
  children,
}: ObfuscatedEmailProps) {
  const t = useTranslations("common");
  const [address, setAddress] = useState<string | null>(null);

  const hrefFor = (value: string) =>
    subject ? `mailto:${value}?subject=${encodeURIComponent(subject)}` : `mailto:${value}`;

  // Adres już odsłonięty: normalny link, zachowuje się jak każdy inny mailto.
  if (address) {
    return (
      <a href={hrefFor(address)} className={className}>
        {children ?? address}
      </a>
    );
  }

  return (
    <button
      type="button"
      // `cursor-pointer` dopisujemy tu, żeby przycisk zachowywał się na oko
      // jak link, którym był wcześniej - reset Tailwinda tego nie robi.
      className={className ? `${className} cursor-pointer` : "cursor-pointer"}
      onClick={() => {
        const value = uncloakEmail(token);
        // Wariant z własną treścią (przycisk akcji) nie ma gdzie pokazać
        // adresu, więc od razu otwieramy program pocztowy. Wariant tekstowy
        // odsłania adres na miejscu - użytkownik może go skopiować.
        if (children) {
          window.location.href = hrefFor(value);
          return;
        }
        setAddress(value);
      }}
    >
      {children ?? t("showEmail")}
    </button>
  );
}
