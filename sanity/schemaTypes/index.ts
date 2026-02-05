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
import localeString from './localeString'
import localeText from './localeText'
import localeStringArray from './localeStringArray'

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
  ],
}
