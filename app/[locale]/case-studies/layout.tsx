import type { Metadata } from "next";
import { buildPageMetadata } from "../pageMetadata";
import { SHOW_CASE_STUDIES } from "@/lib/featureFlags";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await buildPageMetadata({ locale, key: "caseStudies", path: "/case-studies" });

  // Dopóki Realizacje są ukryte, trasa zostaje dostępna pod adresem, ale nie
  // ma po co trafiać do indeksu - inaczej Google pokazuje w wynikach sekcję,
  // do której na stronie nie prowadzi żaden link.
  if (!SHOW_CASE_STUDIES) metadata.robots = { index: false, follow: false };

  return metadata;
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
