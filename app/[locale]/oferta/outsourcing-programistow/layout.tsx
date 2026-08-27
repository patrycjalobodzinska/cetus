import type { Metadata } from "next";
import { buildPageMetadata } from "../../pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, key: "outsourcing", path: "/oferta/outsourcing-programistow" });
}

export default function OutsourcingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
