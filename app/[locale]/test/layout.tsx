import type { Metadata } from "next";

// Podgląd roboczy - nie powinien trafiać do wyszukiwarek ani do podglądów linków.
export const metadata: Metadata = {
  title: "Podgląd nowego układu (test)",
  robots: { index: false, follow: false },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
