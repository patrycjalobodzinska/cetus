import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyberbezpieczeństwo",
  description: "Kompleksowa ochrona Twojej firmy przed zagrożeniami cybernetycznymi. Audyty bezpieczeństwa, testy penetracyjne, wdrażanie rozwiązań bezpieczeństwa.",
  keywords: [
    "cyberbezpieczeństwo",
    "bezpieczeństwo IT",
    "audyt bezpieczeństwa",
    "testy penetracyjne",
    "ochrona danych",
    "RODO",
    "GDPR",
    "security"
  ],
  openGraph: {
    title: "Cyberbezpieczeństwo | CetusPro",
    description: "Kompleksowa ochrona Twojej firmy przed zagrożeniami cybernetycznymi.",
    url: "/oferta/cybersecurity",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CetusPro - Cyberbezpieczeństwo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyberbezpieczeństwo | CetusPro",
    description: "Kompleksowa ochrona Twojej firmy przed zagrożeniami cybernetycznymi.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/oferta/cybersecurity",
  },
};

export default function CybersecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
