'use client';

import Link from 'next/link';
import { ArrowRight, Palette, Pencil, RefreshCw, FlaskConical, Eye, Lightbulb, Sparkles, Target, TrendingUp, Layers, Zap, Shield } from 'lucide-react';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import DecorativeImage from '@/app/components/DecorativeImage';

export default function UxUiDesignPage() {
  const howWeHelpServices = [
    {
      title: 'Projektowanie szyte na miarę',
      description: 'Tworzymy unikalne interfejsy dopasowane do Twojej marki i potrzeb użytkowników, zapewniając spójność wizualną i funkcjonalną na wszystkich platformach.'
    },
    {
      title: 'Intuicyjne i przyjazne interfejsy',
      description: 'Projektujemy interfejsy z myślą o użytkowniku, zapewniając łatwą nawigację, czytelność i przyjemne doświadczenie podczas korzystania z aplikacji.'
    },
    {
      title: 'Estetyczne i nowoczesne rozwiązania',
      description: 'Tworzymy wizualnie atrakcyjne projekty wykorzystujące najnowsze trendy w designie, zachowując przy tym funkcjonalność i użyteczność.'
    }
  ];

  const whyFeatures = [
    {
      title: 'Projektowanie szyte na miarę',
      description: 'Każdy projekt jest tworzony indywidualnie z myślą o Twojej marce, użytkownikach i celach biznesowych. Nie używamy szablonów - każdy interfejs jest unikalny.'
    },
    {
      title: 'Intuicyjne i przyjazne interfejsy',
      description: 'Projektujemy z myślą o użytkowniku, zapewniając łatwą nawigację, czytelność i przyjemne doświadczenie podczas korzystania z aplikacji.'
    },
    {
      title: 'Estetyczne i nowoczesne rozwiązania',
      description: 'Tworzymy wizualnie atrakcyjne projekty wykorzystujące najnowsze trendy w designie, zachowując przy tym funkcjonalność i użyteczność.'
    },
    {
      title: 'Efektywne procesy projektowe',
      description: 'Stosujemy sprawdzone metodyki projektowe (Design Thinking, User-Centered Design), które zapewniają szybkie iteracje i wysoką jakość rozwiązań.'
    },
    {
      title: 'Optymalizacja doświadczenia użytkownika',
      description: 'Analizujemy zachowania użytkowników i optymalizujemy interfejsy, aby zapewnić najlepsze możliwe doświadczenie i osiągnąć cele biznesowe.'
    }
  ];

  const whyUsReasons = [
    {
      title: 'Doświadczenie w różnych branżach',
      description: 'Mamy doświadczenie w projektowaniu interfejsów dla różnych branż - od e-commerce po finanse, zdrowie i edukację.'
    },
    {
      title: 'Pełny cykl projektowy',
      description: 'Oferujemy kompleksową obsługę od researchu i analizy potrzeb, przez wireframy, prototypy, aż po finalne projekty wizualne.'
    },
    {
      title: 'Współpraca z zespołem deweloperskim',
      description: 'Pracujemy w ścisłej współpracy z zespołem deweloperskim, zapewniając płynne przejście od projektu do implementacji.'
    },
    {
      title: 'Wsparcie po wdrożeniu',
      description: 'Zapewniamy ciągłe wsparcie w zakresie designu, aktualizacji interfejsów i optymalizacji doświadczenia użytkownika.'
    }
  ];

  const caseStudies = [
    {
      title: 'Redesign platformy e-commerce',
      goal: 'Poprawa konwersji i doświadczenia użytkownika w sklepie internetowym',
      solution: 'Kompleksowy redesign interfejsu z nowoczesnym designem, uproszczoną nawigacją i zoptymalizowanym procesem zakupów',
      result: '40% wzrost konwersji w pierwszym kwartale'
    },
    {
      title: 'Aplikacja mobilna dla banku',
      goal: 'Stworzenie intuicyjnej aplikacji mobilnej do zarządzania finansami',
      solution: 'Projekt interfejsu z naciskiem na bezpieczeństwo, czytelność i szybkość działania, z biometrią i personalizacją',
      result: '50,000+ aktywnych użytkowników w pierwszym miesiącu'
    },
    {
      title: 'Dashboard analityczny',
      goal: 'Stworzenie przejrzystego interfejsu do wizualizacji danych biznesowych',
      solution: 'Projekt dashboardu z interaktywnymi wykresami, filtrami i spersonalizowanymi widokami dla różnych ról użytkowników',
      result: 'Oszczędność 15h tygodniowo na analizie danych'
    }
  ];

  const howWeHelpIcons = [Pencil, RefreshCw, FlaskConical];

  const mockupLayouts = [
    // Mockup 1: Szyte na miarę - Wireframe/design components
    <div key="mock1" className="bg-white rounded-2xl p-8 shadow-xl">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-linear-to-br from-gray-100 to-gray-50 rounded-xl p-4 h-24"></div>
        <div className="bg-linear-to-br from-blue-600/10 to-blue-600/10 rounded-xl p-4 h-24 border-2 border-blue-600"></div>
        <div className="bg-linear-to-br from-gray-100 to-gray-50 rounded-xl p-4 h-24"></div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-100 rounded w-full"></div>
        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
      </div>
      <div className="mt-6 flex gap-2">
        <div className="w-24 h-8 bg-blue-600 rounded-lg"></div>
        <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>,

    // Mockup 2: Intuicyjne i przyjazne - User flow
    <div key="mock2" className="bg-white rounded-2xl p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-32"></div>
            <div className="h-2 bg-gray-100 rounded w-24"></div>
          </div>
        </div>
        <ArrowRight className="w-6 h-6 text-blue-600" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-slate-50 rounded-xl p-4 border border-blue-100">
          <div className="w-8 h-8 bg-blue-600/20 rounded-lg mb-3"></div>
          <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-2 bg-gray-100 rounded w-3/4"></div>
        </div>
        <div className="bg-linear-to-br from-blue-50 to-slate-50 rounded-xl p-4 border border-blue-100">
          <div className="w-8 h-8 bg-blue-600/20 rounded-lg mb-3"></div>
          <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-2 bg-gray-100 rounded w-3/4"></div>
        </div>
      </div>
    </div>,

    // Mockup 3: Estetyczne i nowoczesne - Visual design
    <div key="mock3" className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      </div>
      <div className="bg-linear-to-br from-blue-600 to-blue-600 rounded-xl p-6 mb-4">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-8 h-8 text-white" />
          <div className="h-4 bg-white/30 rounded w-32"></div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-white/20 rounded w-full"></div>
          <div className="h-2 bg-white/20 rounded w-5/6"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-16 bg-white/5 rounded-lg"></div>
        <div className="h-16 bg-white/5 rounded-lg"></div>
        <div className="h-16 bg-white/5 rounded-lg"></div>
      </div>
    </div>,

    // Mockup 4: Efektywne procesy - Timeline/workflow
    <div key="mock4" className="bg-white rounded-2xl p-8 shadow-xl">
      <div className="space-y-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              <span className="font-bold">{step}</span>
            </div>
            <div className="flex-1">
              <div className={`h-3 rounded ${
                step === 2 ? 'bg-blue-600 w-full' : 'bg-gray-200 w-2/3'
              }`}></div>
              <div className="h-2 bg-gray-100 rounded w-1/2 mt-2"></div>
            </div>
            {step < 3 && <ArrowRight className="w-5 h-5 text-gray-300" />}
          </div>
        ))}
      </div>
    </div>,

    // Mockup 5: Optymalizacja UX - Analytics/metrics
    <div key="mock5" className="bg-white rounded-2xl p-8 shadow-xl">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-2">
            +45%
          </div>
          <div className="h-2 bg-gray-100 rounded w-full"></div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-2">
            -30%
          </div>
          <div className="h-2 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
      <div className="flex items-end justify-between h-24">
        {[40, 60, 45, 80, 70, 95].map((height, idx) => (
          <div
            key={idx}
            className="w-8 bg-blue-600 rounded-t"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen py-12 flex items-center relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-8">


              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                Projektujemy interfejsy, które użytkownicy pokochają
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Od koncepcji do finalnego projektu - tworzymy nowoczesne, intuicyjne i estetyczne interfejsy, które zapewniają doskonałe doświadczenie użytkownika.
              </p>


            </div>

            {/* Right - Hero Image */}
            <DecorativeImage
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="UX/UI Design"

            />
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-24 bg-white relative overflow-hidden">
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
              const Icon = howWeHelpIcons[index];

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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Dlaczego warto wybrać nasze rozwiązania?
            </h2>
          </div>

          <div className="space-y-12">
            {whyFeatures.map((feature, index) => {
              return (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{index + 1}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-6 h-1 w-24 bg-blue-600 rounded-full"></div>
                  </div>

                  {/* Mockup */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative">
                      {mockupLayouts[index]}
                      <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600/10 rounded-full blur-xl"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600/10 rounded-full blur-xl"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us Section */}


      {/* Case Studies Section */}
        </div>
  );
}
