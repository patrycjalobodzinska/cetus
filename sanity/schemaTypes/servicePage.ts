import { defineField, defineType, defineArrayMember } from 'sanity'

const gridSection = defineArrayMember({
  type: 'object',
  name: 'gridSection',
  title: 'Sekcja: siatka kart',
  fields: [
    defineField({ name: 'sectionKey', title: 'Klucz sekcji', type: 'string', description: 'np. "benefits", "whyFeatures"' }),
    defineField({ name: 'title', type: 'localeString' }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'localeString' }),
            defineField({ name: 'description', type: 'localeText' }),
            defineField({ name: 'iconName', type: 'string' }),
          ],
          preview: { select: { title: 'title.pl' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.pl', subtitle: 'sectionKey' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Siatka kart', subtitle }),
  },
})

const tabsSection = defineArrayMember({
  type: 'object',
  name: 'tabsSection',
  title: 'Sekcja: taby / usługi z listą',
  fields: [
    defineField({ name: 'sectionKey', type: 'string' }),
    defineField({ name: 'title', type: 'localeString' }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'localeString' }),
            defineField({ name: 'description', type: 'localeText' }),
            defineField({ name: 'applications', type: 'localeStringArray' }),
            defineField({ name: 'effect', type: 'localeText' }),
            defineField({ name: 'iconName', type: 'string' }),
          ],
          preview: { select: { title: 'title.pl' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.pl', subtitle: 'sectionKey' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Sekcja tabów', subtitle }),
  },
})

const stepsSection = defineArrayMember({
  type: 'object',
  name: 'stepsSection',
  title: 'Sekcja: kroki / proces',
  fields: [
    defineField({ name: 'sectionKey', type: 'string' }),
    defineField({ name: 'title', type: 'localeString' }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({
      name: 'steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'localeString' }),
            defineField({ name: 'description', type: 'localeText' }),
          ],
          preview: { select: { title: 'title.pl' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.pl', subtitle: 'sectionKey' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Kroki', subtitle }),
  },
})

const checklistSection = defineArrayMember({
  type: 'object',
  name: 'checklistSection',
  title: 'Sekcja: lista punktów',
  fields: [
    defineField({ name: 'sectionKey', type: 'string' }),
    defineField({ name: 'title', type: 'localeString' }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({ name: 'items', type: 'localeStringArray' }),
  ],
  preview: {
    select: { title: 'title.pl', subtitle: 'sectionKey' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Lista', subtitle }),
  },
})

const caseStudySection = defineArrayMember({
  type: 'object',
  name: 'caseStudyBlock',
  title: 'Sekcja: case study',
  fields: [
    defineField({ name: 'sectionKey', type: 'string' }),
    defineField({ name: 'title', type: 'localeString' }),
    defineField({ name: 'clientName', type: 'localeString' }),
    defineField({ name: 'goal', type: 'localeText' }),
    defineField({ name: 'solution', type: 'localeText' }),
    defineField({ name: 'results', type: 'localeStringArray' }),
  ],
  preview: {
    select: { title: 'title.pl', subtitle: 'sectionKey' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Case study', subtitle }),
  },
})

const ctaBlock = defineArrayMember({
  type: 'object',
  name: 'ctaBlock',
  title: 'Sekcja: CTA',
  fields: [
    defineField({ name: 'sectionKey', type: 'string' }),
    defineField({ name: 'title', type: 'localeString' }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({ name: 'buttonText', type: 'localeString' }),
    defineField({ name: 'buttonLink', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
  ],
  preview: {
    select: { title: 'title.pl', subtitle: 'sectionKey' },
    prepare: ({ title, subtitle }) => ({ title: title || 'CTA', subtitle }),
  },
})

export default defineType({
  name: 'servicePage',
  title: 'Strona usługi (/oferta/...)',
  type: 'document',
  description: 'Pojedyncza strona usługi pod /oferta/<slug>.',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (identyfikator URL)',
      type: 'slug',
      options: { source: 'title.pl' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Tytuł strony', type: 'localeString' }),
    defineField({ name: 'heroTitle', title: 'Hero: tytuł', type: 'localeString' }),
    defineField({ name: 'heroDescription', title: 'Hero: opis', type: 'localeText' }),
    defineField({ name: 'heroButtonText', title: 'Hero: tekst przycisku', type: 'localeString' }),
    defineField({ name: 'heroButtonLink', title: 'Hero: link przycisku', type: 'string' }),
    defineField({
      name: 'sections',
      title: 'Sekcje',
      type: 'array',
      of: [gridSection, tabsSection, stepsSection, checklistSection, caseStudySection, ctaBlock],
    }),
  ],
  preview: {
    select: { title: 'title.pl', subtitle: 'slug.current' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Strona usługi', subtitle }),
  },
})
