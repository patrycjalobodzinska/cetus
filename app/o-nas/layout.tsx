import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas",
  description: "Poznaj zespół CetusPro - doświadczeni eksperci w dziedzinie aplikacji webowych, mobilnych, UX/UI design, cyberbezpieczeństwa i AI. Dowiedz się więcej o naszej historii i wartościach.",
  keywords: [
    "o nas",
    "zespół",
    "historia firmy",
    "wartości",
    "doświadczenie",
    "eksperci IT"
  ],
  openGraph: {
    title: "O nas | CetusPro",
    description: "Poznaj zespół CetusPro - doświadczeni eksperci w dziedzinie aplikacji webowych, mobilnych i rozwiązań IT.",
    url: "/o-nas",
  },
  alternates: {
    canonical: "/o-nas",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
