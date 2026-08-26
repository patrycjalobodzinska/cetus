"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TechnologiesMarquee from "@/app/components/TechnologiesMarquee";
import StatsPanel from "@/app/components/StatsPanel";
import CTASection from "@/app/components/CTASection";
import OfferServiceCard from "../components/OfferServiceCard";
import { ArrowRight } from "lucide-react";
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
      <section className="pt-[var(--page-top-offset)] pb-[clamp(2.5rem,5vw,4rem)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              - {t("pageTitle")}
            </p>
            <h1 className="heading-hero text-slate-900">{t("heroTitle")}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 text-pretty">
              {t("heroDescription")}
            </p>
          </div>
          <StatsPanel />
        </div>
      </section>

      <section className="section-y relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title mx-auto max-w-4xl text-slate-900">
              {t("pageTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 text-pretty">
              {t("pageDescription")}
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) =>
                project.slug && (project.title || project.description) ? (
                  <OfferServiceCard
                    key={project.slug}
                    index={index}
                    title={project.title || ""}
                    description={project.description || ""}
                    href={`/${locale}/oferta/${project.slug}`}
                    cta={t("cardCta")}
                    feature={index === 0}
                  />
                ) : null,
              )}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-600">{t("noOffers")}</p>
            </div>
          )}
        </div>
      </section>

      {technologies &&
        technologies.categories &&
        technologies.categories.length > 0 && (
          <section className="section-y relative flex w-full flex-col items-center justify-center overflow-x-hidden">
            <div className="flex w-full max-w-[2000px] flex-col items-center justify-center">
              <div className="mb-12 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="section-title mx-auto max-w-4xl text-slate-900">
                  {technologies.title?.[locale as "pl" | "en"] ||
                    technologies.title?.pl}
                </h2>
                {technologies.description && (
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 text-pretty">
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
        <section className="section-y relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="section-title mx-auto max-w-4xl text-slate-900">
                {industries.title?.[locale as "pl" | "en"] ||
                  industries.title?.pl}
              </h2>
              {industries.description && (
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 text-pretty">
                  {industries.description[locale as "pl" | "en"] ||
                    industries.description.pl}
                </p>
              )}
            </div>
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {industries.items.map((industry, index) => {
                const industryName =
                  industry.name?.[locale as "pl" | "en"] || industry.name?.pl;
                if (!industryName) return null;
                return (
                  <div
                    key={index}
                    className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm">
                    {industryName}
                  </div>
                );
              })}
            </div>
            {industries.buttonText && industries.buttonLink && (
              <div className="text-center">
                <Link
                  href={industries.buttonLink}
                  className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-slate-800">
                  {industries.buttonText[locale as "pl" | "en"] ||
                    industries.buttonText.pl}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
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
      />
    </div>
  );
}
