"use client";

import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { useConsent } from "./ConsentProvider";

/**
 * Blokada osadzonych treści (Facebook, YouTube, Vimeo) do momentu zgody.
 *
 * Ramka z innej domeny zapisuje cookies w chwili, gdy trafi do dokumentu -
 * dlatego dopóki nie ma zgody, `children` w ogóle nie są renderowane. Zamiast
 * nich stoi kafel z nazwą dostawcy i przyciskiem, który tę zgodę udziela
 * (klasyczne „dwa kliknięcia"): jedno na zgodę, drugie na odtworzenie.
 *
 * Przycisk zapisuje zgodę trwale, więc kolejne ramki na stronie odsłaniają się
 * już same, a decyzję da się cofnąć w „Ustawieniach cookies" w stopce.
 */
export default function EmbedConsentGate({
  provider,
  className,
  children,
}: {
  /** Nazwa dostawcy pokazywana użytkownikowi, np. „Facebook". */
  provider: string;
  className?: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("cookies");
  const { ready, categories, save } = useConsent();

  // Przed odczytem localStorage nie zgadujemy - pokazujemy neutralne tło,
  // żeby układ nie skakał, gdy zgoda już jest.
  if (!ready) {
    return (
      <div
        className={`h-full w-full animate-pulse bg-gradient-to-b from-slate-100 to-slate-200 ${className ?? ""}`}
      />
    );
  }

  if (categories.embeds) return <>{children}</>;

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-100 p-5 text-center ${className ?? ""}`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90">
        <Play className="h-5 w-5 translate-x-px text-white" aria-hidden="true" />
      </span>
      <p className="text-sm font-semibold text-slate-900">{t("embedBlockedTitle", { provider })}</p>
      <p className="max-w-xs text-xs leading-relaxed text-slate-600">
        {t("embedBlockedDescription", { provider })}
      </p>
      <button
        type="button"
        onClick={() => save({ ...categories, embeds: true })}
        className="mt-1 cursor-pointer rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
        {t("embedAllow")}
      </button>
    </div>
  );
}
