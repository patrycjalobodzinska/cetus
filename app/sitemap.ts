import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cetuspro.com";

const staticPages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/o-nas", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/oferta", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/kontakt", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/polityka-jakosci", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/oferta/aplikacje-webowe", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/oferta/aplikacje-mobilne", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/oferta/ui-ux-design", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/oferta/cybersecurity", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/oferta/aI-i-automatyzacja-procesow", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/oferta/outsourcing-programistow", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/oferta/transformacja-technologiczna", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/oferta/akademia-i-szkolenia", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/oferta/cetus-venture-capital", priority: 0.7, changeFrequency: "monthly" as const },
];

function getLocalizedUrl(path: string, locale: string): string {
  // Polish (default) has no prefix, English has /en
  const prefix = locale === "pl" ? "" : `/${locale}`;
  return `${baseUrl}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    // Primary entry for Polish (canonical, no prefix)
    entries.push({
      url: getLocalizedUrl(page.path, "pl"),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          pl: getLocalizedUrl(page.path, "pl"),
          en: getLocalizedUrl(page.path, "en"),
        },
      },
    });

    // English entry
    entries.push({
      url: getLocalizedUrl(page.path, "en"),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority * 0.9,
      alternates: {
        languages: {
          pl: getLocalizedUrl(page.path, "pl"),
          en: getLocalizedUrl(page.path, "en"),
        },
      },
    });
  }

  return entries;
}
