import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/Footer";
import NavbarCurosora from "./components/NavbarCurosora";
import NavigationProvider from "./components/NavigationProvider";
import Plasma from "./components/Plasma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cetuspro.pl'),
  title: {
    default: "CetusPro - Nowoczesne rozwiązania IT i aplikacje webowe",
    template: "%s | CetusPro"
  },
  description: "CetusPro - Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT. Specjalizujemy się w projektowaniu UX/UI, cyberbezpieczeństwie, AI i automatyzacji procesów.",
  keywords: [
    "aplikacje webowe",
    "aplikacje mobilne",
    "rozwój oprogramowania",
    "UX/UI design",
    "cyberbezpieczeństwo",
    "AI i automatyzacja",
    "outsourcing programistów",
    "transformacja technologiczna",
    "CetusPro"
  ],
  authors: [{ name: "CetusPro" }],
  creator: "CetusPro",
  publisher: "CetusPro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: "CetusPro",
    title: "CetusPro - Nowoczesne rozwiązania IT i aplikacje webowe",
    description: "Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT. Specjalizujemy się w projektowaniu UX/UI, cyberbezpieczeństwie, AI i automatyzacji procesów.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CetusPro - Nowoczesne rozwiązania IT",
    description: "Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} antialiased bg-white`}
      >
        <NavigationProvider>
          <SmoothScroll>
            <NavbarCurosora />
            <div className="fixed top-0" style={{ width: '100%', height: '180vh', position: 'fixed', top: 0, left: 0, zIndex: -10 }}>
              <Plasma
    color="#0073ff"
    speed={0.6}
    direction="forward"
    scale={0.4} mouseInteractive={false}
    opacity={0.15}
  />
            </div>
            <main className=" top-0 left-0 w-full h-full">
              {children}
              <Footer />
            </main>
          </SmoothScroll>
        </NavigationProvider>
      </body>
    </html>
  );
}
