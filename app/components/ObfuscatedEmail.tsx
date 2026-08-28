"use client";

import { useEffect, useState, type ReactNode } from "react";

interface ObfuscatedEmailProps {
  /** Część adresu przed „@" (np. „contact"). Pomiń, gdy podajesz `email`. */
  user?: string;
  /** Domena (np. „cetuspro.com"). Pomiń, gdy podajesz `email`. */
  domain?: string;
  /**
   * Cały adres, gdy przychodzi z CMS albo z propsów („contact@cetuspro.com").
   * Rozbijamy go wewnątrz komponentu - pomocnik wołany w komponencie
   * serwerowym byłby wywołaniem funkcji z modułu „use client", czego React
   * nie pozwala zrobić przez granicę serwer/klient.
   */
  email?: string;
  /** Temat wiadomości dopisywany do mailto (opcjonalny). */
  subject?: string;
  className?: string;
  /** Treść linku, gdy ma być inna niż sam adres (np. „Umów konsultację"). */
  children?: ReactNode;
}

/**
 * Adres e-mail odporny na najprostsze harvestery spamowe.
 *
 * Jak to działa: w HTML z serwera adres NIGDY nie występuje jako jeden ciąg
 * znaków ani w atrybucie `href` - lokalna część i domena idą w osobnych
 * elementach - między nimi stoi tag, więc regexp typu
 * `[\w.]+@[\w.]+\.\w+` puszczony po źródle strony nic nie znajdzie
 * (przed „@" jest `</span>`, a po nim `<span>`).
 *
 * Dodatkowo przed „@" siedzi przynęta: kawałek tekstu ukryty `display: none`.
 * Harvester, który najpierw zdejmuje tagi, a potem szuka adresu regexpem
 * (tak działa większość), dostaje `contact.usun-to@...` - adres nieistniejący.
 * Człowiek go nie widzi (CSS go chowa), czytnik ekranu nie czyta (poza drzewem
 * dostępności, dodatkowo `aria-hidden`), a kopiowanie i tak dotyczy już
 * podmienionej, czystej wersji.
 *
 * Dopiero po hydracji (czyli w przeglądarce, nie w crawlerze) JavaScript
 * składa adres i podmienia treść na normalny link `mailto:`.
 *
 * Dlaczego tak, a nie obrazek albo formularz:
 * - bez JS i dla czytnika ekranu adres nadal czyta się normalnie,
 * - kliknięcie działa jak zwykły mailto, bez pośredników,
 * - nie trzeba utrzymywać backendu formularza ani captchy.
 *
 * Ograniczenie, o którym warto wiedzieć: bot uruchamiający przeglądarkę
 * (headless Chrome) i tak zobaczy adres. To zapora na masowe skanery HTML,
 * nie ochrona kryptograficzna - te zbierają grubą większość spamu.
 */
/**
 * Przynęta wstrzykiwana w adres w HTML z serwera. Ukryta przez `display: none`
 * (Tailwind `hidden`), więc widzi ją tylko ten, kto czyta surowe źródło albo
 * zdejmuje tagi - czyli dokładnie spamerski skaner.
 */
const DECOY = ".usun-to-jesli-nie-jestes-botem.";

export default function ObfuscatedEmail({
  user,
  domain,
  email,
  subject,
  className,
  children,
}: ObfuscatedEmailProps) {
  const parts = splitEmail(email, user, domain);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!parts.user || !parts.domain) return;
    setAddress(`${parts.user}@${parts.domain}`);
  }, [parts.user, parts.domain]);

  if (!address) {
    // Wariant serwerowy / bez JS: czytelny dla człowieka i dla czytnika
    // ekranu, ale nie do wyłuskania regexpem - „@" sąsiaduje z tagami,
    // a tuż przed nim stoi ukryta przynęta psująca adres po zdjęciu tagów.
    return (
      <span className={className}>
        {children ?? (
          <>
            <span>{parts.user}</span>
            <span aria-hidden="true" className="hidden">
              {DECOY}
            </span>
            @<span>{parts.domain}</span>
          </>
        )}
      </span>
    );
  }

  const href = subject
    ? `mailto:${address}?subject=${encodeURIComponent(subject)}`
    : `mailto:${address}`;

  return (
    <a href={href} className={className}>
      {children ?? address}
    </a>
  );
}

/**
 * Ustala lokalną część i domenę na podstawie tego, co przyszło w propsach:
 * albo gotowe `user`/`domain`, albo cały adres do rozbicia.
 */
function splitEmail(email?: string, user?: string, domain?: string) {
  if (user && domain) return { user, domain };
  const value = email ?? "";
  const at = value.lastIndexOf("@");
  if (at < 0) return { user: value, domain: "" };
  return { user: value.slice(0, at), domain: value.slice(at + 1) };
}
