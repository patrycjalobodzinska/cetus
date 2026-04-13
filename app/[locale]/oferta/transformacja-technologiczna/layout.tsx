import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformacja technologiczna",
  description: "Kompleksowa transformacja cyfrowa Twojej firmy. Modernizacja systemow, migracja do chmury, automatyzacja procesow i wdrazanie nowoczesnych technologii.",
  keywords: [
    "transformacja cyfrowa",
    "transformacja technologiczna",
    "modernizacja systemow",
    "migracja do chmury",
    "digitalizacja",
    "innowacje technologiczne",
  ],
  openGraph: {
    title: "Transformacja technologiczna | CetusPro",
    description: "Kompleksowa transformacja cyfrowa Twojej firmy - modernizacja, chmura, automatyzacja.",
    url: "/oferta/transformacja-technologiczna",
  },
  alternates: {
    canonical: "/oferta/transformacja-technologiczna",
  },
};

export default function TransformationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
