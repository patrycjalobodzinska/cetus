import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akademia i szkolenia",
  description: "CetusPro Academy - Kompleksowe szkolenia i kursy z zakresu programowania, AI, zarządzania projektami IT. Uczymy praktycznych umiejętności potrzebnych w dzisiejszym rynku pracy.",
  keywords: [
    "szkolenia IT",
    "kursy programowania",
    "szkolenia z AI",
    "kursy machine learning",
    "szkolenia zarządzanie projektami",
    "akademia programowania",
    "kursy online",
    "szkolenia techniczne",
    "edukacja IT"
  ],
  openGraph: {
    title: "Akademia i szkolenia | CetusPro",
    description: "Kompleksowe szkolenia i kursy z zakresu programowania, AI, zarządzania projektami IT.",
    url: "/oferta/akademia-i-szkolenia",
  },
  alternates: {
    canonical: "/oferta/akademia-i-szkolenia",
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
