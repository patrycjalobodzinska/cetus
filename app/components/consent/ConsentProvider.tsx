"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Zgody na pliki cookies i podobne technologie.
 *
 * Zasada, na której to stoi: dopóki użytkownik nie zdecyduje, strona nie
 * uruchamia NICZEGO, co wymaga zgody - ani analityki (Microsoft Clarity), ani
 * osadzonych ramek Facebooka czy YouTube'a, które same z siebie zapisują
 * cookies podmiotów trzecich. Sam baner niczego nie blokuje, więc blokada
 * siedzi w miejscach użycia: `ClarityScript` i `EmbedConsentGate`.
 *
 * Decyzja trzymana jest w `localStorage`, nie w cookie: nie musi jechać
 * z każdym żądaniem na serwer, a strona jest statyczna. Zapisujemy wersję
 * i moment decyzji, żeby dało się wykazać, kiedy i na co użytkownik się
 * zgodził, oraz wymusić ponowne pytanie po zmianie zakresu cookies
 * (podniesienie CONSENT_VERSION).
 */

export type ConsentCategories = {
  /** Microsoft Clarity - statystyki i nagrania sesji. */
  analytics: boolean;
  /** Osadzone treści: odtwarzacz Facebooka, YouTube, Vimeo. */
  embeds: boolean;
};

export type ConsentRecord = {
  version: number;
  /** ISO 8601 - moment kliknięcia użytkownika. */
  decidedAt: string;
  categories: ConsentCategories;
};

const STORAGE_KEY = "cetuspro.cookieConsent";

/** Podniesienie tej liczby unieważnia zapisane decyzje i pyta od nowa. */
export const CONSENT_VERSION = 1;

/**
 * Po tym czasie pytamy ponownie. Zgoda nie może być wieczna, a 12 miesięcy to
 * okres podawany w polityce prywatności - te dwie liczby muszą się zgadzać.
 */
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

const NONE: ConsentCategories = { analytics: false, embeds: false };
const ALL: ConsentCategories = { analytics: true, embeds: true };

type ConsentContextValue = {
  /** null = użytkownik jeszcze nie zdecydował (albo decyzja jest przedawniona). */
  record: ConsentRecord | null;
  /** false, dopóki nie odczytamy localStorage - wtedy nic nie renderujemy. */
  ready: boolean;
  categories: ConsentCategories;
  /** Panel wyboru otwarty (baner albo wejście ze stopki). */
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  save: (categories: ConsentCategories) => void;
  acceptAll: () => void;
  rejectAll: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function read(): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed?.version !== CONSENT_VERSION) return null;
    if (typeof parsed.categories?.analytics !== "boolean") return null;
    if (typeof parsed.categories?.embeds !== "boolean") return null;

    const decidedAt = Date.parse(parsed.decidedAt);
    if (!Number.isFinite(decidedAt)) return null;
    if (Date.now() - decidedAt > CONSENT_MAX_AGE_MS) return null;

    return parsed;
  } catch {
    // Prywatne okno, wyczyszczone dane, wyłączony storage - traktujemy jak brak
    // decyzji, czyli brak zgody. Baner pojawi się ponownie.
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setRecord(read());
    setReady(true);
  }, []);

  const save = useCallback(
    (categories: ConsentCategories) => {
      const next: ConsentRecord = {
        version: CONSENT_VERSION,
        decidedAt: new Date().toISOString(),
        categories,
      };

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Brak storage'u nie może blokować decyzji - zgoda obowiązuje wtedy
        // do końca sesji, a przy następnej wizycie zapytamy ponownie.
      }

      // Wycofanie zgody na analitykę wymaga przeładowania: skrypt Clarity jest
      // już w dokumencie i nie da się go „odładować" z pamięci przeglądarki.
      const revokedAnalytics = record?.categories.analytics && !categories.analytics;

      setRecord(next);
      setSettingsOpen(false);

      if (revokedAnalytics) window.location.reload();
    },
    [record],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      record,
      ready,
      categories: record?.categories ?? NONE,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      save,
      acceptAll: () => save(ALL),
      rejectAll: () => save(NONE),
    }),
    [record, ready, settingsOpen, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent musi być użyte wewnątrz <ConsentProvider>");
  }
  return context;
}
