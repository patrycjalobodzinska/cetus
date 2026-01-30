'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Lock,
  Eye,
  FileCheck,
  GraduationCap,
  AlertTriangle,
  Zap,
  Target,
  Lightbulb,
  TrendingUp,
  Search,
  Bug,
  Activity,
  FileText,
  Users
} from 'lucide-react';
import { useState } from 'react';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import DecorativeImage from '@/app/components/DecorativeImage';

export default function CybersecurityPage() {
  const [activeService, setActiveService] = useState(0);

  const whyBenefits = [
    {
      title: 'Ochrona przed cyberatakami',
      description: 'Kompleksowa ochrona Twojej infrastruktury przed najnowszymi zagrożeniami cybernetycznymi, w tym ransomware, phishing i atakami DDoS.'
    },
    {
      title: 'Zgodność z przepisami',
      description: 'Pomagamy spełnić wymagania RODO, ISO 27001 i innych standardów bezpieczeństwa, chroniąc dane osobowe i wrażliwe informacje.'
    },
    {
      title: 'Ciągły monitoring',
      description: '24/7 monitoring bezpieczeństwa z automatycznym wykrywaniem i reagowaniem na incydenty, zapewniający spokój ducha.'
    },
    {
      title: 'Szkolenia i świadomość',
      description: 'Edukujemy Twój zespół w zakresie najlepszych praktyk bezpieczeństwa, tworząc pierwszą linię obrony przed cyberzagrożeniami.'
    }
  ];

  const auditScope = [
    'Analiza infrastruktury IT',
    'Przegląd polityk bezpieczeństwa',
    'Testy penetracyjne',
    'Ocena zgodności z RODO',
    'Analiza podatności',
    'Rekomendacje poprawy'
  ];

  const pentestingScope = [
    'Testy aplikacji webowych',
    'Testy aplikacji mobilnych',
    'Testy infrastruktury sieciowej',
    'Testy socjotechniczne',
    'Testy fizycznego bezpieczeństwa',
    'Raportowanie i rekomendacje'
  ];

  const monitoringBenefits = [
    'Wykrywanie zagrożeń w czasie rzeczywistym',
    'Automatyczne reagowanie na incydenty',
    'Analiza logów i zdarzeń',
    'Alerty i powiadomienia',
    'Raporty bezpieczeństwa',
    'Integracja z istniejącymi systemami'
  ];

  const gdprServices = [
    'Audyt zgodności z RODO',
    'Przygotowanie dokumentacji',
    'Wdrożenie procedur',
    'Szkolenia dla pracowników',
    'Wsparcie w raportowaniu incydentów',
    'Aktualizacja zgodności'
  ];

  const trainingTopics = [
    'Świadomość cyberbezpieczeństwa',
    'Rozpoznawanie phishingu',
    'Bezpieczne hasła i uwierzytelnianie',
    'Ochrona danych osobowych',
    'Zarządzanie incydentami',
    'Najlepsze praktyki bezpieczeństwa'
  ];

  const caseStudyResults = [
    '100% zgodność z RODO',
    '60% redukcja incydentów bezpieczeństwa',
    '24/7 monitoring wdrożony',
    'Szkolenia dla 200+ pracowników'
  ];

  // Combine all services
  const services = [
    { icon: FileCheck, title: 'Audyty bezpieczeństwa', items: auditScope, result: 'Kompleksowa ocena bezpieczeństwa z szczegółowym raportem i rekomendacjami' },
    { icon: Bug, title: 'Testy penetracyjne', items: pentestingScope, result: 'Identyfikacja rzeczywistych podatności przed atakującymi' },
    { icon: Activity, title: 'Monitoring bezpieczeństwa', items: monitoringBenefits, result: 'Ciągła ochrona z automatycznym wykrywaniem zagrożeń' },
    { icon: FileText, title: 'Zgodność z RODO', items: gdprServices, result: 'Pełna zgodność z przepisami ochrony danych osobowych' },
    { icon: GraduationCap, title: 'Szkolenia bezpieczeństwa', items: trainingTopics, result: 'Zwiększona świadomość i umiejętności zespołu w zakresie bezpieczeństwa' }
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
                className="text-5xl md:text-6xl lg:text-6xl font-bold text-slate-900 leading-tight"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                Kompleksowa ochrona cybernetyczna dla Twojej firmy
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Chronimy Twoją firmę przed cyberzagrożeniami dzięki zaawansowanym rozwiązaniom bezpieczeństwa, audytom i ciągłemu monitoringowi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/kontakt">
                  <StarGradientButton>
                    Porozmawiajmy o bezpieczeństwie
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

            {/* Right - Hero Image */}
            <DecorativeImage
              src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Cybersecurity"
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
              Dlaczego warto wybrać nasze rozwiązania?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Kompleksowa ochrona cybernetyczna dostosowana do potrzeb Twojej firmy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyBenefits.map((benefit, index) => {
              const icons = [Search, Shield, Zap, FileCheck];
              const Icon = icons[index];

              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600/30"
                >
                  <div className="relative p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {benefit.title}
                      </h3>
                    </div>

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

      {/* Services - Interactive Tabs */}
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
              Kompleksowa ochrona Twojej firmy przed zagrożeniami cybernetycznymi
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Service List */}
            <div className="space-y-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = activeService === index;

                return (
                  <button style={{     clipPath: "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)"
                  }}
                    key={index}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left p-0.5 rounded-md transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white   shadow-xl scale-105'
                        : 'bg-gray-100 text-slate-900 hover:bg-blue-100 '
                    }`}
                  >
                    <div style={{     clipPath: "polygon(0% 20px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 5% 100%, 0% 80%)"
                  }} className="flex  p-6  items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-white/20' : 'bg-blue-600/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${ isActive ? 'text-white' : 'text-blue-600'}`} />
                      </div>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right - Service Details */}
            <div style={{  background: "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
       }} className=" rounded-md  shadow-md shadow-blue-300 p-0.5 ">
              <div className="space-y-6 bg-white rounded-md p-8">
                <div className="flex items-center space-x-4 mb-6">
                  {(() => {
                    const Icon = services[activeService].icon;
                    return (
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    );
                  })()}
                  <h3 className="text-2xl font-bold text-slate-900">
                    {services[activeService].title}
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
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-green-500/20 rounded-lg p-3">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-green-300/50 rounded w-3/4"></div>
                        <div className="h-2 bg-green-300/30 rounded w-1/2"></div>
                      </div>
                      <Lock className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex items-center space-x-3 bg-blue-600/20 rounded-lg p-3">
                      <Shield className="w-6 h-6 text-blue-400" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-blue-400/50 rounded w-2/3"></div>
                        <div className="h-2 bg-blue-400/30 rounded w-1/3"></div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </div>

                {/* Service items */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <ul className="space-y-3">
                    {services[activeService].items.slice(0, 5).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <span className="text-slate-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Result */}
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <p className="text-slate-900 font-semibold flex items-center">
                    <Zap className="w-5 h-5 text-blue-600 mr-2" />
                    {services[activeService].result}
                  </p>
                </div>
              </div>
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
              Chcesz zabezpieczyć swoją firmę?
            </h2>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Skontaktuj się z nami, aby omówić potrzeby bezpieczeństwa Twojej firmy i otrzymać spersonalizowaną ofertę ochrony cybernetycznej.
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
    </div>
  );
}
