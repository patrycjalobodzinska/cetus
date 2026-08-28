"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Cookie, X } from "lucide-react";
import { useConsent, type ConsentCategories } from "./ConsentProvider";

/**
 * Baner zgód na cookies.
 *
 * Wymogi, które świadomie spełniamy:
 * - „Akceptuję" i „Odrzucam" mają tę samą wagę wizualną (odrzucenie nie może
 *   być trudniejsze niż zgoda),
 * - żadna kategoria nieobowiązkowa nie jest zaznaczona domyślnie,
 * - decyzję można zmienić w każdej chwili (link „Ustawienia cookies" w stopce
 *   otwiera ten sam panel),
 * - baner nie blokuje treści strony (nie jest modalem na całą stronę), ale
 *   nic wymagającego zgody nie działa, dopóki użytkownik nie zdecyduje.
 */
export default function CookieBanner() {
  const t = useTranslations("cookies");
  const locale = useLocale();
  const { ready, record, categories, settingsOpen, openSettings, closeSettings, save, acceptAll, rejectAll } =
    useConsent();

  const [draft, setDraft] = useState<ConsentCategories>({ analytics: false, embeds: false });
  const panelRef = useRef<HTMLDivElement>(null);

  // Panel otwierany ze stopki startuje od zapisanego stanu, a nie od zer -
  // inaczej ktoś, kto chce tylko wyłączyć analitykę, gubi drugą zgodę.
  useEffect(() => {
    if (settingsOpen) setDraft(categories);
  }, [settingsOpen, categories]);

  useEffect(() => {
    if (!settingsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSettings();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [settingsOpen, closeSettings]);

  // Dopóki nie wiemy, co jest w localStorage, nie migamy banerem.
  if (!ready) return null;
  if (record && !settingsOpen) return null;

  const policyHref = locale === "pl" ? "/polityka-prywatnosci" : `/${locale}/polityka-prywatnosci`;

  if (settingsOpen) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-end justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2
              id="cookie-settings-title"
              className="text-xl font-bold tracking-tight text-slate-900">
              {t("settingsTitle")}
            </h2>
            <button
              type="button"
              onClick={closeSettings}
              aria-label={t("close")}
              className="-mr-2 -mt-2 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">{t("settingsLead")}</p>

          <div className="mt-6 space-y-4">
            {/* Niezbędne - bez przełącznika, bo nie ma tu żadnego wyboru. */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold text-slate-900">{t("necessaryTitle")}</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("alwaysOn")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t("necessaryDescription")}
              </p>
            </div>

            <ConsentToggle
              title={t("analyticsTitle")}
              description={t("analyticsDescription")}
              checked={draft.analytics}
              onChange={(analytics) => setDraft((d) => ({ ...d, analytics }))}
            />
            <ConsentToggle
              title={t("embedsTitle")}
              description={t("embedsDescription")}
              checked={draft.embeds}
              onChange={(embeds) => setDraft((d) => ({ ...d, embeds }))}
            />
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => save(draft)}
              className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              {t("saveChoice")}
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50">
              {t("rejectAll")}
            </button>
          </div>

          <Link
            href={policyHref}
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
            {t("policyLink")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={t("bannerLabel")}
      className="fixed inset-x-0 bottom-0 z-[9998] p-4 sm:p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur sm:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600">
            <Cookie className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-base font-bold tracking-tight text-slate-900">{t("title")}</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {t("lead")}{" "}
              <Link href={policyHref} className="font-semibold text-blue-600 hover:underline">
                {t("policyLinkInline")}
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={openSettings}
            className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 sm:order-first">
            {t("manage")}
          </button>
          {/* Odrzucenie i akceptacja wyglądają równorzędnie - to wymóg, nie estetyka. */}
          <button
            type="button"
            onClick={rejectAll}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50">
            {t("rejectAll")}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-xl border border-blue-600 bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-blue-600/40">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
      />
      <span>
        <span className="block text-sm font-bold text-slate-900">{title}</span>
        <span className="mt-2 block text-sm leading-relaxed text-slate-600">{description}</span>
      </span>
    </label>
  );
}
