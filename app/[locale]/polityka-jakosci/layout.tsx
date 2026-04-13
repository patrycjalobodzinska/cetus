import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka jakosci",
  description: "Polityka jakosci CetusPro. Poznaj nasze standardy i zobowiazania dotyczace jakosci uslug IT.",
  openGraph: {
    title: "Polityka jakosci | CetusPro",
    description: "Polityka jakosci CetusPro - standardy i zobowiazania.",
    url: "/polityka-jakosci",
  },
  alternates: {
    canonical: "/polityka-jakosci",
  },
};

export default function QualityPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
