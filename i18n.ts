import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["pl", "en"] as const;
export const defaultLocale = "pl" as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
