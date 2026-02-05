import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Poznaj nasze realizacje i projekty. Zobacz, jak pomogliśmy naszym klientom osiągnąć sukces dzięki nowoczesnym rozwiązaniom IT, aplikacjom webowym i mobilnym.",
  keywords: [
    "case studies",
    "realizacje",
    "projekty",
    "portfolio",
    "przykłady prac",
    "sukcesy klientów"
  ],
  openGraph: {
    title: "Case Studies | CetusPro",
    description: "Poznaj nasze realizacje i projekty. Zobacz, jak pomogliśmy naszym klientom osiągnąć sukces.",
    url: "/case-studies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CetusPro - Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | CetusPro",
    description: "Poznaj nasze realizacje i projekty. Zobacz, jak pomogliśmy naszym klientom osiągnąć sukces.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
