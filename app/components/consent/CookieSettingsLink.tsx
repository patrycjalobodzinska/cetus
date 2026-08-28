"use client";

import { useTranslations } from "next-intl";
import { useConsent } from "./ConsentProvider";

/**
 * Wejście do panelu zgód ze stopki. Bez tego zgoda byłaby jednorazowa
 * i nieodwoływalna, a wycofanie musi być tak łatwe jak udzielenie.
 */
export default function CookieSettingsLink() {
  const t = useTranslations("cookies");
  const { openSettings } = useConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className="cursor-pointer text-left text-slate-300 transition-colors hover:text-white">
      {t("settingsLink")}
    </button>
  );
}
