"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Info, AlertTriangle, Lightbulb } from "lucide-react";
import StarGradientButton from "@/app/components/ui/gradientBackground";
import { urlFor } from "@/sanity/lib/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BaseSection {
  _key: string;
  _type: string;
  variant?: string;
}

interface HeroSection extends BaseSection {
  _type: "bpHeroSection";
  variant?: "centered" | "cover" | "split";
  title?: string;
  category?: string;
  excerpt?: string;
  image?: any;
}

interface RichTextSection extends BaseSection {
  _type: "bpRichTextSection";
  variant?: "standard" | "wide";
  content?: any;
}

interface ImageSection extends BaseSection {
  _type: "bpImageSection";
  variant?: "contained" | "wide" | "full";
  image?: any;
  caption?: string;
  alt?: string;
}

interface QuoteSection extends BaseSection {
  _type: "bpQuoteSection";
  variant?: "centered" | "blockquote";
  quote?: string;
  author?: string;
  role?: string;
}

interface GalleryItem {
  _key: string;
  image?: any;
  caption?: string;
  alt?: string;
}

interface GallerySection extends BaseSection {
  _type: "bpGallerySection";
  variant?: "grid" | "carousel" | "masonry";
  sectionTitle?: string;
  galleryItems?: GalleryItem[];
}

interface CodeSection extends BaseSection {
  _type: "bpCodeSection";
  language?: string;
  filename?: string;
  code?: string;
}

interface VideoSection extends BaseSection {
  _type: "bpVideoSection";
  url?: string;
  caption?: string;
  title?: string;
}

interface ListSection extends BaseSection {
  _type: "bpListSection";
  variant?: "bullet" | "numbered" | "checklist";
  sectionTitle?: string;
  items?: string[];
}

interface CalloutSection extends BaseSection {
  _type: "bpCalloutSection";
  tone?: "info" | "success" | "warning" | "tip";
  title?: string;
  body?: string;
}

interface CtaSection extends BaseSection {
  _type: "bpCtaSection";
  variant?: "centered" | "banner";
  heading?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  blank?: boolean;
}

interface ButtonSection extends BaseSection {
  _type: "bpButtonSection";
  variant?: "primary" | "secondary" | "outline";
  align?: "left" | "center" | "right";
  buttonLabel?: string;
  buttonHref?: string;
  blank?: boolean;
  image?: any;
}

type Section =
  | HeroSection
  | RichTextSection
  | ImageSection
  | QuoteSection
  | GallerySection
  | CodeSection
  | VideoSection
  | ListSection
  | CalloutSection
  | CtaSection
  | ButtonSection;

interface BlogPost {
  _id: string;
  title?: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  author?: { name?: string; role?: string; avatar?: any };
  tags?: string[];
  sections?: Section[];
}

// ─── PortableText config ──────────────────────────────────────────────────────

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-slate-700 leading-relaxed text-lg mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2
        className="text-3xl md:text-4xl font-semibold text-slate-900 mt-12 mb-5"
        style={{ fontFamily: "var(--font-michroma)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-slate-900 mt-8 mb-3">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 my-8 italic text-slate-700 text-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-5 text-slate-700 text-lg">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-5 text-slate-700 text-lg">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[0.9em] font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = value?.blank || /^https?:/i.test(href);
      return isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
        >
          {children}
        </Link>
      );
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function widthClass(variant?: string) {
  switch (variant) {
    case "wide":
      return "max-w-7xl";
    case "full":
      return "max-w-none";
    case "standard":
    default:
      return "max-w-5xl";
  }
}

function getYouTubeId(url: string) {
  const m = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  return m ? m[1] : null;
}

function getVimeoId(url: string) {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

const isExternalHref = (href?: string) => !!href && /^(https?:|mailto:|tel:)/i.test(href);

// Renderuje <a> dla linków zewnętrznych / "nowa karta", a next/link dla wewnętrznych.
function ActionLink({
  href,
  blank,
  className,
  children,
}: {
  href: string;
  blank?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const external = isExternalHref(href);
  const newTab = blank === undefined ? external : blank;

  if (external || newTab) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// ─── Section components ──────────────────────────────────────────────────────

function BpHero({ variant = "centered", title, category, excerpt, image }: HeroSection) {
  if (variant === "cover" && image) {
    return (
      <section className="relative pt-[var(--page-top-offset)] pb-20">
        <div className="relative w-full h-[60vh] min-h-[420px] overflow-hidden">
          <Image
            src={urlFor(image).width(1920).height(1080).url()}
            alt={title || ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
              {category && (
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                  {category}
                </span>
              )}
              {title && (
                <h1
                  className="heading-1 text-white"
                  style={{ fontFamily: "var(--font-michroma)" }}
                >
                  {title}
                </h1>
              )}
              {excerpt && (
                <p className="mt-4 text-lg text-white/90 max-w-3xl">{excerpt}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className="pt-28 md:pt-32 lg:pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            {category && (
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-5">
                {category}
              </span>
            )}
            {title && (
              <h1
                className="heading-1 text-slate-900"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                {title}
              </h1>
            )}
            {excerpt && (
              <p className="mt-5 text-lg text-slate-600 leading-relaxed">{excerpt}</p>
            )}
          </div>
          {image && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={urlFor(image).width(1000).height(750).url()}
                alt={title || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  // centered
  return (
    <section className="pt-28 md:pt-32 lg:pt-36 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {category && (
          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-5">
            {category}
          </span>
        )}
        {title && (
          <h1
            className="heading-1 text-slate-900"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {title}
          </h1>
        )}
        {excerpt && (
          <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed">
            {excerpt}
          </p>
        )}
        {image && (
          <div className="relative mt-8 aspect-[21/9] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={urlFor(image).width(1600).height(686).url()}
              alt={title || ""}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function BpRichText({ variant, content }: RichTextSection) {
  if (!content || !Array.isArray(content) || content.length === 0) return null;
  return (
    <section className="py-8">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${widthClass(variant)}`}>
        <PortableText value={content} components={portableTextComponents} />
      </div>
    </section>
  );
}

function BpImage({ variant = "contained", image, caption, alt }: ImageSection) {
  if (!image) return null;

  if (variant === "full") {
    return (
      <section className="py-8">
        <figure>
          <div className="relative w-full aspect-[21/9]">
            <Image
              src={urlFor(image).width(1920).url()}
              alt={alt || caption || ""}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-600 italic px-4">
              {caption}
            </figcaption>
          )}
        </figure>
      </section>
    );
  }

  const wrapper = variant === "wide" ? "max-w-7xl" : "max-w-5xl";

  return (
    <section className="py-8">
      <figure className={`mx-auto px-4 sm:px-6 lg:px-8 ${wrapper}`}>
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-md">
          <Image
            src={urlFor(image).width(1400).url()}
            alt={alt || caption || ""}
            fill
            sizes={variant === "wide" ? "(max-width: 1024px) 100vw, 1000px" : "(max-width: 1024px) 100vw, 800px"}
            className="object-cover"
          />
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-slate-600 italic">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}

function BpQuote({ variant = "centered", quote, author, role }: QuoteSection) {
  if (!quote) return null;
  if (variant === "blockquote") {
    return (
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-blue-600 pl-6">
            <p className="text-xl md:text-2xl text-slate-700 italic leading-relaxed mb-4">
              “{quote}”
            </p>
            {(author || role) && (
              <footer className="text-slate-600 text-sm">
                {author && <span className="font-medium">{author}</span>}
                {author && role && <span> — </span>}
                {role && <span>{role}</span>}
              </footer>
            )}
          </blockquote>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-2xl md:text-3xl text-slate-700 italic font-light leading-relaxed">
          “{quote}”
        </p>
        {(author || role) && (
          <p className="mt-6 text-slate-600">
            {author && <span className="font-medium">{author}</span>}
            {author && role && <span> — </span>}
            {role && <span>{role}</span>}
          </p>
        )}
      </div>
    </section>
  );
}

function BpGallery({ variant = "grid", sectionTitle, galleryItems = [] }: GallerySection) {
  if (!galleryItems.length) return null;

  if (variant === "carousel") {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sectionTitle && (
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">{sectionTitle}</h2>
          )}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
            {galleryItems.map((item) =>
              item.image ? (
                <figure
                  key={item._key}
                  className="shrink-0 w-[85%] sm:w-[60%] lg:w-[45%] snap-start"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={urlFor(item.image).width(1000).url()}
                      alt={item.alt || item.caption || ""}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  {item.caption && (
                    <figcaption className="mt-2 text-sm text-slate-600 italic">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ) : null
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "masonry") {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sectionTitle && (
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">{sectionTitle}</h2>
          )}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {galleryItems.map((item) =>
              item.image ? (
                <figure key={item._key} className="mb-4 break-inside-avoid">
                  <Image
                    src={urlFor(item.image).width(800).url()}
                    alt={item.alt || item.caption || ""}
                    width={800}
                    height={600}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                  {item.caption && (
                    <figcaption className="mt-2 text-xs text-slate-600 italic">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ) : null
            )}
          </div>
        </div>
      </section>
    );
  }

  // grid
  const cols = galleryItems.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sectionTitle && (
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">{sectionTitle}</h2>
        )}
        <div className={`grid grid-cols-1 gap-4 ${cols}`}>
          {galleryItems.map((item) =>
            item.image ? (
              <figure key={item._key}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={urlFor(item.image).width(800).height(600).url()}
                    alt={item.alt || item.caption || ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {item.caption && (
                  <figcaption className="mt-2 text-sm text-slate-600 italic">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}

function BpCode({ language = "text", filename, code }: CodeSection) {
  if (!code) return null;
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
          {(filename || language) && (
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-slate-300 text-xs">
              <span className="font-mono">{filename || ""}</span>
              <span className="uppercase tracking-wider">{language}</span>
            </div>
          )}
          <pre className="overflow-x-auto px-4 py-4 text-sm text-slate-100">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function BpVideo({ url, caption, title }: VideoSection) {
  if (!url) return null;
  const youTubeId = getYouTubeId(url);
  const vimeoId = !youTubeId ? getVimeoId(url) : null;
  const embedSrc = youTubeId
    ? `https://www.youtube-nocookie.com/embed/${youTubeId}`
    : vimeoId
      ? `https://player.vimeo.com/video/${vimeoId}`
      : null;

  return (
    <section className="py-8">
      <figure className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
          {embedSrc ? (
            <iframe
              src={embedSrc}
              title={title || caption || "video"}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video src={url} controls className="absolute inset-0 w-full h-full" />
          )}
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-slate-600 italic">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}

function BpList({ variant = "bullet", sectionTitle, items = [] }: ListSection) {
  if (!items.length) return null;
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {sectionTitle && (
          <h2 className="text-2xl font-semibold text-slate-900 mb-5">{sectionTitle}</h2>
        )}
        {variant === "numbered" ? (
          <ol className="list-decimal pl-6 space-y-2 text-slate-700 text-lg">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ol>
        ) : variant === "checklist" ? (
          <ul className="space-y-3">
            {items.map((it, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 text-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="list-disc pl-6 space-y-2 text-slate-700 text-lg">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function BpCallout({ tone = "info", title, body }: CalloutSection) {
  if (!title && !body) return null;

  const toneMap = {
    info: { bg: "bg-blue-50", border: "border-blue-200", icon: Info, color: "text-blue-600" },
    success: { bg: "bg-emerald-50", border: "border-emerald-200", icon: CheckCircle2, color: "text-emerald-600" },
    warning: { bg: "bg-amber-50", border: "border-amber-200", icon: AlertTriangle, color: "text-amber-600" },
    tip: { bg: "bg-violet-50", border: "border-violet-200", icon: Lightbulb, color: "text-violet-600" },
  } as const;

  const config = toneMap[tone] || toneMap.info;
  const Icon = config.icon;

  return (
    <section className="py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-xl border ${config.border} ${config.bg} p-5 flex gap-4`}>
          <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.color}`} />
          <div>
            {title && <p className="font-semibold text-slate-900 mb-1">{title}</p>}
            {body && <p className="text-slate-700 leading-relaxed">{body}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function BpCta({
  variant = "centered",
  heading,
  description,
  buttonLabel,
  buttonHref = "/kontakt",
  blank,
}: CtaSection) {
  if (!heading && !description) return null;
  if (variant === "banner") {
    return (
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 px-8 py-12 text-center text-white">
            {heading && (
              <h2
                className="heading-1 text-white mb-4"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">{description}</p>
            )}
            {buttonLabel && (
              <ActionLink href={buttonHref} blank={blank}>
                <StarGradientButton>{buttonLabel}</StarGradientButton>
              </ActionLink>
            )}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {heading && (
          <h2
            className="heading-1 text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">{description}</p>
        )}
        {buttonLabel && (
          <ActionLink href={buttonHref} blank={blank}>
            <StarGradientButton>{buttonLabel}</StarGradientButton>
          </ActionLink>
        )}
      </div>
    </section>
  );
}

function BpButton({
  variant = "primary",
  align = "center",
  buttonLabel,
  buttonHref,
  blank,
  image,
}: ButtonSection) {
  if (!buttonLabel || !buttonHref) return null;

  const external = isExternalHref(buttonHref);
  const base =
    "inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-300";
  const styles: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5",
    secondary:
      "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:-translate-y-0.5",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };
  const itemsClass =
    align === "left" ? "items-start" : align === "right" ? "items-end" : "items-center";
  const objectPos =
    align === "left" ? "object-left" : align === "right" ? "object-right" : "object-center";
  const Icon = external ? ArrowUpRight : ArrowRight;

  return (
    <section className="py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col gap-5 ${itemsClass}`}>
          {image && (
            <div className="relative h-14 w-56">
              <Image
                src={urlFor(image).height(160).url()}
                alt={buttonLabel}
                fill
                sizes="224px"
                className={`object-contain ${objectPos}`}
              />
            </div>
          )}
          <ActionLink
            href={buttonHref}
            blank={blank}
            className={`${base} ${styles[variant] || styles.primary}`}
          >
            <span>{buttonLabel}</span>
            <Icon className="w-4 h-4" />
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────

const sectionComponents: Record<string, React.ComponentType<any>> = {
  bpHeroSection: BpHero,
  bpRichTextSection: BpRichText,
  bpImageSection: BpImage,
  bpQuoteSection: BpQuote,
  bpGallerySection: BpGallery,
  bpCodeSection: BpCode,
  bpVideoSection: BpVideo,
  bpListSection: BpList,
  bpCalloutSection: BpCallout,
  bpCtaSection: BpCta,
  bpButtonSection: BpButton,
};

// ─── Main export ──────────────────────────────────────────────────────────────

function formatDate(iso: string | undefined, locale: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(locale === "pl" ? "pl-PL" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function BlogPostDetail({
  post,
  locale,
}: {
  post: BlogPost;
  locale: string;
}) {
  const hasCustomHero = post.sections?.some((s) => s._type === "bpHeroSection");
  // Data i autor idą zaraz pod nagłówkiem wpisu. Gdy wpis ma własne hero
  // z Sanity, ten pasek musi wylądować PO nim - wcześniej renderował się
  // przed sekcjami, czyli nad hero i pod przyklejonym menu, więc daty
  // praktycznie nie było widać.
  const heroIndex = post.sections?.findIndex((s) => s._type === "bpHeroSection") ?? -1;

  const meta = (post.author?.name || post.publishedAt) && (
    <div className="mx-auto mb-10 flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 text-sm text-slate-600 sm:px-6 lg:px-8">
      {post.author?.avatar && (
        <div className="relative h-9 w-9 overflow-hidden rounded-full">
          <Image
            src={urlFor(post.author.avatar).width(72).height(72).url()}
            alt={post.author.name || ""}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
      )}
      {post.author?.name && (
        <span>
          <span className="font-medium text-slate-700">{post.author.name}</span>
          {post.author.role && <span> · {post.author.role}</span>}
        </span>
      )}
      {post.author?.name && post.publishedAt && <span aria-hidden="true">·</span>}
      {post.publishedAt && (
        <time dateTime={post.publishedAt} className="font-medium text-slate-700">
          {formatDate(post.publishedAt, locale)}
        </time>
      )}
    </div>
  );

  return (
    <article className="min-h-screen">
      {!hasCustomHero && (
        <section className="pt-28 md:pt-32 lg:pt-36 pb-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {post.category && (
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-5">
                {post.category}
              </span>
            )}
            {post.title && (
              <h1
                className="heading-1 text-slate-900"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                {post.title}
              </h1>
            )}
            {post.excerpt && (
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>
            )}
          </div>
        </section>
      )}

      {heroIndex < 0 && meta}

      {post.sections?.map((section, i) => {
        const Component = sectionComponents[section._type];
        if (!Component) return null;
        return (
          <Fragment key={section._key}>
            <Component {...section} />
            {i === heroIndex && meta}
          </Fragment>
        );
      })}

      {post.tags && post.tags.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <section className="py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200 hover:border-blue-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">
              {locale === "pl" ? "Wszystkie wpisy" : "All posts"}
            </span>
          </Link>
        </div>
      </section>
    </article>
  );
}
