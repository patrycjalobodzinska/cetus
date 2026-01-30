'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Users, BookOpen, Award, Target, Zap, TrendingUp, Code, Brain, Briefcase, GraduationCap, Building2, UserCheck } from 'lucide-react';
import { useState } from 'react';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import DecorativeImage from '@/app/components/DecorativeImage';

export default function AcademyPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const benefits = [
    {
      title: 'Praktyczne umiejętności',
      description: 'Uczymy przez praktykę - każdy kurs zawiera realne projekty i zadania, które przygotują Cię do pracy w branży IT.'
    },
    {
      title: 'Doświadczeni mentorzy',
      description: 'Nasi trenerzy to praktycy z wieloletnim doświadczeniem, którzy dzielą się wiedzą z prawdziwych projektów.'
    },
    {
      title: 'Elastyczny harmonogram',
      description: 'Dostosowujemy się do Twojego tempa - możesz uczyć się w dogodnym dla siebie czasie i miejscu.'
    },
    {
      title: 'Certyfikaty i wsparcie',
      description: 'Po ukończeniu kursu otrzymujesz certyfikat oraz wsparcie w znalezieniu pierwszej pracy w branży IT.'
    }
  ];

  const categories = [
    {
      title: 'Programowanie',
      description: 'Kompleksowe kursy programowania od podstaw do zaawansowanych technik. Uczymy najpopularniejszych języków i frameworków, takich jak JavaScript, Python, React, Node.js i wiele innych. Każdy kurs zawiera praktyczne projekty i zadania, które pomogą Ci zbudować portfolio.'
    },
    {
      title: 'AI i Machine Learning',
      description: 'Poznaj tajniki sztucznej inteligencji i uczenia maszynowego. Naucz się budować modele AI, analizować dane i tworzyć inteligentne rozwiązania. Kursy obejmują zarówno podstawy teoretyczne, jak i praktyczne zastosowania w biznesie.'
    },
    {
      title: 'Zarządzanie projektami IT',
      description: 'Opanuj metodyki zarządzania projektami IT, takie jak Agile, Scrum i Kanban. Naucz się efektywnie planować, organizować i realizować projekty technologiczne. Kursy przygotowują do pracy jako Product Owner, Scrum Master lub Project Manager.'
    }
  ];

  const audience = [
    {
      title: 'Początkujący',
      description: 'Dla osób, które dopiero zaczynają przygodę z programowaniem i chcą zdobyć solidne fundamenty.'
    },
    {
      title: 'Średnio zaawansowani',
      description: 'Dla programistów, którzy chcą poszerzyć swoje umiejętności i nauczyć się nowych technologii.'
    },
    {
      title: 'Firmy i zespoły',
      description: 'Szkolenia dedykowane dla firm, które chcą podnieść kompetencje swojego zespołu technicznego.'
    }
  ];

  const distinctive = [
    'Praktyczne projekty w każdym kursie',
    'Dostęp do materiałów na zawsze',
    'Wsparcie mentora przez cały czas trwania kursu',
    'Społeczność aktywnych studentów',
    'Aktualizowane treści zgodne z trendami',
    'Możliwość konsultacji indywidualnych',
    'Przygotowanie do rozmów rekrutacyjnych',
    'Pomoc w budowaniu portfolio',
    'Dostęp do zamkniętej grupy na platformie'
  ];

  const benefitIcons = [Users, Award, Zap, CheckCircle];
  const categoryIcons = [Code, Brain, Briefcase];
  const audienceIcons = [GraduationCap, UserCheck, Building2];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen py-12 flex items-center relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                <GraduationCap className="w-4 h-4" />
                <span>CetusPro Academy</span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                Rozwijaj swoje umiejętności z CetusPro Academy
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Kompleksowe szkolenia i kursy z zakresu programowania, AI, zarządzania projektami IT. Uczymy praktycznych umiejętności, które są potrzebne w dzisiejszym rynku pracy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/kontakt">
                  <StarGradientButton>
                    Zapisz się na kurs
                  </StarGradientButton>
                </Link>

                <Link
                  href="#categories"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 border-2 border-gray-200 rounded-2xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  Zobacz ofertę kursów
                </Link>
              </div>
            </div>

            {/* Right - Hero Image */}
            <DecorativeImage
              src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="CetusPro Academy - szkolenia i kursy IT"
            />
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
              Dlaczego CetusPro Academy?
            </h2>
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

      {/* Categories Section */}
      <section id="categories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Kategorie kursów
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Wybierz kategorię, która Cię interesuje i rozpocznij swoją przygodę z IT
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Category List */}
            <div className="space-y-3">
              {categories.map((category, index) => {
                const Icon = categoryIcons[index];
                const isActive = activeCategory === index;

                return (
                  <button
                    key={index}
                    style={{
                      clipPath: "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)"
                    }}
                    onClick={() => setActiveCategory(index)}
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
                      <h3 className="text-lg font-bold">{category.title}</h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right - Category Details */}
            <div
              style={{
                background: "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
              }}
              className="rounded-md shadow-md shadow-blue-300 p-0.5"
            >
              <div className="space-y-6 bg-white rounded-md p-8">
                <div className="flex items-center space-x-4 mb-6">
                  {(() => {
                    const Icon = categoryIcons[activeCategory];
                    return (
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    );
                  })()}
                  <h3 className="text-2xl font-bold text-slate-900">
                    {categories[activeCategory]?.title}
                  </h3>
                </div>

                {/* Visual representation */}
                <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <GraduationCap className="w-5 h-5 text-blue-400" aria-hidden="true" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-blue-500/20 rounded-lg p-3">
                      <BookOpen className="w-6 h-6 text-blue-400" aria-hidden="true" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-blue-300/50 rounded w-3/4"></div>
                        <div className="h-2 bg-blue-300/30 rounded w-1/2"></div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="flex items-center space-x-3 bg-blue-500/20 rounded-lg p-3">
                      <Award className="w-6 h-6 text-blue-400" aria-hidden="true" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-blue-300/50 rounded w-2/3"></div>
                        <div className="h-2 bg-blue-300/30 rounded w-1/3"></div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-linear-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
                  <p className="text-slate-700 leading-relaxed">
                    {categories[activeCategory]?.description}
                  </p>
                </div>

                <Link
                  href="/kontakt"
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Dowiedz się więcej
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Dla kogo są nasze kursy?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {audience.map((item, index) => {
              const Icon = audienceIcons[index];

              return (
                <div
                  key={index}
                  className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-600/30 text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Distinctive Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Co wyróżnia nasze kursy?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {distinctive.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-600/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              </div>
            ))}
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
              Gotowy na start?
            </h2>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Skontaktuj się z nami i dowiedz się więcej o naszych kursach. Pomóżemy Ci wybrać najlepszą ścieżkę rozwoju.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/kontakt">
                <StarGradientButton>
                  Zapisz się na kurs
                </StarGradientButton>
              </Link>

              <Link
                href="#categories"
                className="inline-flex items-center justify-center px-9 py-4 bg-white text-slate-900 border-2 border-gray-300 rounded-2xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Zobacz ofertę kursów
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
