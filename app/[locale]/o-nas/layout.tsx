import type { Metadata } from "next";
import { buildPageMetadata } from "../pageMetadata";
import { SHOW_ABOUT_PAGE } from "@/lib/featureFlags";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await buildPageMetadata({ locale, key: "about", path: "/o-nas" });

  // Strona ukryta w serwisie nie ma po co siedzieć w indeksie - w wynikach
  // wyszukiwania byłaby jedynym wejściem do treści, do której nie prowadzi
  // żaden link. Sam adres zostaje dostępny.
  if (!SHOW_ABOUT_PAGE) metadata.robots = { index: false, follow: false };

  return metadata;
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
