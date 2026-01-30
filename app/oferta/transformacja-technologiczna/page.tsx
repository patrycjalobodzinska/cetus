'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Cloud, Layers, Zap, Shield, TrendingUp, Target, Settings, Database, Globe, GitBranch, Code } from 'lucide-react';
import { useState } from 'react';
import StarGradientButton from '@/app/components/ui/gradientBackground';

export default function TechnologyTransformationPage() {
  const [activeService, setActiveService] = useState(0);

  const benefits = [
    {
      title: 'Zwiększona efektywność',
      description: 'Nowoczesne technologie automatyzują procesy i eliminują powtarzalne zadania, zwiększając produktywność zespołu.'
    },
    {
      title: 'Konkurencyjność rynkowa',
      description: 'Transformacja technologiczna pozwala wyprzedzić konkurencję i lepiej odpowiadać na potrzeby klientów.'
    },
    {
      title: 'Skalowalność biznesu',
      description: 'Elastyczna infrastruktura IT umożliwia płynny rozwój firmy bez ograniczeń technicznych.'
    },
    {
      title: 'Obniżenie kosztów',
      description: 'Optymalizacja systemów i migracja do chmury znacząco redukują wydatki operacyjne.'
    }
  ];

  const services = [
    {
      title: 'Audyt technologiczny',
      description: 'Kompleksowa analiza obecnej infrastruktury IT, identyfikacja wąskich gardeł i obszarów wymagających modernizacji.'
    },
    {
      title: 'Migracja do chmury',
      description: 'Bezpieczne przeniesienie aplikacji i danych do środowiska chmurowego z zapewnieniem ciągłości działania.'
    },
    {
      title: 'Modernizacja aplikacji',
      description: 'Refaktoryzacja legacy code, aktualizacja frameworków i wdrożenie nowoczesnych architektur.'
    },
    {
      title: 'Automatyzacja procesów',
      description: 'Implementacja CI/CD, automatyzacja deploymentów i wprowadzenie praktyk DevOps.'
    },
    {
      title: 'Bezpieczeństwo IT',
      description: 'Wzmocnienie zabezpieczeń, implementacja najlepszych praktyk i zapewnienie zgodności z regulacjami.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Audyt i analiza',
      description: 'Dokładna ocena obecnej infrastruktury i zidentyfikowanie obszarów do poprawy'
    },
    {
      number: '02',
      title: 'Strategia transformacji',
      description: 'Opracowanie szczegółowego planu działania dostosowanego do celów biznesowych'
    },
    {
      number: '03',
      title: 'Implementacja',
      description: 'Stopniowe wdrażanie zmian z zachowaniem ciągłości działania systemów'
    },
    {
      number: '04',
      title: 'Optymalizacja',
      description: 'Monitorowanie wydajności i ciągłe doskonalenie wdrożonych rozwiązań'
    }
  ];

  const caseStudy = {
    client: 'Firma produkcyjna',
    challenge: 'Przestarzałe systemy IT ograniczały rozwój i generowały wysokie koszty utrzymania',
    goal: 'Modernizacja infrastruktury IT i poprawa efektywności operacyjnej',
    solution: 'Kompleksowa transformacja: migracja do chmury, modernizacja aplikacji, automatyzacja procesów',
    results: [
      '60% redukcja kosztów infrastruktury IT',
      '3x szybsze wdrażanie nowych funkcjonalności',
      '99.9% dostępność systemów krytycznych',
      'Pełna automatyzacja procesów deployment'
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
        <div className="mt-36 w-full justify-center container mx-auto pb-12 flex flex-col lg:flex-row items-center relative overflow-x-hidden">
          <div className="flex flex-col z-30 lg:pt-10 xl:pt-0 items-center justify-center relative px-4 lg:pl-10 lg:pr-0">
            <div className="relative lg:min-h-[280px] xl:min-h-[320px]">
              <h1
                className="text-4xl lg:text-7xl tracking-tighter text-slate-900 leading-[0.9] font-bold text-center"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                <div className="flex items-center justify-center gap-4 min-h-[1.2em]">
                  <span>Transformacja</span>
                </div>
                <span className="block text-slate-900 min-h-[1.2em] text-center">
                  <span className="text-blue-600">technologiczna</span> Twojej firmy
                </span>
              </h1>
            </div>

            <div className="space-y-2 items-center justify-center flex flex-col max-w-lg relative w-full px-4 mt-8">
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed text-center">
                Przeprowadzimy Twoją firmę przez kompleksową transformację cyfrową. Od audytu po wdrożenie nowoczesnych rozwiązań.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/kontakt">
                  <StarGradientButton>
                    <span className="flex items-center gap-2">
                      Rozpocznij transformację
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </StarGradientButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Dlaczego transformacja cyfrowa?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Korzyści, które przekładają się na realny wzrost biznesu
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600/30"
                >
                  <div className="relative p-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {benefit.title}
                    </h3>

                    <p className="text-lg text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>

                    <div className="mt-6 h-1 w-16 bg-blue-600 rounded-full group-hover:w-24 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Nasze usługi
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Kompleksowe wsparcie w każdym etapie transformacji
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-3">
              {services.map((service, index) => {
                const icons = [Settings, Cloud, Code, GitBranch, Shield];
                const Icon = icons[index % icons.length];
                const isActive = activeService === index;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xl scale-105'
                        : 'bg-white text-slate-900 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
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

            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  {(() => {
                    const icons = [Settings, Cloud, Code, GitBranch, Shield];
                    const Icon = icons[activeService % icons.length];
                    return (
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    );
                  })()}
                  <h3 className="text-2xl font-bold text-slate-900">
                    {services[activeService]?.title}
                  </h3>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-white/30 rounded w-3/4"></div>
                        <div className="h-2 bg-white/20 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-white/30 rounded w-2/3"></div>
                        <div className="h-2 bg-white/20 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <p className="text-slate-700 leading-relaxed">
                    {services[activeService]?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Proces transformacji
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sprawdzony proces w 4 etapach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl font-bold text-blue-600 leading-none select-none flex-shrink-0">
                    {step.number}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Historia sukcesu
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Zobacz, jak pomogliśmy firmie przejść transformację cyfrową
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="h-56 bg-gradient-to-br from-blue-600 to-blue-500 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-lg"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-lg"></div>
              </div>

              <div className="relative h-full flex flex-col justify-center">
                <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-4 w-fit">
                  <span className="text-white font-semibold text-sm">{caseStudy.client}</span>
                </div>
                <p className="text-white text-lg italic">"{caseStudy.challenge}"</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                    Cel
                  </h4>
                  <p className="text-slate-700 text-sm">{caseStudy.goal}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-2">
                    Rozwiązanie
                  </h4>
                  <p className="text-slate-700 text-sm">{caseStudy.solution}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-green-600 uppercase tracking-wide mb-4">
                  Efekty
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-900 font-semibold text-sm">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Gotowy na transformację?
            </h2>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Skontaktuj się z nami, aby omówić Twój projekt transformacji technologicznej i otrzymać bezpłatną konsultację.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/kontakt">
                <StarGradientButton>
                  Rozpocznij transformację
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
