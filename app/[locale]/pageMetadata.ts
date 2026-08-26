import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/**
 * Buduje metadane podstrony na podstawie tłumaczeń z `pageMeta.<key>`.
 *
 * Wcześniej każdy layout eksportował statyczny obiekt po polsku, przez co
 * angielskie wersje stron miały polskie tytuły i opisy w wynikach wyszukiwania
 * oraz w podglądach linków.
 *
 * `path` podajemy bez prefiksu locale (np. "/oferta/cybersecurity").
 */
export async function buildPageMetadata({
  locale,
  key,
  path,
}: {
  locale: string;
  key: string;
  path: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `pageMeta.${key}` });

  const title = t("title");
  const description = t("description");
  const keywords = t("keywords")
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);

  const url = locale === "pl" ? path : `/${locale}${path}`;
  const ogTitle = `${title} | CetusPro`;

  return {
    // absolute: szablon "%s | CetusPro" z korzenia nie dociera do stron
    // zagnieżdżonych pod /oferta, więc sufiks ustawiamy jawnie i spójnie.
    title: { absolute: ogTitle },
    description,
    keywords,
    openGraph: {
      title: ogTitle,
      description,
      url,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: url,
      languages: {
        pl: path,
        en: `/en${path}`,
        "x-default": path,
      },
    },
  };
}
