import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Poznaj nasze realizacje i projekty. Zobacz, jak pomogliśmy naszym klientom osiągnąć sukces dzięki nowoczesnym rozwiązaniom IT, aplikacjom webowym i mobilnym.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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
