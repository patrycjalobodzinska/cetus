'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Users, Target, Shield, Code, Layers, Database, Cloud, GitBranch } from 'lucide-react';
import { useState } from 'react';
import StarGradientButton from '@/app/components/ui/gradientBackground';

export default function OutsourcingPage() {
  const [activeModel, setActiveModel] = useState(0);

  const benefits = [
    {
      title: 'Redukcja kosztów',
      description: 'Zmniejsz koszty operacyjne nawet o 40% przy zachowaniu najwyższej jakości realizowanych projektów.'
    },
    {
      title: 'Dostęp do ekspertów',
      description: 'Współpracuj z doświadczonymi specjalistami z różnych dziedzin IT bez długotrwałego procesu rekrutacji.'
    },
    {
      title: 'Elastyczność i skalowalność',
      description: 'Łatwo dostosuj zespół do aktualnych potrzeb projektu - powiększaj lub zmniejszaj bez zobowiązań.'
    },
    {
      title: 'Fokus na biznes',
      description: 'Skup się na rozwoju biznesu, a my zajmiemy się technicznymi aspektami Twojego projektu.'
    }
  ];

  const models = [
    {
      title: 'Outsourcing projektowy',
      subtitle: 'Realizacja kompleksowych projektów',
      description: 'Przekaż nam cały projekt - od analizy wymagań, przez projektowanie i implementację, aż po wdrożenie i wsparcie. Idealne rozwiązanie dla firm, które chcą skupić się na biznesie.'
    },
    {
      title: 'IT Staff Augmentation',
      subtitle: 'Wzmocnienie istniejącego zespołu',
      description: 'Uzupełniamy Twój zespół o specjalistów z konkretnymi kompetencjami. Pracują jako integralna część Twojego zespołu, według Twoich procesów i metodologii.'
    },
    {
      title: 'Dedicated Team',
      subtitle: 'Dedykowany zespół deweloperski',
      description: 'Otrzymujesz dedykowany zespół, który pracuje wyłącznie nad Twoimi projektami. Pełna kontrola i transparentność przy zachowaniu elastyczności outsourcingu.'
    }
  ];

  const technologies = [
    {
      name: 'Frontend',
      items: ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript']
    },
    {
      name: 'Backend',
      items: ['Node.js', 'Python', 'Java', '.NET', 'PHP']
    },
    {
      name: 'Mobile',
      items: ['React Native', 'Flutter', 'iOS Native', 'Android Native']
    },
    {
      name: 'DevOps & Cloud',
      items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD']
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
                  <span>Outsourcing</span>
                </div>
                <span className="block text-slate-900 min-h-[1.2em] text-center">
                  <span className="text-blue-600">programistów</span> dla Twojego projektu
                </span>
              </h1>
            </div>

            <div className="space-y-2 items-center justify-center flex flex-col max-w-lg relative w-full px-4 mt-8">
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed text-center">
                Wzmocnij swój zespół doświadczonymi specjalistami lub powierz nam cały projekt. Elastycznie, efektywnie, profesjonalnie.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/kontakt">
                  <StarGradientButton>
                    <span className="flex items-center gap-2">
                      Porozmawiajmy o projekcie
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
              Dlaczego outsourcing IT?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Korzyści, które przekładają się na sukces Twojego projektu
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
              Modele współpracy
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Wybierz model dopasowany do potrzeb Twojego projektu
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-3">
              {models.map((model, index) => {
                const isActive = activeModel === index;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveModel(index)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xl scale-105'
                        : 'bg-white text-slate-900 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">{model.title}</h3>
                      <p className={`text-sm ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                        {model.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {models[activeModel]?.title}
                  </h3>
                  <p className="text-base text-slate-500">
                    {models[activeModel]?.subtitle}
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

                  {activeModel === 0 && (
                    <div className="space-y-3">
                      <div className="bg-blue-600/20 rounded-lg p-4 flex items-center space-x-3">
                        <Code className="w-6 h-6 text-blue-400" />
                        <div className="flex-1">
                          <div className="h-2 bg-blue-400/60 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-blue-400/40 rounded w-1/2"></div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="bg-blue-600/15 rounded-lg p-4 flex items-center space-x-3">
                        <Layers className="w-6 h-6 text-blue-400" />
                        <div className="flex-1">
                          <div className="h-2 bg-blue-400/50 rounded w-2/3 mb-2"></div>
                          <div className="h-2 bg-blue-400/30 rounded w-1/3"></div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  )}

                  {activeModel === 1 && (
                    <div className="space-y-4">
                      <div className="bg-blue-600/10 rounded-lg p-4">
                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg shadow-sm mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="h-2 bg-white/30 rounded w-24 mb-1"></div>
                              <div className="h-2 bg-white/20 rounded w-16"></div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-blue-400" />
                        </div>

                        <div className="p-4 bg-blue-600/20 rounded-lg border-2 border-dashed border-blue-400/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Users className="w-6 h-6 text-blue-400" />
                              <div>
                                <div className="h-2 bg-blue-400/60 rounded w-28 mb-1"></div>
                                <div className="h-2 bg-blue-400/40 rounded w-20"></div>
                              </div>
                            </div>
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModel === 2 && (
                    <div className="space-y-3">
                      <div className="bg-blue-600/20 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Database className="w-5 h-5 text-blue-400" />
                          <div className="h-2 bg-blue-400/60 rounded w-24"></div>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>

                      <div className="bg-blue-600/20 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Cloud className="w-5 h-5 text-blue-400" />
                          <div className="h-2 bg-blue-400/60 rounded w-28"></div>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>

                      <div className="bg-blue-600/20 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <GitBranch className="w-5 h-5 text-blue-400" />
                          <div className="h-2 bg-blue-400/60 rounded w-32"></div>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <p className="text-slate-700 leading-relaxed">
                    {models[activeModel]?.description}
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
              Technologie, z którymi pracujemy
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Szeroki zakres kompetencji technologicznych
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((category, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-sm text-slate-700 bg-gradient-to-r from-blue-50/50 to-white px-3 py-2 rounded-lg hover:from-blue-50 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
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
              Gotowy na start?
            </h2>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Skontaktuj się z nami, aby omówić Twój projekt i dowiedzieć się, jak możemy wzmocnić Twój zespół.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/kontakt">
                <StarGradientButton>
                  Porozmawiajmy o projekcie
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
