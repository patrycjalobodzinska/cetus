import { type SchemaTypeDefinition } from 'sanity'
import stats from './stats'
import hero from './hero'
import offer from './offer'
import caseStudy from './caseStudy'
import faq from './faq'
import team from './team'
import aboutUs from './aboutUs'
import footer from './footer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [stats, hero, offer, caseStudy, faq, team, aboutUs, footer],
}
