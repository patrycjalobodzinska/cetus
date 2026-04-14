import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cetuspro Admin",
  description: "",
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
