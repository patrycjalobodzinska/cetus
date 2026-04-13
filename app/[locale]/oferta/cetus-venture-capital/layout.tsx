import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cetus Venture Capital",
  description: "Inwestujemy w innowacyjne startupy technologiczne. Oferujemy kapital, mentoring i wsparcie technologiczne dla ambitnych projektow.",
  keywords: [
    "venture capital",
    "inwestycje w startupy",
    "finansowanie startupow",
    "kapital technologiczny",
    "akcelerator",
    "inwestor technologiczny",
  ],
  openGraph: {
    title: "Cetus Venture Capital | CetusPro",
    description: "Inwestujemy w innowacyjne startupy technologiczne - kapital, mentoring i wsparcie.",
    url: "/oferta/cetus-venture-capital",
  },
  alternates: {
    canonical: "/oferta/cetus-venture-capital",
  },
};

export default function VentureCapitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
