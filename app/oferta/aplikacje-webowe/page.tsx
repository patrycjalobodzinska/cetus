'use client';


import Link from 'next/link';
import { ArrowRight, CheckCircle, Lock, Wallet, MessageCircle, Map, BarChart, Palette, Shield, Zap, Users, Layers } from 'lucide-react';
import { useState } from 'react';
import StarGradientButton from '@/app/components/ui/gradientBackground';

export default function WebAppsPage() {
 const [activeModule, setActiveModule] = useState(0);

  const iconMap: Record<string, any> = {
    'lock': Lock,
    'wallet': Wallet,
    'message-circle': MessageCircle,
    'map': Map,
    'bar-chart': BarChart,
    'palette': Palette
  };

  const modules = [
    {
      icon: 'lock',
      title: 'Logowanie i bezpieczeństwo',
      items: ['Autoryzacja OAuth2', 'Dwuskładnikowe uwierzytelnianie (2FA)', 'Zarządzanie sesjami', 'Ochrona przed atakami CSRF']
    },
    {
      icon: 'wallet',
      title: 'Płatności i monetyzacja',
      items: ['Integracja z Stripe/PayPal', 'Subskrypcje i płatności cykliczne', 'Zarządzanie fakturami', 'Dashboard finansowy']
    },
    {
      icon: 'message-circle',
      title: 'Komunikacja i powiadomienia',
      items: ['Czat w czasie rzeczywistym', 'Powiadomienia push', 'E-maile transakcyjne', 'Integracja z SMS']
    },
    {
      icon: 'map',
      title: 'Nawigacja i lokalizacja',
      items: ['Mapy interaktywne', 'Geolokalizacja', 'Wielojęzyczność (i18n)', 'Wyszukiwanie geograficzne']
    },
    {
      icon: 'bar-chart',
      title: 'Analiza danych',
      items: ['Dashboard analityczny', 'Raporty w czasie rzeczywistym', 'Eksport danych', 'Wizualizacja danych']
    },
    {
      icon: 'palette',
      title: 'Personalizacja UX',
      items: ['Motywy i kolorystyka', 'Dostosowanie interfejsu', 'Preferencje użytkownika', 'Tryb ciemny']
    }
  ];

  const caseStudies = [
    {
      title: 'System rezerwacji fitness',
      goal: 'Stworzenie platformy do zarządzania rezerwacjami zajęć fitness',
      solution: 'Aplikacja webowa z kalendarzem, płatnościami online i powiadomieniami',
      result: '300% wzrost rezerwacji online w pierwszym miesiącu'
    },
    {
      title: 'E-commerce dla małej firmy',
      goal: 'Przeniesienie sklepu stacjonarnego do internetu',
      solution: 'Nowoczesna platforma e-commerce z integracją płatności i zarządzaniem magazynem',
      result: '50% wzrost sprzedaży w ciągu 3 miesięcy'
    },
    {
      title: 'Dashboard analityczny',
      goal: 'Centralizacja danych biznesowych w jednym miejscu',
      solution: 'Interaktywny dashboard z raportami i wizualizacjami',
      result: 'Oszczędność 10h tygodniowo na analizie danych'
    }
  ];

  const whyFeatures = [
    {
      title: 'Nowoczesne technologie',
      description: 'Wykorzystujemy najnowsze frameworki i narzędzia, aby zapewnić szybkość, bezpieczeństwo i skalowalność Twojej aplikacji.'
    },
    {
      title: 'Responsywny design',
      description: 'Twoja aplikacja będzie doskonale wyglądać i działać na każdym urządzeniu - od telefonu po duży ekran desktopowy.'
    },
    {
      title: 'Optymalizacja wydajności',
      description: 'Zoptymalizujemy każdy aspekt aplikacji, aby zapewnić szybkie ładowanie i płynne działanie nawet przy dużym obciążeniu.'
    },
    {
      title: 'Bezpieczeństwo',
      description: 'Implementujemy najlepsze praktyki bezpieczeństwa, aby chronić dane Twoich użytkowników i Twojej firmy.'
    },
    {
      title: 'SEO i dostępność',
      description: 'Twoja aplikacja będzie łatwo znajdowana w wyszukiwarkach i dostępna dla wszystkich użytkowników.'
    },
    {
      title: 'Wsparcie i utrzymanie',
      description: 'Zapewniamy ciągłe wsparcie techniczne i aktualizacje, aby Twoja aplikacja zawsze działała perfekcyjnie.'
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
        <div className="mt-36 w-full justify-center container mx-auto pb-12 flex flex-col lg:flex-row items-center relative overflow-x-hidden">
          <div className="flex flex-col z-30 lg:pt-10 xl:pt-0 items-center justify-center relative px-4 lg:pl-10 lg:pr-0">
            <div className="relative lg:min-h-[280px] xl:min-h-[320px]">
              <h1
                className="text-4xl lg:text-7xl tracking-tighter text-slate-900 leading-[0.9] font-bold text-center"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                <div className="flex items-center justify-center gap-4 min-h-[1.2em]">
                  <span>Tworzymy aplikacje</span>
                </div>
                <span className="block text-slate-900 min-h-[1.2em] text-center">
                  <span className="text-blue-600">webowe</span>, które napędzają Twój biznes
                </span>
              </h1>
            </div>

            <div className="space-y-2 items-center justify-center flex flex-col max-w-lg relative w-full px-4 mt-8">
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed text-center">
                Od koncepcji do wdrożenia - tworzymy nowoczesne aplikacje webowe, które są szybkie, bezpieczne i łatwe w użyciu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/kontakt">
                  <StarGradientButton>
                    Porozmawiajmy o projekcie
                  </StarGradientButton>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Comparison Blocks */}
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
              Nowoczesne rozwiązania, które napędzają Twój biznes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyFeatures.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600/30"
                >
                  {/* Content */}
                  <div className="relative p-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-lg text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative accent line */}
                    <div className="mt-6 h-1 w-16 bg-blue-600 rounded-full group-hover:w-24 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Moduły aplikacji web - Tabs/Accordion */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Moduły aplikacji webowej
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Module List */}
            <div className="space-y-3">
              {modules.map((module, index) => {
                const Icon = iconMap[module.icon] || CheckCircle;
                const isActive = activeModule === index;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveModule(index)}
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
                      <h3 className="text-lg font-bold">{module.title}</h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right - Live Preview/Mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  {(() => {
                    const Icon = iconMap[modules[activeModule]?.icon] || CheckCircle;
                    return (
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    );
                  })()}
                  <h3 className="text-2xl font-bold text-gray-900">
                    {modules[activeModule]?.title}
                  </h3>
                </div>

                {/* Detailed Mockup UI based on active module */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl">
                  {/* Browser-like header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-6 bg-white/5 rounded-lg flex items-center px-3">
                        <div className="w-3 h-3 text-gray-500 mr-2">🔒</div>
                        <div className="h-2 bg-white/10 rounded w-32"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content based on active module */}
                  {(() => {
                    switch(activeModule) {
                      case 0: // Logowanie i bezpieczeństwo
                        return (
                          <div className="space-y-4">
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
                              {/* Social login buttons */}
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all cursor-pointer">
                                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">f</span>
                                  </div>
                                  <div className="h-2 bg-white/30 rounded flex-1"></div>
                                </div>
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all cursor-pointer">
                                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-gray-800 text-xs font-bold">G</span>
                                  </div>
                                  <div className="h-2 bg-white/30 rounded flex-1"></div>
                                </div>
                                {/* 2FA indicator */}
                                <div className="flex items-center justify-center space-x-2 mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                                  <Shield className="w-5 h-5 text-green-400" />
                                  <div className="h-2 bg-green-400/50 rounded w-24"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 1: // Płatności i monetyzacja
                        return (
                          <div className="space-y-4">
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
                              {/* Payment cards */}
                              <div className="space-y-3">
                                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-4 shadow-lg">
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="w-10 h-8 bg-yellow-400/30 rounded"></div>
                                    <Wallet className="w-5 h-5 text-white/70" />
                                  </div>
                                  <div className="space-y-2">
                                    <div className="h-2 bg-white/30 rounded w-3/4"></div>
                                    <div className="h-2 bg-white/20 rounded w-1/2"></div>
                                  </div>
                                </div>
                                {/* Payment buttons */}
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center">
                                    <div className="h-2 bg-blue-400 rounded w-16"></div>
                                  </div>
                                  <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center">
                                    <div className="h-2 bg-cyan-400 rounded w-16"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 2: // Komunikacja i powiadomienia
                        return (
                          <div className="space-y-4">
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
                              {/* Chat messages */}
                              <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                  <div className="w-8 h-8 bg-blue-400 rounded-full flex-shrink-0"></div>
                                  <div className="flex-1">
                                    <div className="bg-white/10 rounded-lg p-3">
                                      <div className="h-2 bg-white/30 rounded w-full mb-1"></div>
                                      <div className="h-2 bg-white/20 rounded w-3/4"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2 flex-row-reverse">
                                  <div className="w-8 h-8 bg-cyan-400 rounded-full flex-shrink-0"></div>
                                  <div className="flex-1">
                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3 ml-auto" style={{ width: '80%' }}>
                                      <div className="h-2 bg-white/40 rounded w-full mb-1"></div>
                                      <div className="h-2 bg-white/30 rounded w-2/3"></div>
                                    </div>
                                  </div>
                                </div>
                                {/* Notification badge */}
                                <div className="flex items-center justify-between bg-red-500/20 rounded-lg p-3 border border-red-500/30">
                                  <MessageCircle className="w-5 h-5 text-red-400" />
                                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 3: // Nawigacja i lokalizacja
                        return (
                          <div className="space-y-4">
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
                              {/* Map mockup */}
                              <div className="relative bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-lg p-4 h-40">
                                <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-4">
                                  {[...Array(12)].map((_, i) => (
                                    <div key={i} className="bg-white/5 rounded"></div>
                                  ))}
                                </div>
                                {/* Location pins */}
                                <div className="absolute top-8 left-8">
                                  <Map className="w-6 h-6 text-red-400 animate-bounce" />
                                </div>
                                <div className="absolute bottom-8 right-8">
                                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                                </div>
                              </div>
                              {/* Language selector */}
                              <div className="flex space-x-2 mt-3">
                                <div className="bg-blue-500 text-white rounded px-3 py-1 text-xs font-bold">PL</div>
                                <div className="bg-white/10 text-white/50 rounded px-3 py-1 text-xs">EN</div>
                                <div className="bg-white/10 text-white/50 rounded px-3 py-1 text-xs">DE</div>
                              </div>
                            </div>
                          </div>
                        );

                      case 4: // Analiza danych
                        return (
                          <div className="space-y-4">
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
                              {/* Chart */}
                              <div className="flex items-end justify-between h-32 mb-4">
                                <div className="flex flex-col items-center space-y-1">
                                  <div className="w-12 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: '60%' }}></div>
                                  <div className="h-1.5 bg-white/20 rounded w-12"></div>
                                </div>
                                <div className="flex flex-col items-center space-y-1">
                                  <div className="w-12 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t" style={{ height: '85%' }}></div>
                                  <div className="h-1.5 bg-white/20 rounded w-12"></div>
                                </div>
                                <div className="flex flex-col items-center space-y-1">
                                  <div className="w-12 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t" style={{ height: '45%' }}></div>
                                  <div className="h-1.5 bg-white/20 rounded w-12"></div>
                                </div>
                                <div className="flex flex-col items-center space-y-1">
                                  <div className="w-12 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: '70%' }}></div>
                                  <div className="h-1.5 bg-white/20 rounded w-12"></div>
                                </div>
                              </div>
                              {/* KPIs */}
                              <div className="grid grid-cols-3 gap-2">
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                  <BarChart className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                                  <div className="h-2 bg-blue-400/50 rounded w-full"></div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                  <Users className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                                  <div className="h-2 bg-cyan-400/50 rounded w-full"></div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                  <Zap className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                                  <div className="h-2 bg-teal-400/50 rounded w-full"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      case 5: // Personalizacja UX
                        return (
                          <div className="space-y-4">
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
                              {/* Theme toggle */}
                              <div className="flex items-center justify-between bg-white/10 rounded-lg p-4 mb-3">
                                <div className="flex items-center space-x-3">
                                  <Palette className="w-5 h-5 text-blue-400" />
                                  <div className="h-2 bg-white/30 rounded w-20"></div>
                                </div>
                                <div className="flex space-x-2">
                                  <div className="w-8 h-8 bg-white rounded-full"></div>
                                  <div className="w-8 h-8 bg-gray-800 rounded-full border-2 border-blue-500"></div>
                                </div>
                              </div>
                              {/* Profile customization */}
                              <div className="bg-white/10 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-3">
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full"></div>
                                  <div className="flex-1 space-y-2">
                                    <div className="h-2 bg-white/30 rounded w-3/4"></div>
                                    <div className="h-2 bg-white/20 rounded w-1/2"></div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                  {[...Array(4)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-white/10 rounded-lg"></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );

                      default:
                        return null;
                    }
                  })()}
                </div>

                {/* Feature list */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <ul className="space-y-3">
                    {modules[activeModule]?.items.map((item, idx) => (
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies - Grid 3 kolumny */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Nasze realizacje
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Zobacz, jak pomogliśmy naszym klientom osiągnąć sukces dzięki nowoczesnym aplikacjom webowym
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => {
              const gradients = [
                'from-blue-600 to-blue-500',
                'from-blue-500 to-blue-400',
                'from-blue-400 to-blue-300'
              ];

              // Różne mocki dla każdego case study
              const renderCaseMockup = () => {
                switch(index) {
                  case 0: // System rezerwacji fitness
                    return (
                      <div className="space-y-3">
                        {/* Calendar grid */}
                        <div className="grid grid-cols-4 gap-1">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-8 rounded ${i === 2 || i === 5 ? 'bg-white/40' : 'bg-white/20'}`}
                            ></div>
                          ))}
                        </div>
                        {/* User icon */}
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                          <div className="flex-1 space-y-1">
                            <div className="h-2 bg-white/30 rounded w-3/4"></div>
                            <div className="h-2 bg-white/20 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    );
                  case 1: // E-commerce
                    return (
                      <div className="space-y-2">
                        {/* Product cards */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white/20 rounded-lg p-2">
                            <div className="w-full h-12 bg-white/30 rounded mb-1"></div>
                            <div className="h-1.5 bg-white/30 rounded w-full"></div>
                          </div>
                          <div className="bg-white/20 rounded-lg p-2">
                            <div className="w-full h-12 bg-white/30 rounded mb-1"></div>
                            <div className="h-1.5 bg-white/30 rounded w-full"></div>
                          </div>
                        </div>
                        {/* Cart */}
                        <div className="flex items-center justify-between bg-white/30 rounded-lg p-2">
                          <Wallet className="w-4 h-4 text-white" />
                          <div className="h-2 bg-white/40 rounded w-16"></div>
                        </div>
                      </div>
                    );
                  case 2: // Dashboard analityczny
                    return (
                      <div className="space-y-2">
                        {/* Charts */}
                        <div className="flex items-end space-x-1 h-16">
                          <div className="w-6 bg-white/30 rounded-t" style={{ height: '40%' }}></div>
                          <div className="w-6 bg-white/40 rounded-t" style={{ height: '70%' }}></div>
                          <div className="w-6 bg-white/30 rounded-t" style={{ height: '50%' }}></div>
                          <div className="w-6 bg-white/40 rounded-t" style={{ height: '90%' }}></div>
                        </div>
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-white/20 rounded p-1.5 text-center">
                            <div className="h-1.5 bg-white/40 rounded w-full"></div>
                          </div>
                          <div className="bg-white/20 rounded p-1.5 text-center">
                            <div className="h-1.5 bg-white/40 rounded w-full"></div>
                          </div>
                          <div className="bg-white/20 rounded p-1.5 text-center">
                            <div className="h-1.5 bg-white/40 rounded w-full"></div>
                          </div>
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              };

              return (
                <div
                  key={index}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-300 overflow-hidden"
                  style={{
                    transform: 'perspective(1000px) rotateY(0deg)',
                    transition: 'transform 0.5s ease'
                  }}
                >
                  {/* Mockup Header */}
                  <div className={`h-56 bg-gradient-to-br ${gradients[index]} p-6 relative overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-lg"></div>
                      <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-lg"></div>
                    </div>

                    {/* Main mockup content */}
                    <div className="relative h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                        </div>
                      </div>

                      {/* Custom mockup per case study */}
                      <div className="flex-1">
                        {renderCaseMockup()}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      {study.title}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                          Cel
                        </h4>
                        <p className="text-slate-700 text-sm">{study.goal}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-2">
                          Rozwiązanie
                        </h4>
                        <p className="text-slate-700 text-sm">{study.solution}</p>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                          Efekt
                        </h4>
                        <p className="text-slate-900 font-semibold text-sm">{study.result}</p>
                      </div>
                    </div>

                    <button className="mt-6 text-blue-600 font-semibold text-sm inline-flex items-center group-hover:translate-x-2 transition-transform">
                      Zobacz pełną realizację
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA końcowe / Kontakt */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Title */}
            <h2
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Gotowy na start?
            </h2>

            {/* Description */}
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Skontaktuj się z nami, aby omówić Twój projekt i dowiedzieć się, jak możemy pomóc w rozwoju Twojego biznesu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/kontakt">
                <StarGradientButton>
                  Porozmawiajmy o projekcie
                </StarGradientButton>
              </Link>
            </div>

            {/* Email */}
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

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
