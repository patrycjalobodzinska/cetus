import type { Metadata } from "next";
import SmoothScroll from "../components/SmoothScroll";
import Footer from "../components/Footer";
import NavbarCurosora from "../components/NavbarCurosora";
import NavigationProvider from "../components/NavigationProvider";
import Plasma from "../components/Plasma";
import HiddenCaseStudiesAccess from "../components/HiddenCaseStudiesAccess";
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
    default: "CetusPro - Nowoczesne rozwiązania IT i aplikacje webowe",
    template: "%s | CetusPro",
  },
  description:
    "CetusPro - Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT. Specjalizujemy się w projektowaniu UX/UI, cyberbezpieczeństwie, AI i automatyzacji procesów.",
  keywords: [
    "aplikacje webowe",
    "aplikacje mobilne",
    "rozwój oprogramowania",
    "UX/UI design",
    "cyberbezpieczeństwo",
    "AI i automatyzacja",
    "outsourcing programistów",
    "transformacja technologiczna",
    "CetusPro",
  ],
  authors: [{ name: "CetusPro" }],
  creator: "CetusPro",
  publisher: "CetusPro",
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
    siteName: "CetusPro",
    title: "CetusPro - Nowoczesne rozwiązania IT i aplikacje webowe",
    description:
      "Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT. Specjalizujemy się w projektowaniu UX/UI, cyberbezpieczeństwie, AI i automatyzacji procesów.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CetusPro - Nowoczesne rozwiązania IT i aplikacje webowe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CetusPro - Nowoczesne rozwiązania IT",
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logocetus.png",
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
        name: "CetusPro",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logocetus.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "kontakt@cetuspro.pl",
          contactType: "customer service",
          availableLanguage: ["Polish", "English"],
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "CetusPro",
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
            name: locale === "pl" ? "O nas" : "About Us",
            url: `${siteUrl}/o-nas`,
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
            name: "UX/UI Design",
            url: `${siteUrl}/oferta/ui-ux-design`,
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
        <NavigationProvider>
          <SmoothScroll>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
              {t("skipToContent.skipToContent")}
            </a>
            <NavbarCurosora />
            <div
              className="fixed top-0"
              style={{
                width: "100%",
                height: "120vh",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: -10,
              }}>
              <Plasma
                color="#0073ff"
                speed={1.2}
                direction="pingpong"
                scale={0.4}
                mouseInteractive={false}
                opacity={0.35}
              />
            </div>
            <main id="main-content" className=" top-0 left-0 w-full h-full">
              {children}
              <Footer />
            </main>
            <HiddenCaseStudiesAccess />
          </SmoothScroll>
        </NavigationProvider>
      </NextIntlClientProvider>
    </>
  );
}
