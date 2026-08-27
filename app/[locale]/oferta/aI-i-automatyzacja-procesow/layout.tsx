import type { Metadata } from "next";
import { buildPageMetadata } from "../../pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, key: "ai", path: "/oferta/aI-i-automatyzacja-procesow" });
}

export default function AiAutomationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
