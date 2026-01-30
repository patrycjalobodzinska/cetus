import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oferta",
  description: "Poznaj naszą pełną ofertę: aplikacje webowe, mobilne, UX/UI design, cyberbezpieczeństwo, AI i automatyzacja procesów, outsourcing programistów oraz transformacja technologiczna.",
  keywords: [
    "oferta",
    "aplikacje webowe",
    "aplikacje mobilne",
    "UX/UI design",
    "cyberbezpieczeństwo",
    "AI i automatyzacja",
    "outsourcing programistów",
    "transformacja technologiczna",
    "usługi IT",
    "rozwój oprogramowania"
  ],
  openGraph: {
    title: "Oferta | CetusPro",
    description: "Poznaj naszą pełną ofertę: aplikacje webowe, mobilne, UX/UI design, cyberbezpieczeństwo, AI i automatyzacja procesów.",
    url: "/oferta",
  },
  alternates: {
    canonical: "/oferta",
  },
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
