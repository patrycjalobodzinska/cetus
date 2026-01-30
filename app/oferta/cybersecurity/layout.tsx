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
