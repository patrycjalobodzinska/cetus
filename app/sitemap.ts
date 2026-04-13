import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cetuspro.pl";

const locales = ["pl", "en"];

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page.path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
