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
