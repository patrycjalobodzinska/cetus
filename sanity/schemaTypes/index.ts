import { type SchemaTypeDefinition } from 'sanity'
import stats from './stats'
import hero from './hero'
import offer from './offer'
import caseStudy from './caseStudy'
import faq from './faq'
import team from './team'
import aboutUs from './aboutUs'
import footer from './footer'
import history from './history'
import technologies from './technologies'
import industries from './industries'
import offerStats from './offerStats'
import partner from './partner'
import homepageModules from './homepageModules'
import whatsNew from './whatsNew'
import localeString from './localeString'
import localeText from './localeText'
import localeStringArray from './localeStringArray'
import processSection from './processSection'
import servicePage from './servicePage'
import rollUpPage from './rollUpPage'
import {
  csHeroSection,
  csStatsSection,
  csChallengeSection,
  csModulesSection,
  csResultsSection,
  csTechnologiesSection,
  csQuoteSection,
  csScopeSection,
  csCtaSection,
} from './caseStudySections'
import blogPost from './blogPost'
import {
  bpHeroSection,
  bpRichTextSection,
  bpImageSection,
  bpQuoteSection,
  bpGallerySection,
  bpCodeSection,
  bpVideoSection,
  bpListSection,
  bpCalloutSection,
  bpCtaSection,
} from './blogPostSections'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    localeStringArray,
    stats,
    hero,
    offer,
    caseStudy,
    faq,
    team,
    aboutUs,
    footer,
    history,
    technologies,
    industries,
    offerStats,
    partner,
    homepageModules,
    whatsNew,
    processSection,
    servicePage,
    rollUpPage,
    csHeroSection,
    csStatsSection,
    csChallengeSection,
    csModulesSection,
    csResultsSection,
    csTechnologiesSection,
    csQuoteSection,
    csScopeSection,
    csCtaSection,
    blogPost,
    bpHeroSection,
    bpRichTextSection,
    bpImageSection,
    bpQuoteSection,
    bpGallerySection,
    bpCodeSection,
    bpVideoSection,
    bpListSection,
    bpCalloutSection,
    bpCtaSection,
  ],
}
