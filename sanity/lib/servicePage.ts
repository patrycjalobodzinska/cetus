import { client } from './client'

export type Locale = 'pl' | 'en'

export type LocaleString = { pl?: string; en?: string }
export type LocaleText = { pl?: string; en?: string }
export type LocaleStringArray = { pl?: string[]; en?: string[] }

export type GridSectionItem = {
  _key: string
  title?: LocaleString
  description?: LocaleText
  iconName?: string
}

export type TabsSectionItem = {
  _key: string
  title?: LocaleString
  description?: LocaleText
  applications?: LocaleStringArray
  effect?: LocaleText
  iconName?: string
}

export type StepItem = {
  _key: string
  title?: LocaleString
  description?: LocaleText
}

export type Section =
  | { _key: string; _type: 'gridSection'; sectionKey?: string; title?: LocaleString; description?: LocaleText; items?: GridSectionItem[] }
  | { _key: string; _type: 'tabsSection'; sectionKey?: string; title?: LocaleString; description?: LocaleText; items?: TabsSectionItem[] }
  | { _key: string; _type: 'stepsSection'; sectionKey?: string; title?: LocaleString; description?: LocaleText; steps?: StepItem[] }
  | { _key: string; _type: 'checklistSection'; sectionKey?: string; title?: LocaleString; description?: LocaleText; items?: LocaleStringArray }
  | { _key: string; _type: 'caseStudyBlock'; sectionKey?: string; title?: LocaleString; clientName?: LocaleString; goal?: LocaleText; solution?: LocaleText; results?: LocaleStringArray }
  | { _key: string; _type: 'ctaBlock'; sectionKey?: string; title?: LocaleString; description?: LocaleText; buttonText?: LocaleString; buttonLink?: string; email?: string }

export type ServicePageData = {
  _id: string
  slug: { current: string }
  title?: LocaleString
  heroTitle?: LocaleString
  heroDescription?: LocaleText
  heroButtonText?: LocaleString
  heroButtonLink?: string
  sections?: Section[]
}

export async function fetchServicePage(slug: string): Promise<ServicePageData | null> {
  const data = await client.fetch<ServicePageData>(
    `*[_type == "servicePage" && slug.current == $slug][0]`,
    { slug },
  )
  return data || null
}

export function L(value: LocaleString | LocaleText | undefined, locale: Locale): string {
  if (!value) return ''
  return value[locale] || value.pl || value.en || ''
}

export function LA(value: LocaleStringArray | undefined, locale: Locale): string[] {
  if (!value) return []
  return value[locale] || value.pl || value.en || []
}
