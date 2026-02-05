import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aplikacje webowe",
  description: "Tworzymy nowoczesne aplikacje webowe, które napędzają Twój biznes. Specjalizujemy się w aplikacjach React, Next.js, Node.js i pełnym stacku technologicznym.",
  keywords: [
    "aplikacje webowe",
    "aplikacje internetowe",
    "React",
    "Next.js",
    "Node.js",
    "rozwój aplikacji webowych",
    "aplikacje na zamówienie",
    "full stack development"
  ],
  openGraph: {
    title: "Aplikacje webowe | CetusPro",
    description: "Tworzymy nowoczesne aplikacje webowe, które napędzają Twój biznes.",
    url: "/oferta/aplikacje-webowe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CetusPro - Aplikacje webowe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aplikacje webowe | CetusPro",
    description: "Tworzymy nowoczesne aplikacje webowe, które napędzają Twój biznes.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/oferta/aplikacje-webowe",
  },
};

export default function WebAppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
