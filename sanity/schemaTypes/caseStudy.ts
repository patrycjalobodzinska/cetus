import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł projektu',
      type: 'localeString',
      description: 'Używany do generowania sluga i na karcie listingu.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: (doc: any) => doc?.title?.pl || doc?.title?.en || '',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Miniatura (karta listingu)',
      type: 'image',
      description: 'Zdjęcie wyświetlane na liście case studies. Nie pojawia się na stronie projektu.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sections',
      title: 'Sekcje strony',
      type: 'array',
      of: [
        defineArrayMember({ type: 'csHeroSection', title: 'Hero — nagłówek projektu' }),
        defineArrayMember({ type: 'csStatsSection', title: 'Statystyki' }),
        defineArrayMember({ type: 'csChallengeSection', title: 'Wyzwanie' }),
        defineArrayMember({ type: 'csScopeSection', title: 'Zakres projektu' }),
        defineArrayMember({ type: 'csModulesSection', title: 'Moduły systemu' }),
        defineArrayMember({ type: 'csResultsSection', title: 'Rezultaty' }),
        defineArrayMember({ type: 'csTechnologiesSection', title: 'Technologie' }),
        defineArrayMember({ type: 'csQuoteSection', title: 'Cytat' }),
        defineArrayMember({ type: 'csCtaSection', title: 'CTA' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      media: 'image',
    },
  },
})
