'use client';

import { useTranslations } from 'next-intl';
import CTASection from '@/app/components/CTASection';

export default function WebAppsCTASection() {
  const t = useTranslations('webApps.cta');

  return (
    <CTASection
      title={t('title')}
      description={t('description')}
      buttonText={t('buttonText')}
      buttonLink="/kontakt"
      emailLabel={t('emailLabel')}
      email="kontakt@cetuspro.pl"
      showDivider={false}
    />
  );
}
