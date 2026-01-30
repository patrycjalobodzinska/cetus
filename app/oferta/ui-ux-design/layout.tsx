import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UX/UI Design",
  description: "Projektujemy doświadczenia, które zachwycają użytkowników. Tworzymy intuicyjne, estetyczne i funkcjonalne interfejsy wspierające cele biznesowe.",
  keywords: [
    "UX design",
    "UI design",
    "projektowanie interfejsów",
    "user experience",
    "user interface",
    "design thinking",
    "prototypowanie",
    "testy użyteczności"
  ],
  openGraph: {
    title: "UX/UI Design | CetusPro",
    description: "Projektujemy doświadczenia, które zachwycają użytkowników.",
    url: "/oferta/ui-ux-design",
  },
  alternates: {
    canonical: "/oferta/ui-ux-design",
  },
};

export default function UxUiDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
