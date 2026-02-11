import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import type { LocaleString } from './common';

export interface HeroSectionProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
  badgeIcon?: ReactNode;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

export interface TechnologiesSectionProps {
  data: {
    title?: LocaleString;
    description?: LocaleString;
    categories?: Array<{
      title?: LocaleString;
      items?: LocaleString;
      order?: number;
    }>;
  } | null;
}

export interface IndustriesSectionProps {
  data: {
    title?: LocaleString;
    description?: LocaleString;
    items?: Array<{
      name?: LocaleString;
      order?: number;
    }>;
    buttonText?: LocaleString;
    buttonLink?: string;
  } | null;
}

export interface OfferStatsSectionProps {
  data: {
    title?: LocaleString;
    description?: LocaleString;
    stats?: Array<{
      value: string;
      label?: LocaleString;
      icon?: string;
      order?: number;
    }>;
  } | null;
}

export interface ProjectsGridSectionProps {
  projects: Array<{
    title: string;
    description: string;
    slug: string;
    image?: string;
  }>;
}

export interface AboutHeroSectionProps {
  data: {
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    image: any;
    statValue: string;
    statLabel: string;
    statSubLabel: string;
  } | null;
  loading: boolean;
}

export interface HistoryTimelineSectionProps {
  items: Array<{
    _id: string;
    year: string;
    title: string;
    description: string;
    image: any;
    order?: number;
  }>;
  loading: boolean;
}

export interface TeamSectionProps {
  members: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    position: string;
    image: any;
    order?: number;
  }>;
  loading: boolean;
}

export interface FeaturesSectionProps {
  title: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  icons?: LucideIcon[];
  className?: string;
}

export interface BenefitsSectionProps {
  title: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  icons?: LucideIcon[];
  className?: string;
}

export interface ServicesSectionProps {
  title: string;
  services: Array<{
    title: string;
    description: string;
    applications?: string[];
    effect?: string;
  }>;
  icons?: LucideIcon[];
  className?: string;
}

export interface HowWeHelpSectionProps {
  title: string;
  services: Array<{
    title: string;
    description: string;
  }>;
  icons?: LucideIcon[];
  className?: string;
}

