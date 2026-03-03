import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'processSection',
  title: 'Sekcja procesu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'localeText',
    }),
    defineField({
      name: 'steps',
      title: 'Kroki',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'stepLabel',
              title: 'Etykieta kroku (np. Krok 1)',
              type: 'localeString',
            }),
            defineField({
              name: 'question',
              title: 'Pytanie (italic)',
              type: 'localeString',
            }),
            defineField({
              name: 'title',
              title: 'Tytuł kroku',
              type: 'localeString',
            }),
            defineField({
              name: 'description',
              title: 'Opis kroku',
              type: 'localeText',
            }),
          ],
          preview: {
            select: { title: 'title.pl', subtitle: 'stepLabel.pl' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.pl' },
  },
})
