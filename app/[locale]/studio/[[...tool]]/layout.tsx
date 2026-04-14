import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma } from "next/font/google";

export const metadata: Metadata = {
  title: "Cetuspro Admin",
  description: "",
};

export default function RootLayout({
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
