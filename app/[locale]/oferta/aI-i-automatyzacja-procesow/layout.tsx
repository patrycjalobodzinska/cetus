import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI i automatyzacja procesów",
  description: "Automatyzuj i optymalizuj z pomocą AI. Wykorzystaj potencjał sztucznej inteligencji i automatyzacji, aby przyspieszyć procesy biznesowe i zwiększyć wydajność.",
  keywords: [
    "AI",
    "sztuczna inteligencja",
    "automatyzacja procesów",
    "machine learning",
    "chatboty",
    "workflow automation",
    "computer vision",
    "NLP"
  ],
  openGraph: {
    title: "AI i automatyzacja procesów | CetusPro",
    description: "Automatyzuj i optymalizuj z pomocą AI. Wykorzystaj potencjał sztucznej inteligencji.",
    url: "/oferta/aI-i-automatyzacja-procesow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CetusPro - AI i automatyzacja procesów",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI i automatyzacja procesów | CetusPro",
    description: "Automatyzuj i optymalizuj z pomocą AI. Wykorzystaj potencjał sztucznej inteligencji.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/oferta/aI-i-automatyzacja-procesow",
  },
};

export default function AIAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
