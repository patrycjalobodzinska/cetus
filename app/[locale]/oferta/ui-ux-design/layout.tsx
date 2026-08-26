import type { Metadata } from "next";
import { buildPageMetadata } from "../../pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, key: "uiUx", path: "/oferta/ui-ux-design" });
}

export default function UiUxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
