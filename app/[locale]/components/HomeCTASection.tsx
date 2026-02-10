'use client';

import { useTranslations } from 'next-intl';
import CTASection from '@/app/components/CTASection';

export default function HomeCTASection() {
  const t = useTranslations('common');

  return (
    <CTASection
      title={t('getStarted')}
      description={t('contactUs')}
      buttonText={t('letsTalk')}
      buttonLink="/kontakt"
    />
  );
}
