'use client';

import Link from 'next/link';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import { urlFor } from '@/sanity/lib/image';
import {
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Users,
  Shield,
} from 'lucide-react';

// Mapowanie ikon
const iconMap: Record<string, any> = {
  TrendingUp,
  Clock,
  Target,
  Zap,
  Users,
  Shield,
  CheckCircle2,
};

interface CaseStudy {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  category?: string;
  description?: string;
  image?: any;
  solution?: string;
  results?: string[];
  technologies?: string[];
  modules?: Array<{
    icon?: string;
    title?: string;
    description?: string[];
    image?: any;
  }>;
  stats?: Array<{
    value?: string;
    label?: string;
    icon?: string;
  }>;
}

export default function CaseStudyDetail({ caseStudy }: { caseStudy: CaseStudy }) {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót do Case Studies
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {caseStudy.category && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
                  {caseStudy.category}
                </div>
              )}

              {caseStudy.title && (
                <h1
                  className="text-4xl lg:text-6xl tracking-tighter text-slate-900 leading-[0.9] font-bold"
                  style={{ fontFamily: "var(--font-michroma)" }}
                >
                  {caseStudy.title}
                </h1>
              )}

              {caseStudy.description && (
                <p className="text-lg text-slate-600 leading-relaxed">
                  {caseStudy.description}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                <Link href="/kontakt">
                  <StarGradientButton>
                    Zobacz, jak możemy pomóc
                  </StarGradientButton>
                </Link>
              </div>
            </div>

            {caseStudy.image && (
              <div className="relative">
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-3xl p-3 shadow-2xl">
                  <div className="relative bg-black rounded-lg p-2">
                    <div className="relative bg-white rounded-sm overflow-hidden aspect-[16/10]">
                      <img
                        src={urlFor(caseStudy.image).width(1200).height(750).url()}
                        alt={caseStudy.title || 'Case Study'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {caseStudy.stats && caseStudy.stats.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudy.stats.map((stat, index) => {
                const Icon = stat.icon ? iconMap[stat.icon] || TrendingUp : TrendingUp;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600/30 p-10"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {stat.value && (
                        <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">
                          {stat.value}
                        </div>
                      )}
                      {stat.label && (
                        <div className="text-slate-600 font-medium text-lg leading-relaxed">
                          {stat.label}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Solution Section */}


      {/* Modules Carousel */}


      {/* Modules List */}
      {caseStudy.modules && caseStudy.modules.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                Moduły systemu
              </h2>
            </div>

            <div className="space-y-20">
              {caseStudy.modules.map((module, index) => {
                if (!module.title) return null;
                const Icon = module.icon ? iconMap[module.icon] || CheckCircle2 : CheckCircle2;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-600/30 group">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                            {module.title}
                          </h3>
                        </div>

                        {module.description && module.description.length > 0 && (
                          <ul className="space-y-3">
                            {module.description.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <span className="text-slate-600 leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className={isEven ? 'order-2' : 'order-2 lg:order-1'}>
                      <div className="relative">
                        {module.image ? (
                          <div className="relative rounded-3xl shadow-2xl overflow-hidden">
                            <img
                              src={urlFor(module.image).width(800).height(600).url()}
                              alt={module.title || 'Moduł'}
                              className="w-full h-auto object-cover rounded-3xl"
                            />
                          </div>
                        ) : (
                          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-16 flex items-center justify-center aspect-video">
                            <div className="text-center">
                              <Icon className="w-24 h-24 text-white/20 mx-auto mb-4" />
                              <p className="text-white/60 text-sm">Mockup: {module.title}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                Efekty
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudy.results.map((result, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600/30 p-10"
                >
                  <div className="flex items-start gap-6">
                    <div className="text-5xl font-bold text-blue-600 leading-none select-none shrink-0">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-600 leading-relaxed text-lg">{result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies Section */}
      {caseStudy.technologies && caseStudy.technologies.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                Technologie użyte w projekcie
              </h2>
            </div>
            <div className="relative w-full mx-auto lg:mb-10 px-4 overflow-visible">
      <div className="relative max-w-6xl mx-auto flex justify-center items-center py-12 overflow-visible">



        {/* Right Top Line - pozycjonowana względem panelu */}

        <div
          className="relative w-full mx-6 md:mx-16 max-w-5xl min-h-20 py-6 md:h-28 bg-gray-50 border border-gray-100 text-gray-900 flex flex-col md:flex-row items-center justify-around sm:px-12 px-6 md:px-16 drop-shadow-xl z-10 stats-polygon"
          style={{
            filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))"
          }}
        >
          <div className="relative w-full md:grid-cols-4 grid  grid-cols-2 md:py-4 gap-4 md:gap-8 z-10">
          {caseStudy.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className=" text-slate-700 text-center font-medium text-xl   transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
          </div>
        </div>

        {/* --- Decorative Circuit Lines (SVG) - 2 osobne absolutne kontenery POZA panelem --- */}
        {/* Left Bottom Line - przyklejona do lewego dolnego rogu polygonu */}
        <div className="absolute hidden md:block left-0 bottom-0 w-[400px] h-[80px] pointer-events-none z-0" style={{ left: '0px', top: 'calc(5px)' }}>
          <svg className="w-full h-full" viewBox="0 0 300 70" preserveAspectRatio="none">
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
              {/* Delikatniejszy blur (zredukowany z 3 na 1.5) */}
              <filter id="softNeon" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M10 65 L35 65 L60 20 L300 20 L400 20"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              filter="url(#softNeon)"
              strokeLinecap="round"
            />
            <rect x="7" y="62" width="6" height="6" fill="#3b82f6" transform="rotate(45 10 65)" filter="url(#softNeon)" />
          </svg>
        </div>

        {/* Prawa Górna Linia */}
        <div className="absolute hidden md:block w-[400px] h-[80px] pointer-events-none z-0" style={{ right: '0px', bottom: 'calc(20px)' }}>
          <svg className="w-full h-full" viewBox="0 0 300 70" preserveAspectRatio="none">
            <path
              d="M10 65 L240 65 L265 20 L290 20 L294 20"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              filter="url(#softNeon)"
              strokeLinecap="round"
            />
            <rect x="287" y="17" width="6" height="6" fill="#93c5fd" transform="rotate(45 290 20)" filter="url(#softNeon)" />
          </svg>
        </div>

      </div>
    </div>

          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            Chcesz stworzyć podobne rozwiązanie?
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Skontaktuj się z nami i opowiedz o swoich potrzebach – stworzymy rozwiązanie dopasowane do Twojego biznesu.
          </p>
          <Link href="/kontakt">
            <StarGradientButton>
              Skontaktuj się z nami
            </StarGradientButton>
          </Link>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-all duration-300 border border-gray-200 hover:border-blue-600"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Powrót do wszystkich Case Studies</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
