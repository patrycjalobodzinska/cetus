import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CetusPro — Technologia, która napędza Twój biznes",
  description: "Projektujemy, budujemy i rozwijamy dedykowane systemy IT. Sprawdź naszą ofertę dla biznesu lub dołącz do zespołu CetusPro.",
  keywords: [
    "CetusPro",
    "rozwiązania IT",
    "aplikacje webowe",
    "aplikacje mobilne",
    "AI i automatyzacja",
    "cyberbezpieczeństwo",
    "kariera w IT"
  ],
  openGraph: {
    title: "CetusPro — Technologia, która napędza Twój biznes",
    description: "Sprawdź naszą ofertę dla biznesu lub dołącz do zespołu CetusPro.",
    url: "/roll-up",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CetusPro — rozwiązania IT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CetusPro — Technologia, która napędza Twój biznes",
    description: "Sprawdź naszą ofertę dla biznesu lub dołącz do zespołu CetusPro.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/roll-up",
    languages: {
      pl: "/roll-up",
      en: "/en/roll-up",
      "x-default": "/roll-up",
    },
  },
};

export default function RollUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
