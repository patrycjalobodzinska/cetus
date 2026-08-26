import type { Metadata } from "next";
import { buildPageMetadata } from "../pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, key: "offer", path: "/oferta" });
}

export default function OfferLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
