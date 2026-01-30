'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Bot, Workflow, BrainCircuit, Eye, MessageSquare, Target, Zap, Shield, TrendingUp, Gauge, RefreshCw, BarChart, Lightbulb, Cpu, Network, Database, Clock } from 'lucide-react';
import { useState } from 'react';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import DecorativeImage from '@/app/components/DecorativeImage';

export default function AIAutomationPage() {
  const [activeModule, setActiveModule] = useState(0);

  const benefits = [
    {
      title: 'Automatyzacja procesów',
      description: 'Zautomatyzuj powtarzalne zadania i procesy biznesowe, oszczędzając czas i zasoby, a jednocześnie zwiększając wydajność i dokładność operacji.'
    },
    {
      title: 'Inteligentne rozwiązania',
      description: 'Wykorzystaj potencjał sztucznej inteligencji do analizy danych, przewidywania trendów i podejmowania inteligentnych decyzji biznesowych.'
    },
    {
      title: 'Szybkość i wydajność',
      description: 'Przyspiesz procesy biznesowe dzięki automatyzacji i AI, umożliwiając szybsze reagowanie na potrzeby klientów i rynku.'
    },
    {
      title: 'Bezpieczeństwo i zgodność',
      description: 'Zapewniamy pełną zgodność z przepisami RODO i standardami bezpieczeństwa, chroniąc dane i procesy Twojej firmy.'
    }
  ];

  const services = [
    {
      title: 'Chatboty i asystenci AI',
      description: 'Inteligentne chatboty i wirtualni asystenci, którzy odpowiadają na pytania klientów, wspierają sprzedaż i automatyzują obsługę klienta 24/7.',
      applications: [
        'Chatboty na stronie internetowej',
        'Asystenci w aplikacjach mobilnych',
        'Automatyzacja obsługi klienta',
        'Wsparcie sprzedaży i lead generation',
        'Integracja z systemami CRM'
      ],
      effect: 'Redukcja kosztów obsługi klienta o 60% i zwiększenie satysfakcji klientów'
    },
    {
      title: 'Automatyzacja workflow',
      description: 'Automatyzacja złożonych procesów biznesowych, przepływów pracy i integracji między systemami, eliminując ręczne zadania i błędy.',
      applications: [
        'Automatyzacja procesów biznesowych',
        'Integracja systemów i aplikacji',
        'Automatyzacja raportowania',
        'Workflow management',
        'Orchestracja zadań'
      ],
      effect: 'Oszczędność 20+ godzin tygodniowo na powtarzalnych zadaniach'
    },
    {
      title: 'Analiza danych i predykcje',
      description: 'Zaawansowana analityka danych z wykorzystaniem AI do przewidywania trendów, identyfikacji wzorców i wspierania decyzji biznesowych.',
      applications: [
        'Analiza predykcyjna',
        'Machine Learning dla biznesu',
        'Anomalia detection',
        'Forecasting i trend analysis',
        'Personalizacja i rekomendacje'
      ],
      effect: 'Poprawa dokładności prognoz o 40% i lepsze decyzje biznesowe'
    },
    {
      title: 'Computer Vision',
      description: 'Rozwiązania oparte na rozpoznawaniu obrazów i wizji komputerowej do automatyzacji procesów wizualnych i analizy danych obrazowych.',
      applications: [
        'Rozpoznawanie i klasyfikacja obrazów',
        'OCR i ekstrakcja danych',
        'Quality control automation',
        'Facial recognition',
        'Object detection'
      ],
      effect: 'Automatyzacja kontroli jakości z dokładnością 99%'
    },
    {
      title: 'Natural Language Processing',
      description: 'Przetwarzanie języka naturalnego do analizy tekstu, sentymentu, ekstrakcji informacji i automatyzacji procesów opartych na tekście.',
      applications: [
        'Analiza sentymentu',
        'Ekstrakcja informacji z dokumentów',
        'Automatyczne tagowanie i kategoryzacja',
        'Tłumaczenie automatyczne',
        'Summarization i content generation'
      ],
      effect: 'Przetwarzanie 1000+ dokumentów dziennie automatycznie'
    }
  ];

  const process = [
    {
      title: 'Analiza potrzeb',
      description: 'Dokładnie analizujemy Twoje procesy biznesowe, identyfikujemy obszary do automatyzacji i określamy cele projektu.'
    },
    {
      title: 'Projektowanie rozwiązania',
      description: 'Tworzymy architekturę rozwiązania AI/automatyzacji, wybieramy odpowiednie technologie i planujemy implementację.'
    },
    {
      title: 'Implementacja i testy',
      description: 'Wdrażamy rozwiązanie, przeprowadzamy testy i optymalizujemy działanie systemu, zapewniając pełną funkcjonalność.'
    },
    {
      title: 'Wdrożenie i wsparcie',
      description: 'Wdrażamy rozwiązanie w produkcji, zapewniamy szkolenia i ciągłe wsparcie techniczne oraz monitoring działania.'
    }
  ];

  const caseStudyEffects = [
    'Redukcja czasu przetwarzania zamówień o 70%',
    'Automatyzacja 80% powtarzalnych zadań',
    'Poprawa dokładności o 95%',
    'Oszczędność 30h tygodniowo na procesach administracyjnych'
  ];

  const benefitIcons = [RefreshCw, Network, Zap, Shield];
  const serviceIcons = [MessageSquare, Workflow, BarChart, Eye, BrainCircuit];
  const processIcons = [Target, Lightbulb, Cpu, TrendingUp];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen py-12 flex items-center relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                <BrainCircuit className="w-4 h-4" />
                <span>AI i Automatyzacja</span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                Automatyzuj i optymalizuj z pomocą AI
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Wykorzystaj potencjał sztucznej inteligencji i automatyzacji, aby przyspieszyć procesy biznesowe, zwiększyć wydajność i osiągnąć lepsze wyniki.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/kontakt">
                  <StarGradientButton>
                    Porozmawiajmy o projekcie
                  </StarGradientButton>
                </Link>

                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 border-2 border-gray-200 rounded-2xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  Zobacz realizacje
                </Link>
              </div>
            </div>

            {/* Right - Hero Visual */}
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-3xl"></div>

                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BrainCircuit className="w-5 h-5 text-blue-400" />
                        <span className="text-xs text-gray-400 font-mono">AI System</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 bg-blue-500/20 rounded-xl p-4 animate-pulse" style={{ animationDuration: '2s' }}>
                        <Bot className="w-8 h-8 text-blue-300" />
                        <div className="flex-1">
                          <div className="h-3 bg-blue-300/50 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-blue-300/30 rounded w-1/2"></div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>

                      <div className="flex items-center space-x-3 bg-blue-500/20 rounded-xl p-4 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}>
                        <Workflow className="w-8 h-8 text-blue-300" />
                        <div className="flex-1">
                          <div className="h-3 bg-blue-300/50 rounded w-2/3 mb-2"></div>
                          <div className="h-2 bg-blue-300/30 rounded w-1/3"></div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>

                      <div className="flex items-center space-x-3 bg-blue-500/20 rounded-xl p-4 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.6s' }}>
                        <Database className="w-8 h-8 text-blue-300" />
                        <div className="flex-1">
                          <div className="h-3 bg-blue-300/50 rounded w-5/6 mb-2"></div>
                          <div className="h-2 bg-blue-300/30 rounded w-2/5"></div>
                        </div>
                        <Clock className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Korzyści z AI i automatyzacji
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Nowoczesne rozwiązania, które transformują Twój biznes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];

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
                        {benefit.title}
                      </h3>
                    </div>

                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>

                    <div className="mt-8 h-1 w-20 bg-blue-600 rounded-full group-hover:w-32 transition-all duration-500"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Nasze usługi
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Service List */}
            <div className="space-y-3">
              {services.map((service, index) => {
                const Icon = serviceIcons[index];
                const isActive = activeModule === index;

                return (
                  <button
                    key={index}
                    style={{
                      clipPath: "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)"
                    }}
                    onClick={() => setActiveModule(index)}
                    className={`w-full text-left p-0.5 rounded-md transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xl scale-105'
                        : 'bg-gray-100 text-slate-900 hover:bg-blue-100'
                    }`}
                  >
                    <div
                      style={{
                        clipPath: "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)"
                      }}
                      className="flex p-6 items-center space-x-4"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-white/20' : 'bg-blue-600/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                      </div>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right - Service Details */}
            <div
              style={{
                background: "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
              }}
              className="rounded-md shadow-md shadow-blue-300 p-0.5"
            >
              <div className="space-y-6 bg-white rounded-md p-8">
                <div className="flex items-center space-x-4 mb-6">
                  {(() => {
                    const Icon = serviceIcons[activeModule];
                    return (
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    );
                  })()}
                  <h3 className="text-2xl font-bold text-slate-900">
                    {services[activeModule]?.title}
                  </h3>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {services[activeModule]?.description}
                </p>

                <div className="bg-linear-to-br from-slate-50 to-white rounded-2xl p-6 border border-blue-100">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">
                    Zastosowania:
                  </h4>
                  <ul className="space-y-3">
                    {services[activeModule]?.applications.map((app, appIndex) => (
                      <li
                        key={appIndex}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0" />
                        <span className="text-slate-700 text-sm">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-linear-to-r from-blue-50 to-blue-50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-slate-900 font-semibold flex items-center">
                    <Zap className="w-5 h-5 text-blue-600 mr-2" />
                    Efekt: {services[activeModule]?.effect}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Case Study
            </h2>
          </div>

          <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  Cel:
                </h3>
                <p className="text-blue-100">Automatyzacja procesów biznesowych w średniej firmie produkcyjnej, redukcja czasu przetwarzania zamówień i eliminacja błędów manualnych.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2" />
                  Rozwiązanie:
                </h3>
                <p className="text-blue-100">Wdrożenie kompleksowego systemu automatyzacji z wykorzystaniem AI do przetwarzania zamówień, zarządzania magazynem i generowania raportów.</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Efekty:
              </h3>
              <ul className="space-y-3">
                {caseStudyEffects.map((effect, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 shrink-0" />
                    <span>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-linear-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/20">
              <p className="text-lg font-bold flex items-center">
                <BarChart className="w-6 h-6 mr-2" />
                Wynik: 300% wzrost wydajności procesów i oszczędność 30h tygodniowo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Nasz proces
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const Icon = processIcons[index];

              return (
                <div key={index} className="relative">
                  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-600/30 h-full">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mt-4">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <span className="text-slate-900 font-semibold">Pełna zgodność z RODO i standardami bezpieczeństwa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>

            <h2
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Gotowy na transformację?
            </h2>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Skontaktuj się z nami, aby omówić możliwości automatyzacji i AI dla Twojej firmy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/kontakt">
                <StarGradientButton>
                  Porozmawiajmy
                </StarGradientButton>
              </Link>

            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="text-slate-500 text-sm">lub napisz bezpośrednio</p>
              <a
                href="mailto:kontakt@cetuspro.pl"
                className="text-lg font-semibold text-blue-600 hover:opacity-70 transition-opacity"
              >
                kontakt@cetuspro.pl
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
