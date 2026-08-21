import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dofinansowanie",
  description:
    "Informacja o projektach CetusPro dofinansowanych ze srodkow Funduszy Europejskich.",
  openGraph: {
    title: "Dofinansowanie | CetusPro",
    description:
      "Projekty CetusPro dofinansowane przez Unie Europejska ze srodkow Funduszy Europejskich.",
    url: "/dofinansowanie",
  },
  alternates: {
    canonical: "/dofinansowanie",
    languages: {
      pl: "/dofinansowanie",
      en: "/en/dofinansowanie",
      "x-default": "/dofinansowanie",
    },
  },
};

export default function FundingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
