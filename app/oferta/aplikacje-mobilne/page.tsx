'use client';

import Link from 'next/link';
import { ArrowRight, Smartphone, Code2, Layers, Users, Puzzle, Gauge, Shield, Zap, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import DecorativeImage from '@/app/components/DecorativeImage';

export default function MobileAppsPage() {
  const [activeService, setActiveService] = useState(0);

  const howWeHelpServices = [
    {
      title: 'Aplikacje natywne iOS i Android',
      description: 'Tworzymy wydajne aplikacje natywne wykorzystujące pełny potencjał systemów iOS i Android, zapewniając najlepszą wydajność i doświadczenie użytkownika.'
    },
    {
      title: 'Aplikacje multiplatformowe',
      description: 'Rozwiązania cross-platformowe z React Native lub Flutter, które działają na wszystkich platformach przy zachowaniu natywnej wydajności i wyglądu.'
    },
    {
      title: 'Progressive Web Apps (PWA)',
      description: 'Nowoczesne aplikacje webowe, które działają jak natywne aplikacje mobilne, z możliwością instalacji i pracy offline.'
    }
  ];

  const whyFeatures = [
    {
      title: 'Modularna architektura',
      description: 'Aplikacje zbudowane z niezależnych modułów, które można łatwo rozbudowywać i aktualizować bez wpływu na cały system.'
    },
    {
      title: 'Wysoka wydajność',
      description: 'Optymalizacja każdego aspektu aplikacji, aby zapewnić szybkie działanie i płynne animacje nawet na starszych urządzeniach.'
    },
    {
      title: 'Bezpieczeństwo danych',
      description: 'Implementacja najlepszych praktyk bezpieczeństwa, szyfrowanie danych i bezpieczne połączenia API.'
    },
    {
      title: 'Szybkie ładowanie',
      description: 'Optymalizacja rozmiaru aplikacji i czasu ładowania, aby użytkownicy mogli szybko rozpocząć korzystanie z aplikacji.'
    },
    {
      title: 'Celowe projektowanie',
      description: 'Projektowanie z myślą o konkretnych celach biznesowych i potrzebach użytkowników, a nie tylko o technologii.'
    },
    {
      title: 'Ciągły rozwój',
      description: 'Regularne aktualizacje i nowe funkcje, które utrzymują aplikację na bieżąco z potrzebami użytkowników i rynku.'
    }
  ];

  const whyUsReasons = [
    {
      title: 'Doświadczenie w różnych branżach',
      description: 'Mamy doświadczenie w tworzeniu aplikacji mobilnych dla różnych branż - od e-commerce po finanse i zdrowie.'
    },
    {
      title: 'Pełny cykl rozwoju',
      description: 'Oferujemy kompleksową obsługę od koncepcji, przez projektowanie, rozwój, testowanie, aż po publikację w sklepach.'
    },
    {
      title: 'Wsparcie po wdrożeniu',
      description: 'Zapewniamy ciągłe wsparcie techniczne, aktualizacje i optymalizację aplikacji po jej uruchomieniu.'
    },
    {
      title: 'Zgodność z wytycznymi',
      description: 'Zapewniamy pełną zgodność z wytycznymi App Store i Google Play, aby Twoja aplikacja została szybko zaakceptowana.'
    }
  ];

  const caseStudies = [
    {
      title: 'Aplikacja fitness',
      goal: 'Stworzenie aplikacji mobilnej do treningów personalnych z wideo instrukcjami',
      solution: 'Natywna aplikacja iOS i Android z integracją płatności, kalendarzem treningów i śledzeniem postępów',
      result: '50,000+ pobrań w pierwszym miesiącu'
    },
    {
      title: 'Aplikacja e-commerce',
      goal: 'Przeniesienie sklepu internetowego na urządzenia mobilne',
      solution: 'React Native aplikacja z płatnościami mobilnymi, powiadomieniami push i personalizacją',
      result: '200% wzrost sprzedaży mobilnej'
    },
    {
      title: 'Aplikacja finansowa',
      goal: 'Stworzenie bezpiecznej aplikacji do zarządzania finansami osobistymi',
      solution: 'Natywna aplikacja z biometrią, szyfrowaniem end-to-end i integracją z bankami',
      result: '10,000+ aktywnych użytkowników w pierwszym kwartale'
    }
  ];

  const whyFeaturesIcons = [Puzzle, Gauge, Shield, Zap, Target, TrendingUp];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="min-h-screen py-12 flex items-center relative overflow-hidden ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20  relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-8">


              <h1
                className="text-5xl md:text-6xl lg:text-6xl font-bold text-slate-900 leading-tight"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                Tworzymy aplikacje mobilne, które użytkownicy pokochają
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Od koncepcji do publikacji w App Store i Google Play - tworzymy nowoczesne aplikacje mobilne, które są szybkie, bezpieczne i intuicyjne w użyciu.
              </p>


            </div>

            {/* Right - Hero Image */}
            <DecorativeImage
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Aplikacje mobilne"

            />
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="pb-24  relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Jak możemy pomóc
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {howWeHelpServices.map((service, index) => {
              const Icon = index === 0 ? Smartphone : index === 1 ? Code2 : Layers;

              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-600/30"
                >
                  <div className="relative p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-8 h-1 w-20 bg-blue-600 rounded-full group-hover:w-32 transition-all duration-500"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="lg:py-24 py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Dlaczego warto wybrać nasze rozwiązania?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Features List */}
            <div className="space-y-3">
              {whyFeatures.map((feature, index) => {
                const Icon = whyFeaturesIcons[index];

                return (
                  <button
                    key={index}
                    style={{
                      clipPath: "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)"
                    }}
                    className="w-full text-left p-0.5 rounded-md transition-all duration-300 bg-gray-100 text-slate-900 "
                  >
                    <div
                      style={{
                        clipPath: "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)"
                      }}
                      className="flex p-6 items-start space-x-4 bg-white"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-600/10">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right - Phone Mockup Visualization */}
            <div className="relative">
              <div className="relative">
                {/* Phone Frame */}
                <div className="relative bg-linear-to-br from-slate-900 to-slate-800 rounded-[3rem] p-3 shadow-2xl mx-auto max-w-sm">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-blue-600 px-6 py-3 flex justify-between items-center text-white text-xs">
                      <span className="font-semibold">9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                        <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                        <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4">
                        {[...Array(4)].map((_, idx) => (
                          <div key={idx} className="bg-linear-to-r from-blue-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <div className="w-5 h-5 bg-blue-600 rounded-md"></div>
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <div className="bg-blue-600 rounded-xl p-4 text-center">
                          <div className="h-3 bg-white/30 rounded w-1/2 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="lg:py-20 py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Dlaczego my?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyUsReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl font-bold text-blue-600 leading-none select-none shrink-0">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




    </div>
  );
}
