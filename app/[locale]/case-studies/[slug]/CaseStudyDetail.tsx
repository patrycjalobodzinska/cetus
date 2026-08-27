"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useTranslations } from "next-intl";
import Slider from "@/app/components/Slider";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Users,
  ShieldCheck,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Settings,
  User,
  Truck,
  Calendar,
  Tag,
  Database,
  Wine,
  Wallet,
  CreditCard,
  FileText,
  Lock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Users,
  ShieldCheck,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Settings,
  User,
  Truck,
  Calendar,
  Tag,
  Database,
  Wine,
  Wallet,
  CreditCard,
  FileText,
  Lock,
  Sparkles,
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function img(src: any, w = 1400) {
  if (!src) return "";
  return urlFor(src).width(w).quality(85).auto("format").url();
}

// ─── ramki makiet ───────────────────────────────────────────────────────────

function BrowserFrame({
  src,
  className = "",
  dark = false,
}: {
  src: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden shadow-xl ${
        dark ? "rounded-xl ring-[6px] ring-slate-500" : "rounded-2xl ring-1 ring-black/5"
      } bg-white ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {src && <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />}
      </div>
    </div>
  );
}

function PhoneFrame({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.4rem] bg-slate-900 p-1 shadow-2xl ring-1 ring-black/20 ${className}`}>
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.1rem] bg-slate-100">
        {src && <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />}
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
  className = "",
}: {
  icon?: LucideIcon;
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 ${className}`}>
      {Icon && (
        <div className="mb-3 inline-grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

function FeatureFloat({
  icon: Icon,
  title,
  text,
  className = "",
}: {
  icon?: LucideIcon;
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`w-64 rounded-xl bg-white/95 p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
        )}
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

// ─── Galeria z lightboxem ─────────────────────────────────────────────────────

function Gallery({ images }: { images: Array<{ url: string; caption?: string }> }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((o) => (o === null ? o : (o - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setOpen((o) => (o === null ? o : (o + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const Thumb = ({ im, i }: { im: { url: string; caption?: string }; i: number }) => (
    <button
      type="button"
      onClick={() => setOpen(i)}
      aria-label={`Powiększ zrzut ${i + 1}`}
      className="block w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={im.url}
          alt={im.caption || ""}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    </button>
  );

  return (
    <>
      {/* mobile: slider */}
      <Slider className="sm:hidden" slideWidth="82%" ariaLabel="Galeria projektu">
        {images.map((im, i) => (
          <Thumb key={i} im={im} i={i} />
        ))}
      </Slider>

      {/* sm+: siatka */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {images.map((im, i) => (
          <Thumb key={i} im={im} i={i} />
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Zamknij"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Poprzednie"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <figure className="max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[open].url}
              alt={images[open].caption || ""}
              className="mx-auto max-h-[82vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            {images[open].caption && (
              <figcaption className="mt-3 text-center text-sm text-white/70">
                {images[open].caption}
              </figcaption>
            )}
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Następne"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            {open + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Sekcje
// ═══════════════════════════════════════════════════════════════════════════════

function CsHero({ section, backToList }: { section: any; backToList: string }) {
  const meta = (section.meta || []).filter((m: any) => m?.value);
  const web = img(section.webImage, 1600);
  const phone = img(section.phoneImage, 900);
  return (
    <section className="grid items-center gap-10 lg:min-h-[88vh] lg:grid-cols-[1fr_1.3fr] lg:gap-3 pt-[var(--page-top-offset)] pb-[clamp(3rem,7vw,6rem)]">
      <div>
        <Link
          href="/case-studies"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          {backToList}
        </Link>
        {section.category && (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            {section.category}
          </p>
        )}
        {section.title && (
          <h1
            className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {section.title}
          </h1>
        )}
        {section.summary && (
          <p className="mt-6 max-w-md text-lg text-slate-600 leading-relaxed">{section.summary}</p>
        )}
        {meta.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {meta.map((m: any, i: number) => (
              <div key={i}>
                <dt className="text-xs uppercase tracking-wide text-slate-600">{m.label}</dt>
                <dd className="text-sm font-semibold text-slate-800">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {section.buttonLabel && (
          <div className="mt-8">
            <Link
              href={section.buttonHref || "/kontakt"}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {section.buttonLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      <div className="relative px-4 py-6">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/30 blur-3xl" />
        {web && <BrowserFrame src={web} dark className="w-full" />}
        {phone && <PhoneFrame src={phone} className="absolute -bottom-2 -right-1 w-24 sm:w-36 lg:w-44" />}
      </div>
    </section>
  );
}

function CsFeatures({ section }: { section: any }) {
  const items = section.items || [];
  const screenA = img(section.screenA, 1200);
  const screenB = img(section.screenB, 1200);
  const ic = (i: number) => (items[i]?.icon ? iconMap[items[i].icon] : undefined);

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 py-[clamp(4rem,9vw,9rem)]">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="mb-14 text-center">
          {section.eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">- {section.eyebrow}</p>
          )}
          {section.heading && (
            <h2
              className="mx-auto max-w-2xl text-slate-900 text-2xl sm:text-3xl lg:text-4xl leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              {section.heading}
            </h2>
          )}
        </div>

        {/* DESKTOP */}
        <div className="relative mx-auto hidden h-[46rem] max-w-6xl lg:block">
          {screenA && <BrowserFrame src={screenA} dark className="absolute left-0 top-0 z-0 w-[54%] -rotate-2 shadow-2xl" />}
          {screenB && <BrowserFrame src={screenB} dark className="absolute bottom-0 right-0 z-0 w-[54%] rotate-2 shadow-2xl" />}
          {items[2] && (
            <FeatureCard icon={ic(2)} title={items[2].title} text={items[2].text} className="absolute right-0 top-2 z-20 w-[38%]" />
          )}
          {items[3] && (
            <FeatureCard icon={ic(3)} title={items[3].title} text={items[3].text} className="absolute bottom-2 left-0 z-20 w-[38%]" />
          )}
          {items[0] && (
            <FeatureFloat icon={ic(0)} title={items[0].title} text={items[0].text} className="absolute left-0 top-0 z-30 -translate-x-24 -translate-y-12" />
          )}
          {items[1] && (
            <FeatureFloat icon={ic(1)} title={items[1].title} text={items[1].text} className="absolute bottom-0 right-0 z-30 translate-x-24 translate-y-12" />
          )}
        </div>

        {/* MOBILE: na przemian zdjęcie / treść, potem reszta kart */}
        <div className="space-y-6 lg:hidden">
          {screenA && <BrowserFrame src={screenA} dark className="w-full shadow-xl" />}
          {items[0] && (
            <FeatureCard icon={items[0].icon ? iconMap[items[0].icon] : undefined} title={items[0].title} text={items[0].text} />
          )}
          {screenB && <BrowserFrame src={screenB} dark className="w-full shadow-xl" />}
          {items[1] && (
            <FeatureCard icon={items[1].icon ? iconMap[items[1].icon] : undefined} title={items[1].title} text={items[1].text} />
          )}
          {items.slice(2).map((it: any, i: number) => (
            <FeatureCard key={i} icon={it.icon ? iconMap[it.icon] : undefined} title={it.title} text={it.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CsMetrics({ section }: { section: any }) {
  const items = (section.items || []).filter((m: any) => m?.value);
  if (!items.length) return null;
  return (
    <section className="py-[clamp(3rem,7vw,6rem)]">
      <div className="grid grid-cols-2 gap-6 rounded-3xl bg-slate-50 p-8 sm:p-10 lg:grid-cols-4">
        {items.map((m: any, i: number) => {
          const Icon = m.icon ? iconMap[m.icon] : undefined;
          return (
            <div key={i} className="text-center">
              {Icon && <Icon className="mx-auto mb-3 h-6 w-6 text-blue-600" strokeWidth={1.75} />}
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                {m.value}
              </div>
              <div className="mt-1 text-sm font-medium text-slate-600">{m.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CsAbout({ section }: { section: any }) {
  const paragraphs = section.paragraphs || [];
  if (!section.heading && !paragraphs.length) return null;
  return (
    <section className="py-[clamp(3rem,7vw,6rem)]">
      <div className="relative overflow-hidden rounded-3xl bg-slate-50 px-6 py-14 sm:px-12 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-blue-300/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-sky-200/20 blur-3xl" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-10 select-none text-[13rem] font-black leading-none text-slate-900/[0.04] sm:text-[18rem]"
        >
          ”
        </span>
        <div className="relative mx-auto max-w-3xl text-center">
          {section.eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">- {section.eyebrow}</p>
          )}
          {section.heading && (
            <h2
              className="text-slate-900 text-2xl sm:text-3xl lg:text-4xl leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              {section.heading}
            </h2>
          )}
          <div className="mx-auto mt-6 h-px w-16 bg-blue-600/40" />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-700">
            {paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CsOutcome({ section }: { section: any }) {
  const items = section.items || [];
  if (!items.length) return null;
  return (
    <section className="py-[clamp(3rem,7vw,6rem)]">
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((b: any, i: number) => (
          <div key={i} className="relative rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
            {/* Ozdobny numer karty - treść niesie tag i tekst poniżej, więc numer
                jest dekoracją (aria-hidden), a nie informacją o niskim kontraście. */}
            <span aria-hidden="true" className="text-5xl font-extrabold text-blue-600/15">
              0{i + 1}
            </span>
            <h3 className="mt-2 text-lg font-bold text-slate-900">{b.tag}</h3>
            {b.text && <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.text}</p>}
            {(b.points || []).length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                {b.points.map((p: string, j: number) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function CsScope({ section }: { section: any }) {
  const items = (section.items || []).filter((it: any) => it?.text);
  if (!items.length) return null;
  return (
    <section className="py-[clamp(3rem,7vw,6rem)]">
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr]">
          <div>
            {section.eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">- {section.eyebrow}</p>
            )}
            {section.heading && (
              <h2
                className="text-slate-900 text-2xl sm:text-3xl leading-tight"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                {section.heading}
              </h2>
            )}
          </div>
          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {items.map((it: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="text-sm text-slate-700">{it.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CsGallery({ section }: { section: any }) {
  const images = (section.images || [])
    .filter((im: any) => im?.asset)
    .map((im: any) => ({ url: img(im, 1600), caption: im.caption }));
  if (!images.length) return null;
  return (
    <section className="py-[clamp(3rem,7vw,6rem)]">
      <div className="mb-10 text-center">
        {section.eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">- {section.eyebrow}</p>
        )}
        {section.heading && (
          <h2 className="text-slate-900 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-michroma)" }}>
            {section.heading}
          </h2>
        )}
      </div>
      <Gallery images={images} />
    </section>
  );
}

function CsTech({ section }: { section: any }) {
  const items = (section.items || []).filter((t: any) => t?.name);
  if (!items.length) return null;
  return (
    <section className="py-[clamp(3rem,7vw,6rem)]">
      <div className="flex flex-col items-center gap-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          {section.heading || "Technologie"}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((t: any, i: number) => (
            <span
              key={i}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

interface CaseStudy {
  _id: string;
  sections?: Array<{ _key: string; _type: string; [k: string]: any }>;
}

export default function CaseStudyDetail({ caseStudy }: { caseStudy: CaseStudy }) {
  const t = useTranslations("caseStudyDetail");
  const backToList = t("backToList");

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {caseStudy.sections?.map((section) => {
          switch (section._type) {
            case "csHeroSection":
              return <CsHero key={section._key} section={section} backToList={backToList} />;
            case "csFeaturesSection":
              return <CsFeatures key={section._key} section={section} />;
            case "csMetricsSection":
              return <CsMetrics key={section._key} section={section} />;
            case "csAboutSection":
              return <CsAbout key={section._key} section={section} />;
            case "csOutcomeSection":
              return <CsOutcome key={section._key} section={section} />;
            case "csScopeSection":
              return <CsScope key={section._key} section={section} />;
            case "csGallerySection":
              return <CsGallery key={section._key} section={section} />;
            case "csTechSection":
              return <CsTech key={section._key} section={section} />;
            default:
              return null;
          }
        })}

        <div className="border-t border-gray-100 py-12">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-blue-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            {backToList}
          </Link>
        </div>
      </div>
    </div>
  );
}
