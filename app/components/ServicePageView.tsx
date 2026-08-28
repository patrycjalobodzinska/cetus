"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import { ArrowRight, CheckCircle } from "lucide-react";
import StarGradientButton from "@/app/components/ui/gradientBackground";
import PolygonAccordion from "@/app/components/PolygonAccordion";
import ObfuscatedEmail from "@/app/components/ObfuscatedEmail";
import type {
  ServicePageData,
  Section,
  Locale,
} from "@/sanity/lib/servicePage";
import { L, LA } from "@/sanity/lib/servicePage";

export default function ServicePageView({
  data,
  heroImageSrc,
  heroImageAlt,
}: {
  data: ServicePageData;
  heroImageSrc?: string;
  heroImageAlt?: string;
}) {
  const locale = useLocale() as Locale;
  const hasHeroImage = Boolean(heroImageSrc);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Odstęp pod nagłówkiem bierzemy z tej samej zmiennej co reszta
          podstron - `pt-24` (96 px) było mniejsze niż wysokość paska nagłówka
          plus jego ujemny margines, więc na mobile hero wchodził pod nagłówek. */}
      <section className="pt-[var(--page-top-offset)] pb-8 md:pb-12 relative overflow-hidden bg-gradient-to-b from-blue-50 via-cyan-50/40 to-white">
        {/* Kolorowe, rozmyte plamy w tle hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-0 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-14 relative z-10">
          {hasHeroImage ? (
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <h1
                  className="heading-hero text-slate-900 leading-tight"
                  style={{ fontFamily: "var(--font-michroma)" }}>
                  {L(data.heroTitle, locale)}
                </h1>
                {data.heroDescription && (
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {L(data.heroDescription, locale)}
                  </p>
                )}
                {data.heroButtonText && (
                  <div className="flex justify-center lg:justify-start pt-4">
                    <Link href={data.heroButtonLink || "/kontakt"}>
                      <StarGradientButton>
                        <span className="flex items-center gap-2">
                          {L(data.heroButtonText, locale)}
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </StarGradientButton>
                    </Link>
                  </div>
                )}
              </div>
              <div
                className="rounded-3xl p-1 shadow-xl shadow-blue-500/20"
                style={{
                  background:
                    "linear-gradient(135deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
                }}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.35rem]">
                  <Image
                    src={heroImageSrc as string}
                    alt={heroImageAlt || L(data.heroTitle, locale) || ""}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <h1
                className="heading-hero text-slate-900 leading-tight"
                style={{ fontFamily: "var(--font-michroma)" }}>
                {L(data.heroTitle, locale)}
              </h1>
              {data.heroDescription && (
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  {L(data.heroDescription, locale)}
                </p>
              )}
              {data.heroButtonText && (
                <div className="flex justify-center pt-4">
                  <Link href={data.heroButtonLink || "/kontakt"}>
                    <StarGradientButton>
                      <span className="flex items-center gap-2">
                        {L(data.heroButtonText, locale)}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </StarGradientButton>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="pt-8 md:pt-16">
        {data.sections?.map((section) => (
          <SectionRenderer key={section._key} section={section} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function SectionRenderer({
  section,
  locale,
}: {
  section: Section;
  locale: Locale;
}) {
  switch (section._type) {
    case "gridSection":
      return <GridSectionView section={section} locale={locale} />;
    case "tabsSection":
      return <TabsSectionView section={section} locale={locale} />;
    case "stepsSection":
      return <StepsSectionView section={section} locale={locale} />;
    case "checklistSection":
      return <ChecklistSectionView section={section} locale={locale} />;
    case "caseStudyBlock":
      return <CaseStudyBlockView section={section} locale={locale} />;
    case "ctaBlock":
      return <CtaBlockView section={section} locale={locale} />;
    default:
      return null;
  }
}

function SectionHeader({
  title,
  description,
  locale,
}: {
  title?: any;
  description?: any;
  locale: Locale;
}) {
  const titleText = L(title, locale);
  const descText = L(description, locale);
  if (!titleText && !descText) return null;
  return (
    <div className="text-center mb-8 md:mb-12">
      {titleText && (
        <h2
          className="heading-1 text-slate-900 mb-4 leading-tight"
          style={{ fontFamily: "var(--font-michroma)" }}>
          {titleText}
        </h2>
      )}
      {descText && (
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {descText}
        </p>
      )}
    </div>
  );
}

function GridSectionView({
  section,
  locale,
}: {
  section: Extract<Section, { _type: "gridSection" }>;
  locale: Locale;
}) {
  if (!section.items?.length) return null;
  return (
    <section className="md:py-20 py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={section.title}
          description={section.description}
          locale={locale}
        />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {section.items.map((item) => (
            <div
              key={item._key}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600/30 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                {L(item.title, locale)}
              </h3>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                {L(item.description, locale)}
              </p>
              <div className="mt-6 h-1 w-16 bg-blue-600 rounded-full group-hover:w-24 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TabsSectionView({
  section,
  locale,
}: {
  section: Extract<Section, { _type: "tabsSection" }>;
  locale: Locale;
}) {
  const [active, setActive] = useState(0);
  if (!section.items?.length) return null;
  const activeItem = section.items[active];
  return (
    <section className="md:py-20 py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={section.title}
          description={section.description}
          locale={locale}
        />
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-3">
            {section.items.map((item, i) => (
              <PolygonAccordion
                key={item._key}
                title={L(item.title, locale)}
                isOpen={false}
                onToggle={() => setActive(i)}
                variant="button"
                isActive={active === i}>
                {null}
              </PolygonAccordion>
            ))}
          </div>
          <div
            style={{
              background:
                "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
            }}
            className="self-start rounded-md shadow-md shadow-blue-300 p-0.5">
            <div className="space-y-6 bg-white rounded-md p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                {L(activeItem?.title, locale)}
              </h3>
              {activeItem?.description && (
                <p className="text-slate-600 leading-relaxed">
                  {L(activeItem.description, locale)}
                </p>
              )}
              {LA(activeItem?.applications, locale).length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {locale === "pl" ? "Zastosowania" : "Applications"}
                  </h4>
                  <ul className="space-y-2">
                    {LA(activeItem.applications, locale).map((app, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-700">
                        <CheckCircle
                          className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {L(activeItem?.effect, locale) && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    {locale === "pl" ? "Efekt" : "Effect"}
                  </p>
                  <p className="text-slate-700">
                    {L(activeItem.effect, locale)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepsSectionView({
  section,
  locale,
}: {
  section: Extract<Section, { _type: "stepsSection" }>;
  locale: Locale;
}) {
  if (!section.steps?.length) return null;
  return (
    <section className="md:py-20 py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={section.title}
          description={section.description}
          locale={locale}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {section.steps.map((step, i) => (
            <div
              key={step._key}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-all">
              <div className="text-5xl font-bold text-blue-600 leading-none mb-4 select-none">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
                {L(step.title, locale)}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {L(step.description, locale)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChecklistSectionView({
  section,
  locale,
}: {
  section: Extract<Section, { _type: "checklistSection" }>;
  locale: Locale;
}) {
  const items = LA(section.items, locale);
  if (!items.length) return null;
  return (
    <section className="md:py-12 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={section.title}
          description={section.description}
          locale={locale}
        />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
              <CheckCircle
                className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CaseStudyBlockView({
  section,
  locale,
}: {
  section: Extract<Section, { _type: "caseStudyBlock" }>;
  locale: Locale;
}) {
  const title = L(section.title, locale);
  const goal = L(section.goal, locale);
  const solution = L(section.solution, locale);
  const results = LA(section.results, locale);
  if (!title && !goal && !results.length) return null;
  return (
    <section className="md:py-20 py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-3xl p-8 md:p-12 text-white">
          {title && (
            <h2
              className="text-2xl md:text-3xl font-black mb-6"
              style={{ fontFamily: "var(--font-michroma)" }}>
              {title}
            </h2>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {goal && (
              <div>
                <p className="text-sm uppercase tracking-wider text-blue-200 mb-2">
                  {locale === "pl" ? "Cel" : "Goal"}
                </p>
                <p className="text-base md:text-lg leading-relaxed">{goal}</p>
              </div>
            )}
            {solution && (
              <div>
                <p className="text-sm uppercase tracking-wider text-blue-200 mb-2">
                  {locale === "pl" ? "Rozwiązanie" : "Solution"}
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  {solution}
                </p>
              </div>
            )}
          </div>
          {results.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm uppercase tracking-wider text-blue-200 mb-4">
                {locale === "pl" ? "Rezultaty" : "Results"}
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {results.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle
                      className="w-5 h-5 text-blue-200 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CtaBlockView({
  section,
  locale,
}: {
  section: Extract<Section, { _type: "ctaBlock" }>;
  locale: Locale;
}) {
  const title = L(section.title, locale);
  const description = L(section.description, locale);
  const buttonText = L(section.buttonText, locale);
  if (!title && !buttonText) return null;
  return (
    <section className="md:py-20 py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <h2
            className="heading-1 text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}>
            {title}
          </h2>
        )}
        {description && (
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {buttonText && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={section.buttonLink || "/kontakt"}>
              <StarGradientButton>
                <span className="flex items-center gap-2">
                  {buttonText}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </StarGradientButton>
            </Link>
            {section.emailToken && (
              <ObfuscatedEmail
                token={section.emailToken}
                className="text-blue-600 hover:underline"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
