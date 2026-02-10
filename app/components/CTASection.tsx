'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import type { CTASectionProps } from '@/types/components';

export default function CTASection({
  title,
  description,
  buttonText,
  buttonLink = '/kontakt',
  emailLabel,
  email,
  showDivider = true,
  className = '',
}: CTASectionProps) {
  const locale = useLocale();
  const finalButtonLink = buttonLink.startsWith('/') ? `/${locale}${buttonLink}` : buttonLink;

  return (
    <section className={`md:py-32 py-12 relative overflow-hidden ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {showDivider && (
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>
          )}

          <h2
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {title}
          </h2>

          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={finalButtonLink}>
              <StarGradientButton>
                {buttonText}
              </StarGradientButton>
            </Link>
          </div>

          {emailLabel && email && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-slate-500 text-sm">{emailLabel}</p>
              <a
                href={`mailto:${email}`}
                className="text-lg font-semibold text-blue-600 hover:opacity-70 transition-opacity"
              >
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
