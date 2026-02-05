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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CetusPro - Oferta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oferta | CetusPro",
    description: "Poznaj naszą pełną ofertę: aplikacje webowe, mobilne, UX/UI design, cyberbezpieczeństwo, AI i automatyzacja procesów.",
    images: ["/og-image.png"],
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
