import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outsourcing programistow",
  description: "Profesjonalny outsourcing programistow i zespolow IT. Dostarczamy doswiadczonych specjalistow dopasowanych do Twoich potrzeb projektowych.",
  keywords: [
    "outsourcing programistow",
    "outsourcing IT",
    "zespoly programistyczne",
    "body leasing",
    "team augmentation",
    "programisci na wynajem",
  ],
  openGraph: {
    title: "Outsourcing programistow | CetusPro",
    description: "Profesjonalny outsourcing programistow i zespolow IT dopasowanych do Twoich potrzeb.",
    url: "/oferta/outsourcing-programistow",
  },
  alternates: {
    canonical: "/oferta/outsourcing-programistow",
  },
};

export default function OutsourcingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
