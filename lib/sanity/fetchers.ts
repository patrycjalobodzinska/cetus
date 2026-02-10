import { client } from '@/sanity/lib/client';
import { QUERIES } from './queries';
import type {
  TechnologiesData,
  IndustriesData,
  OfferStatsData,
  AboutUsData,
  HistoryItem,
  TeamMember,
  FAQ,
  Partner,
  HomepageModule,
  CaseStudy,
  FooterData,
  OfferProject,
} from './types';

export async function fetchTechnologies(): Promise<TechnologiesData | null> {
  try {
    return await client.fetch<TechnologiesData>(QUERIES.technologies);
  } catch (error) {
    console.error('Błąd podczas pobierania technologii:', error);
    return null;
  }
}

export async function fetchIndustries(): Promise<IndustriesData | null> {
  try {
    return await client.fetch<IndustriesData>(QUERIES.industries);
  } catch (error) {
    console.error('Błąd podczas pobierania branż:', error);
    return null;
  }
}

export async function fetchOfferStats(): Promise<OfferStatsData | null> {
  try {
    return await client.fetch<OfferStatsData>(QUERIES.offerStats);
  } catch (error) {
    console.error('Błąd podczas pobierania statystyk oferty:', error);
    return null;
  }
}

export async function fetchAboutUs(locale: string): Promise<AboutUsData | null> {
  try {
    return await client.fetch<AboutUsData>(QUERIES.aboutUs(locale), { locale });
  } catch (error) {
    console.error('Błąd podczas pobierania danych O nas:', error);
    return null;
  }
}

export async function fetchHistory(locale: string): Promise<HistoryItem[]> {
  try {
    return await client.fetch<HistoryItem[]>(QUERIES.history(locale), { locale });
  } catch (error) {
    console.error('Błąd podczas pobierania historii:', error);
    return [];
  }
}

export async function fetchTeam(locale: string): Promise<TeamMember[]> {
  try {
    return await client.fetch<TeamMember[]>(QUERIES.team(locale), { locale });
  } catch (error) {
    console.error('Błąd podczas pobierania zespołu:', error);
    return [];
  }
}

export async function fetchFAQs(locale: string): Promise<FAQ[]> {
  try {
    return await client.fetch<FAQ[]>(QUERIES.faqs(locale), { locale });
  } catch (error) {
    console.error('Błąd podczas pobierania FAQ:', error);
    return [];
  }
}

export async function fetchPartners(locale: string): Promise<Partner[]> {
  try {
    return await client.fetch<Partner[]>(QUERIES.partners(locale), { locale });
  } catch (error) {
    console.error('Błąd podczas pobierania partnerów:', error);
    return [];
  }
}

export async function fetchHomepageModules(locale: string): Promise<HomepageModule[]> {
  try {
    return await client.fetch<HomepageModule[]>(QUERIES.homepageModules(locale), { locale });
  } catch (error) {
    console.error('Błąd podczas pobierania modułów homepage:', error);
    return [];
  }
}

export async function fetchCaseStudies(locale: string): Promise<CaseStudy[]> {
  try {
    return await client.fetch<CaseStudy[]>(QUERIES.caseStudies(locale), { locale });
  } catch (error) {
    console.error('Błąd podczas pobierania case studies:', error);
    return [];
  }
}

export async function fetchCaseStudyBySlug(slug: string, locale: string): Promise<CaseStudy | null> {
  try {
    return await client.fetch<CaseStudy>(QUERIES.caseStudyBySlug(locale), { slug, locale });
  } catch (error) {
    console.error('Błąd podczas pobierania case study:', error);
    return null;
  }
}

export async function fetchCaseStudySlugs(): Promise<Array<{ slug: string }>> {
  try {
    const caseStudies = await client.fetch<Array<{ slug: string }>>(QUERIES.caseStudySlugs);
    return caseStudies.filter((study) => study.slug);
  } catch (error) {
    console.error('Błąd podczas pobierania slugów case studies:', error);
    return [];
  }
}

export async function fetchFooter(locale: string): Promise<FooterData | null> {
  try {
    return await client.fetch<FooterData>(QUERIES.footer(locale), { locale });
  } catch (error) {
    console.error('Błąd podczas pobierania footera:', error);
    return null;
  }
}

export async function fetchFooterOfferProjects(locale: string): Promise<OfferProject[]> {
  try {
    const data = await client.fetch<{ projects?: OfferProject[] }>(
      QUERIES.footerOfferProjects(locale),
      { locale }
    );
    return data?.projects || [];
  } catch (error) {
    console.error('Błąd podczas pobierania projektów z oferty:', error);
    return [];
  }
}
