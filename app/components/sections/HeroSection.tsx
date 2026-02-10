'use client';

import Link from 'next/link';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import DecorativeImage from '@/app/components/DecorativeImage';
import { ArrowRight } from 'lucide-react';
import type { HeroSectionProps } from '@/types/sections';

export default function HeroSection({
  title,
  description,
  image,
  imageAlt,
  badge,
  badgeIcon,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className = '',
}: HeroSectionProps) {
  return (
    <section className={`min-h-screen py-12 flex items-center relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {badge && (
              <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {badgeIcon}
                <span>{badge}</span>
              </div>
            )}

            <h1
              className="text-4xl text-center md:text-left md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              {title}
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              {description}
            </p>

            {(primaryButtonText || secondaryButtonText) && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {primaryButtonText && primaryButtonLink && (
                  <Link href={primaryButtonLink}>
                    <StarGradientButton>
                      <span className="flex items-center gap-2">
                        {primaryButtonText}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </StarGradientButton>
                  </Link>
                )}
                {secondaryButtonText && secondaryButtonLink && (
                  <Link href={secondaryButtonLink} className="text-blue-600 hover:text-blue-700 font-semibold">
                    {secondaryButtonText}
                  </Link>
                )}
              </div>
            )}
          </div>

          {image && (
            <DecorativeImage
              src={image}
              alt={imageAlt || title}
            />
          )}
        </div>
      </div>
    </section>
  );
}
