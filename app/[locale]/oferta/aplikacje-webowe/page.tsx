'use client';

import HeroSection from './components/HeroSection';
import WhyFeaturesSection from './components/WhyFeaturesSection';
import ModulesSection from './components/ModulesSection';
import WebAppsCTASection from './components/CTASection';

export default function WebAppsPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <WhyFeaturesSection />
      <ModulesSection />
      <WebAppsCTASection />
    </div>
  );
}
