'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, Target, Users, Lightbulb, Rocket, Award, BarChart3, Shield } from 'lucide-react';
import { useState } from 'react';
import StarGradientButton from '@/app/components/ui/gradientBackground';

export default function CetusVentureCapitalPage() {
  const [activePhase, setActivePhase] = useState(0);

  const benefits = [
    {
      title: 'Kapitał na rozwój',
      description: 'Zapewniamy finansowanie dostosowane do etapu rozwoju Twojego startupu - od seed do Series A i dalej.'
    },
    {
      title: 'Mentoring i doradztwo',
      description: 'Nasz zespół ekspertów wspiera Cię w kluczowych decyzjach biznesowych i technologicznych.'
    },
    {
      title: 'Sieć kontaktów',
      description: 'Zyskujesz dostęp do naszej sieci partnerów, inwestorów i potencjalnych klientów.'
    },
    {
      title: 'Wsparcie techniczne',
      description: 'Pomagamy w budowie i skalowaniu produktu technologicznego na najwyższym poziomie.'
    }
  ];

  const phases = [
    {
      title: 'Pre-seed & Seed',
      description: 'Finansowanie na początku drogi - od pomysłu do pierwszych klientów.',
      range: '50k - 500k PLN'
    },
    {
      title: 'Series A',
      description: 'Wsparcie w skalowaniu biznesu i zdobywaniu rynku.',
      range: '500k - 5M PLN'
    },
    {
      title: 'Growth Stage',
      description: 'Kapitał na ekspansję międzynarodową i rozwój zespołu.',
      range: '5M+ PLN'
    }
  ];

  const criteria = [
    {
      icon: Lightbulb,
      title: 'Innowacyjny pomysł',
      description: 'Szukamy startupów z unikalnym produktem rozwiązującym realny problem.'
    },
    {
      icon: Users,
      title: 'Silny zespół',
      description: 'Inwestujemy w ludzi - zespół z komplementarnymi kompetencjami i pasją.'
    },
    {
      icon: TrendingUp,
      title: 'Potencjał wzrostu',
      description: 'Startupy z jasną ścieżką do skalowalności i dużego rynku.'
    },
    {
      icon: Target,
      title: 'Dopasowanie strategiczne',
      description: 'Projekty zgodne z naszą specjalizacją technologiczną.'
    }
  ];

  const portfolio = [
    {
      name: 'TechStart AI',
      sector: 'Artificial Intelligence',
      stage: 'Series A',
      description: 'Platforma AI do automatyzacji procesów biznesowych'
    },
    {
      name: 'HealthConnect',
      sector: 'HealthTech',
      stage: 'Seed',
      description: 'Aplikacja łącząca pacjentów z lekarzami specjalistami'
    },
    {
      name: 'EcoDelivery',
      sector: 'GreenTech',
      stage: 'Pre-seed',
      description: 'Ekologiczna platforma dostaw last-mile'
    }
  ];

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
                  <span>Cetus</span>
                </div>
                <span className="block text-slate-900 min-h-[1.2em] text-center">
                  <span className="text-blue-600">Venture Capital</span>
                </span>
              </h1>
            </div>

            <div className="space-y-2 items-center justify-center flex flex-col max-w-lg relative w-full px-4 mt-8">
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed text-center">
                Inwestujemy w obiecujące startupy technologiczne. Nie tylko kapitał - ale także mentoring, kontakty i wsparcie techniczne.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/kontakt">
                  <StarGradientButton>
                    <span className="flex items-center gap-2">
                      Wyślij pitch deck
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
              Co oferujemy startupom?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Kompleksowe wsparcie na każdym etapie rozwoju
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
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
              Etapy finansowania
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Inwestujemy na każdym etapie rozwoju
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-3">
              {phases.map((phase, index) => {
                const isActive = activePhase === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActivePhase(index)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xl scale-105'
                        : 'bg-white text-slate-900 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{phase.title}</h3>
                      <p className={`text-sm ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                        {phase.range}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-slate-900">
                    {phases[activePhase]?.title}
                  </h3>
                  <p className="text-lg text-blue-600 font-semibold">
                    {phases[activePhase]?.range}
                  </p>
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
                    {activePhase === 0 && (
                      <>
                        <div className="flex items-center space-x-3 bg-blue-600/20 rounded-lg p-4">
                          <Lightbulb className="w-6 h-6 text-blue-400" />
                          <div className="flex-1">
                            <div className="h-2 bg-blue-400/60 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-blue-400/40 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-blue-600/15 rounded-lg p-4">
                          <Rocket className="w-6 h-6 text-blue-400" />
                          <div className="flex-1">
                            <div className="h-2 bg-blue-400/50 rounded w-2/3 mb-2"></div>
                            <div className="h-2 bg-blue-400/30 rounded w-1/3"></div>
                          </div>
                        </div>
                      </>
                    )}

                    {activePhase === 1 && (
                      <>
                        <div className="flex items-center space-x-3 bg-blue-600/20 rounded-lg p-4">
                          <TrendingUp className="w-6 h-6 text-blue-400" />
                          <div className="flex-1">
                            <div className="h-2 bg-blue-400/60 rounded w-full mb-2"></div>
                            <div className="h-2 bg-blue-400/40 rounded w-3/4"></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-blue-600/15 rounded-lg p-4">
                          <BarChart3 className="w-6 h-6 text-blue-400" />
                          <div className="flex-1">
                            <div className="h-2 bg-blue-400/50 rounded w-5/6 mb-2"></div>
                            <div className="h-2 bg-blue-400/30 rounded w-2/3"></div>
                          </div>
                        </div>
                      </>
                    )}

                    {activePhase === 2 && (
                      <>
                        <div className="flex items-center space-x-3 bg-blue-600/20 rounded-lg p-4">
                          <Award className="w-6 h-6 text-blue-400" />
                          <div className="flex-1">
                            <div className="h-2 bg-blue-400/60 rounded w-full mb-2"></div>
                            <div className="h-2 bg-blue-400/40 rounded w-5/6"></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-blue-600/15 rounded-lg p-4">
                          <Shield className="w-6 h-6 text-blue-400" />
                          <div className="flex-1">
                            <div className="h-2 bg-blue-400/50 rounded w-11/12 mb-2"></div>
                            <div className="h-2 bg-blue-400/30 rounded w-3/4"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <p className="text-slate-700 leading-relaxed">
                    {phases[activePhase]?.description}
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
              Kryteria inwestycyjne
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Czego szukamy w startupach?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {criteria.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
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
              Nasze portfolio
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Startupy, które wspieramy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((company, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-br from-blue-600 to-blue-500 p-6 relative">
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                      {company.stage}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {company.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-semibold mb-4">
                    {company.sector}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {company.description}
                  </p>
                </div>
              </div>
            ))}
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
              Masz obiecujący startup?
            </h2>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Skontaktuj się z nami i wyślij swój pitch deck. Odezwiemy się w ciągu 48 godzin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/kontakt">
                <StarGradientButton>
                  Wyślij pitch deck
                </StarGradientButton>
              </Link>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="text-slate-500 text-sm">lub napisz bezpośrednio</p>
              <a
                href="mailto:vc@cetuspro.pl"
                className="text-lg font-semibold text-blue-600 hover:opacity-70 transition-opacity"
              >
                vc@cetuspro.pl
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
