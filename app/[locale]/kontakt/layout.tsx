import type { Metadata } from "next";
import { buildPageMetadata } from "../pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, key: "contact", path: "/kontakt" });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
