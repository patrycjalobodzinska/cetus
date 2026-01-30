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
