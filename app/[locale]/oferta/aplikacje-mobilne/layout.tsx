import type { Metadata } from "next";
import { buildPageMetadata } from "../../pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, key: "mobileApps", path: "/oferta/aplikacje-mobilne" });
}

export default function MobileAppsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
