"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PolygonCard from "@/app/components/PolygonCard";
import TechnologiesMarquee from "@/app/components/TechnologiesMarquee";
import StarGradientButton from "@/app/components/ui/gradientBackground";
import StatsPanel from "@/app/components/StatsPanel";
import CTASection from "@/app/components/CTASection";
import { useLocale, useTranslations } from "next-intl";
import { client } from "@/sanity/lib/client";

import type {
  TechnologiesData,
  IndustriesData,
  OfferStatsData,
} from "@/lib/sanity/types";

export default function OfferPage() {
  const t = useTranslations("offer");
  const locale = useLocale();
  const [technologies, setTechnologies] = useState<TechnologiesData | null>(
    null,
  );
  const [industries, setIndustries] = useState<IndustriesData | null>(null);
  const [offerStats, setOfferStats] = useState<OfferStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const projectKeys = [
    "webApps",
    "mobileApps",
    "uiUx",
    "ai",
    "cybersecurity",
    "transformation",
    "outsourcing",
    "academy",
    "venture",
  ];

  const projects = projectKeys
    .map((key, index) => {
      let orderValue: number = index + 1;
      try {
        const projectData = t.raw(`projects.${key}`) as
          | { order?: number }
          | undefined;
        if (projectData && typeof projectData.order === "number") {
          orderValue = projectData.order;
        }
      } catch (e) {
        orderValue = index + 1;
      }
      return {
        title: t(`projects.${key}.title`, { defaultValue: "" }),
        description: t(`projects.${key}.description`, { defaultValue: "" }),
        slug: t(`projects.${key}.slug`, { defaultValue: "" }),
        image: t(`projects.${key}.image`, { defaultValue: "" }),
        order: orderValue,
      };
    })
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    async function fetchTechnologies() {
      try {
        const query = `*[_type == "technologies"][0] {
          "title": title,
          "description": description,
          "categories": categories[] | order(order asc) {
            "title": title,
            "items": items,
            order
          }
        }`;
        const data = await client.fetch<TechnologiesData>(query);
        setTechnologies(data);
      } catch (error) {
        console.error("Błąd podczas pobierania technologii:", error);
      }
    }

    async function fetchIndustries() {
      try {
        const query = `*[_type == "industries"][0] {
          "title": title,
          "description": description,
          "items": items[] | order(order asc) {
            "name": name,
            order
          },
          buttonText,
          buttonLink
        }`;
        const data = await client.fetch<IndustriesData>(query);
        setIndustries(data);
      } catch (error) {
        console.error("Błąd podczas pobierania branż:", error);
      }
    }

    async function fetchOfferStats() {
      try {
        const query = `*[_type == "offerStats"][0] {
          "title": title,
          "description": description,
          "stats": stats[] | order(order asc) {
            value,
            "label": label,
            icon,
            order
          }
        }`;
        const data = await client.fetch<OfferStatsData>(query);
        setOfferStats(data);
      } catch (error) {
        console.error("Błąd podczas pobierania statystyk oferty:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTechnologies();
    fetchIndustries();
    fetchOfferStats();
  }, [locale]);

  return (
    <div className="min-h-screen">
      <section className="pt-[var(--page-top-offset)] pb-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-hero text-slate-900 mb-6">
              Technologia szyta na miarę
            </h2>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              worzymy dedykowane rozwiązania – od aplikacji webowych i
              mobilnych, przez integracje systemów, po rozwój i utrzymanie.
            </p>
          </div>
          <StatsPanel />
        </div>
      </section>

      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="heading-1 text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-michroma)" }}>
              {t("pageTitle")}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t("pageDescription")}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length > 0 ? (
            <div className="lg:grid grid-cols-3 items-center justify-center gap-6">
              {projects.map((project, index) => {
                if (!project.title && !project.description) return null;
                if (!project.slug) return null;
                return (
                  <PolygonCard
                    className="w-full mb-4 h-full"
                    key={index}
                    imageUrl={project.image || undefined}
                    title={project.title || ""}
                    description={project.description || ""}
                    href={`/${locale}/oferta/${project.slug}`}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">{t("noOffers")}</p>
            </div>
          )}
        </div>
      </section>

      {technologies &&
        technologies.categories &&
        technologies.categories.length > 0 && (
          <section className="py-24 border-t flex flex-col items-center justify-center border-gray-200 w-full overflow-x-hidden">
            <div className="max-w-[2000px] flex flex-col items-center justify-center w-full">
              <div className="max-w-7xl lg:px-8 px-4 sm:px-6 text-center mb-16">
                <h2
                  className="heading-1 text-slate-900 mb-6"
                  style={{ fontFamily: "var(--font-michroma)" }}>
                  {technologies.title?.[locale as "pl" | "en"] ||
                    technologies.title?.pl}
                </h2>
                {technologies.description && (
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    {technologies.description[locale as "pl" | "en"] ||
                      technologies.description.pl}
                  </p>
                )}
              </div>
              <TechnologiesMarquee data={technologies} />
            </div>
          </section>
        )}

      {industries && industries.items && industries.items.length > 0 && (
        <section className="py-24 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="heading-1 text-slate-900 mb-6"
                style={{ fontFamily: "var(--font-michroma)" }}>
                {industries.title?.[locale as "pl" | "en"] ||
                  industries.title?.pl}
              </h2>
              {industries.description && (
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  {industries.description[locale as "pl" | "en"] ||
                    industries.description.pl}
                </p>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {industries.items.map((industry, index) => {
                const industryName =
                  industry.name?.[locale as "pl" | "en"] || industry.name?.pl;
                if (!industryName) return null;
                return (
                  <div
                    key={index}
                    className="px-6 py-3 bg-blue-50 text-blue-900 rounded-full font-medium">
                    {industryName}
                  </div>
                );
              })}
            </div>
            {industries.buttonText && industries.buttonLink && (
              <div className="text-center">
                <Link href={industries.buttonLink}>
                  <StarGradientButton>
                    {industries.buttonText[locale as "pl" | "en"] ||
                      industries.buttonText.pl}
                  </StarGradientButton>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      <CTASection
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.buttonText")}
        buttonLink="/kontakt"
        className="py-24 border-t border-gray-200"
      />
    </div>
  );
}
