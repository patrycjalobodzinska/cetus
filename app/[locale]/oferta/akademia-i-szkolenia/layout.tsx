import type { Metadata } from "next";
import { buildPageMetadata } from "../../pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, key: "academy", path: "/oferta/akademia-i-szkolenia" });
}

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
