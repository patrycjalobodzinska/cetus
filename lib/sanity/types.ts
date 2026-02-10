export interface TechnologyCategory {
  title: { pl?: string; en?: string };
  items: { pl?: string[]; en?: string[] };
  order?: number;
}

export interface TechnologiesData {
  title: { pl?: string; en?: string };
  description: { pl?: string; en?: string };
  categories?: TechnologyCategory[];
}

export interface Industry {
  name: { pl?: string; en?: string };
  order?: number;
}

export interface IndustriesData {
  title: { pl?: string; en?: string };
  description: { pl?: string; en?: string };
  items?: Industry[];
  buttonText?: { pl?: string; en?: string };
  buttonLink?: string;
}

export interface Stat {
  value: string;
  label: { pl?: string; en?: string };
  icon?: string;
  order?: number;
}

export interface OfferStatsData {
  title: { pl?: string; en?: string };
  description: { pl?: string; en?: string };
  stats?: Stat[];
}

export interface AboutUsData {
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
}

export interface HistoryItem {
  _id: string;
  year: string;
  title: string;
  description: string;
  image: any;
  order?: number;
}

export interface TeamMember {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  image: any;
  order?: number;
}

export interface FAQ {
  _id: string;
  title?: string;
  description?: string;
  order?: number;
}

export interface Partner {
  _id: string;
  name?: string;
  logo?: any;
  description?: string;
  caseStudySlug?: string;
}

export interface HomepageModule {
  _id: string;
  moduleNumber?: string;
  title?: string;
  description?: string;
  image?: any;
  link?: string;
  linkText?: string;
}

export interface CaseStudy {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  category?: string;
  description?: string;
  solution?: string;
  results?: string;
  image?: any;
  technologies?: string[];
}

export interface FooterData {
  contactTitle?: string;
  contactDescription?: string;
  phone?: string;
  email?: string;
  address?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  companyLinks?: Array<{ text: string; url: string }>;
  documentLinks?: Array<{ text: string; url: string }>;
  socialMedia?: Array<{ platform: string; url: string }>;
  copyright?: string;
}

export interface OfferProject {
  _id: string;
  title: string;
  slug: string;
  order?: number;
}
