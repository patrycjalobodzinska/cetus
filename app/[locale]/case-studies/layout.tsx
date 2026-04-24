import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Poznaj nasze realizacje i projekty. Zobacz, jak pomogliśmy naszym klientom osiągnąć sukces dzięki nowoczesnym rozwiązaniom IT, aplikacjom webowym i mobilnym.",
  alternates: {
    canonical: "/case-studies",
    languages: {
      pl: "/case-studies",
      en: "/en/case-studies",
      "x-default": "/case-studies",
    },
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
