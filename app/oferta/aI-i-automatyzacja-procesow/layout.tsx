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
