import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aplikacje mobilne",
  description: "Tworzymy aplikacje mobilne iOS i Android, które użytkownicy pokochają. Od koncepcji do publikacji w App Store i Google Play.",
  keywords: [
    "aplikacje mobilne",
    "aplikacje iOS",
    "aplikacje Android",
    "React Native",
    "Flutter",
    "PWA",
    "aplikacje natywne",
    "aplikacje multiplatformowe"
  ],
  openGraph: {
    title: "Aplikacje mobilne | CetusPro",
    description: "Tworzymy aplikacje mobilne iOS i Android, które użytkownicy pokochają.",
    url: "/oferta/aplikacje-mobilne",
  },
  alternates: {
    canonical: "/oferta/aplikacje-mobilne",
  },
};

export default function MobileAppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
