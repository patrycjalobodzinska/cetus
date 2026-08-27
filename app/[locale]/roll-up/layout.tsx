import type { Metadata } from "next";
import { buildPageMetadata } from "../pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, key: "rollUp", path: "/roll-up" });
}

export default function RollUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
