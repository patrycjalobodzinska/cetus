'use client';

import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import DecorativeImage from '@/app/components/DecorativeImage';
import { urlFor } from '@/sanity/lib/image';
import type { AboutUsData } from '@/lib/sanity/types';

interface AboutHeroSectionProps {
  data: AboutUsData | null;
  loading: boolean;
}

export default function AboutHeroSection({ data, loading }: AboutHeroSectionProps) {
  if (loading) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">Ładowanie...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="pt-[var(--page-top-offset)] flex flex-col justify-between min-h-[calc(100vh-90px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:space-y-8 mix-blend-darken space-y-4">
            <h1
              className="heading-1 text-slate-900 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              {data.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {data.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={data.primaryButtonLink || '/kontakt'}>
                <StarGradientButton>
                  <span className="flex items-center gap-2">
                    {data.primaryButtonText || 'Porozmawiajmy o projekcie'}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </StarGradientButton>
              </Link>
            </div>
          </div>

          <DecorativeImage
            src={urlFor(data.image).width(1200).height(800).url()}
            alt={data.title}
            overlay={
              data.statValue
                ? {
                    value: data.statValue,
                    label: data.statLabel,
                    subLabel: data.statSubLabel,
                    icon: <Users className="w-6 h-6 text-white" />,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </section>
  );
}
