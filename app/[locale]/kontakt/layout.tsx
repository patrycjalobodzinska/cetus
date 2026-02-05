import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z CetusPro. Jesteśmy gotowi pomóc w realizacji Twojego projektu IT. Odpowiemy na wszystkie pytania i przedstawimy najlepsze rozwiązania dla Twojego biznesu.",
  keywords: [
    "kontakt",
    "CetusPro kontakt",
    "zapytanie ofertowe",
    "konsultacja IT",
    "wsparcie techniczne"
  ],
  openGraph: {
    title: "Kontakt | CetusPro",
    description: "Skontaktuj się z CetusPro. Jesteśmy gotowi pomóc w realizacji Twojego projektu IT.",
    url: "/kontakt",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CetusPro - Kontakt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | CetusPro",
    description: "Skontaktuj się z CetusPro. Jesteśmy gotowi pomóc w realizacji Twojego projektu IT.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/kontakt",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
