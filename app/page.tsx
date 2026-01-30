import type { Metadata } from "next";
import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import HeroCurosora from "./components/HeroCurosora";
import StatsPanel from "./components/StatsPanel";
import AboutUs from "./components/AboutUs";
import Skiper16 from "./components/OfferWrapper";
import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect";
import Plasma from "./components/Plasma";
import Link from "next/link";
import StarGradientButton from "./components/ui/gradientBackground";

export const metadata: Metadata = {
  title: "Strona główna",
  description: "CetusPro - Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT. Specjalizujemy się w projektowaniu UX/UI, cyberbezpieczeństwie, AI i automatyzacji procesów biznesowych.",
  keywords: [
    "aplikacje webowe",
    "aplikacje mobilne",
    "rozwój oprogramowania",
    "UX/UI design",
    "cyberbezpieczeństwo",
    "AI i automatyzacja",
    "outsourcing programistów",
    "transformacja technologiczna",
    "CetusPro",
    "aplikacje na zamówienie"
  ],
  openGraph: {
    title: "CetusPro - Nowoczesne rozwiązania IT i aplikacje webowe",
    description: "Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT. Specjalizujemy się w projektowaniu UX/UI, cyberbezpieczeństwie, AI i automatyzacji procesów.",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (  <div className="relative  flex flex-col items-center justify-center">

    <main className="   w-full  max-w-7xl ">
        {/* --- NEW NAVBAR --- */}

      {/* Wariant 1: Oryginalny (Video Placeholder / Logo) */}

    <HeroCurosora />

<Skiper16 />

      {/* Contact CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>

            <h2
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Gotowy na start?
            </h2>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Skontaktuj się z nami, aby omówić Twój projekt i dowiedzieć się, jak możemy pomóc w rozwoju Twojego biznesu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/kontakt">
                <StarGradientButton>
                  Porozmawiajmy
                </StarGradientButton>
              </Link>


            </div>
          </div>
        </div>
      </section>




    </main></div>
  );
}
