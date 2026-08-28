import type { Metadata } from "next";
import SmoothScroll from "../components/SmoothScroll";
import PreFooterCTA from "@/app/components/PreFooterCTA";
import Footer from "../components/Footer";
import NavbarCurosora from "../components/NavbarCurosora";
import NavigationProvider from "../components/NavigationProvider";
import HiddenCaseStudiesAccess from "../components/HiddenCaseStudiesAccess";
import { ConsentProvider } from "@/app/components/consent/ConsentProvider";
import CookieBanner from "@/app/components/consent/CookieBanner";
import ClarityScript from "@/app/components/consent/ClarityScript";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://cetuspro.com",
  ),
  title: {
    default: "CETUSPRO - Nowoczesne rozwiązania IT i aplikacje webowe",
    template: "%s | CETUSPRO",
  },
  description:
    "CETUSPRO - Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT. Specjalizujemy się w szybkim prototypowaniu, cyberbezpieczeństwie, AI i automatyzacji procesów.",
  keywords: [
    "aplikacje webowe",
    "aplikacje mobilne",
    "rozwój oprogramowania",
    "fast prototyping",
    "cyberbezpieczeństwo",
    "AI i automatyzacja",
    "outsourcing programistów",
    "CETUSPRO",
  ],
  authors: [{ name: "CETUSPRO" }],
  creator: "CETUSPRO",
  publisher: "CETUSPRO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: "CETUSPRO",
    title: "CETUSPRO - Nowoczesne rozwiązania IT i aplikacje webowe",
    description:
      "Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT. Specjalizujemy się w projektowaniu UX/UI, cyberbezpieczeństwie, AI i automatyzacji procesów.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CETUSPRO - Nowoczesne rozwiązania IT i aplikacje webowe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CETUSPRO - Nowoczesne rozwiązania IT",
    description:
      "Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      pl: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  icons: {
    icon: [{ url: "/smalllogo.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/smalllogo.png",
    apple: [{ url: "/smalllogo.png", sizes: "180x180", type: "image/png" }],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cetuspro.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "CETUSPRO",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/smalllogo.png`,
          width: 512,
          height: 512,
        },
        // Bez pola `email` - JSON-LD to czysty tekst w HTML, więc adres
        // wpisany tutaj obchodzi całą ochronę z ObfuscatedEmail. Zamiast
        // adresu wskazujemy stronę kontaktu (schema.org: `url`).
        contactPoint: {
          "@type": "ContactPoint",
          url: `${siteUrl}/pl/kontakt`,
          contactType: "customer service",
          availableLanguage: ["Polish", "English"],
        },
        sameAs: [
          "https://www.facebook.com/cetusprocom/?locale=pl_PL",
          "https://www.instagram.com/cetuspro/",
          "https://pl.linkedin.com/company/cetuspro",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "CETUSPRO",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: ["pl", "en"],
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${siteUrl}/#navigation`,
        name: "Main Navigation",
        hasPart: [
          {
            "@type": "SiteNavigationElement",
            name: locale === "pl" ? "Strona główna" : "Home",
            url: siteUrl,
          },
          {
            "@type": "SiteNavigationElement",
            name: locale === "pl" ? "Oferta" : "Services",
            url: `${siteUrl}/oferta`,
          },
          {
            "@type": "SiteNavigationElement",
            name: locale === "pl" ? "Kontakt" : "Contact",
            url: `${siteUrl}/kontakt`,
          },
          {
            "@type": "SiteNavigationElement",
            name: locale === "pl" ? "Aplikacje webowe" : "Web Applications",
            url: `${siteUrl}/oferta/aplikacje-webowe`,
          },
          {
            "@type": "SiteNavigationElement",
            name: locale === "pl" ? "Aplikacje mobilne" : "Mobile Applications",
            url: `${siteUrl}/oferta/aplikacje-mobilne`,
          },
          {
            "@type": "SiteNavigationElement",
            name: "Fast Prototyping",
            url: `${siteUrl}/oferta/fast-prototyping`,
          },
          {
            "@type": "SiteNavigationElement",
            name: locale === "pl" ? "AI i automatyzacja" : "AI and Automation",
            url: `${siteUrl}/oferta/aI-i-automatyzacja-procesow`,
          },
          {
            "@type": "SiteNavigationElement",
            name: "Cybersecurity",
            url: `${siteUrl}/oferta/cybersecurity`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {/* Zgody muszą obejmować cały dokument: Clarity i osadzone ramki
            pytają o nie z różnych miejsc drzewa. */}
        <ConsentProvider>
        <NavigationProvider>
          <SmoothScroll>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
              {t("skipToContent.skipToContent")}
            </a>
            <NavbarCurosora />
            <main id="main-content" className=" top-0 left-0 w-full h-full">
              {children}
              {/* wspólna zachęta do kontaktu tuż nad stopką */}
              <PreFooterCTA />
              <Footer />
            </main>
            <HiddenCaseStudiesAccess />
          </SmoothScroll>
        </NavigationProvider>
        <CookieBanner />
        <ClarityScript />
        </ConsentProvider>
      </NextIntlClientProvider>
    </>
  );
}
