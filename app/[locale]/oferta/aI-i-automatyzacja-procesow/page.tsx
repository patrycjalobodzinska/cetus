'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Bot, Workflow, BrainCircuit, Eye, MessageSquare, Target, Zap, Shield, TrendingUp, Gauge, RefreshCw, BarChart, Lightbulb, Cpu, Network, Database, Clock } from 'lucide-react';
import { useState } from 'react';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import DecorativeImage from '@/app/components/DecorativeImage';
import PolygonAccordion from '@/app/components/PolygonAccordion';
import CTASection from '@/app/components/CTASection';
import { useTranslations, useLocale } from 'next-intl';

export default function AIAutomationPage() {
  const t = useTranslations('aiAutomation');
  const locale = useLocale();
  const [activeModule, setActiveModule] = useState(0);

  const benefits = t.raw('benefits.items') as Array<{ title: string; description: string }>;
  const services = t.raw('services.items') as Array<{ title: string; description: string; applications: string[]; effect: string }>;
  const process = t.raw('process.steps') as Array<{ title: string; description: string }>;
  const caseStudyEffects = t.raw('caseStudy.effects.items') as string[];

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
                <span>{t('hero.badge')}</span>
              </div>

              <h1
                className="text-4xl text-center md:text-left md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                {t('hero.title')}
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={`/${locale}/kontakt`}>
                  <StarGradientButton>
                    {t('hero.buttonText')}
                  </StarGradientButton>
                </Link>

                <Link
                  href={`/${locale}/case-studies`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 border-2 border-gray-200 rounded-2xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  {t('hero.caseStudiesButton')}
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
                        <span className="text-xs text-gray-400 font-mono">{t('hero.aiSystemLabel')}</span>
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
              {t('benefits.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('benefits.subtitle')}
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
              {t('services.title')}
            </h2>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12">
            {/* Left - Service List */}
            <div className="space-y-3">
              {services.map((service, index) => {
                const Icon = serviceIcons[index];
                const isActive = activeModule === index;

                return (
                  <PolygonAccordion
                    key={index}
                    title={service.title}
                    isOpen={false}
                    onToggle={() => setActiveModule(index)}
                    variant="button"
                    icon={<Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-600'}`} />}
                    isActive={isActive}
                  >
                    {null}
                  </PolygonAccordion>
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
                    {t('services.applicationsLabel')}
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
                    {t('services.effectLabel')} {services[activeModule]?.effect}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile - Title and Indicators Only */}
          <div className="lg:hidden">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {services[activeModule]?.title}
              </h3>
              <div className="flex items-center justify-center gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveModule(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeModule === index
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Przejdź do usługi ${index + 1}`}
                  />
                ))}
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
              {t('caseStudy.title')}
            </h2>
          </div>

          <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  {t('caseStudy.goal.label')}
                </h3>
                <p className="text-blue-100">{t('caseStudy.goal.text')}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2" />
                  {t('caseStudy.solution.label')}
                </h3>
                <p className="text-blue-100">{t('caseStudy.solution.text')}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                {t('caseStudy.effects.label')}
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
                {t('caseStudy.result')}
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
              {t('process.title')}
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
              <span className="text-slate-900 font-semibold">{t('process.compliance')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        buttonText={t('cta.buttonText')}
        buttonLink="/kontakt"
        emailLabel={t('cta.emailLabel')}
        email={t('cta.email')}
      />
    </div>
  );
}
