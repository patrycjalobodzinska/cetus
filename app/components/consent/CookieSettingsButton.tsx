"use client";

import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";
import { useConsent } from "./ConsentProvider";

/** Przycisk otwierający panel zgód - używany w treści polityki prywatności. */
export default function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations("cookies");
  const { openSettings } = useConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 ${className ?? ""}`}>
      <Cookie className="h-4 w-4 text-blue-600" aria-hidden="true" />
      {t("settingsTitle")}
    </button>
  );
}
