import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'technologies',
  title: 'Oferta - sekcja Technologie',
  type: 'document',
  description: 'Sekcja "Technologie" na /oferta.',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'localeString',
      description: 'Tytuł sekcji (np. "Nowoczesne narzędzia i frameworki")',
    }),
    defineField({
      name: 'description',
      title: 'Opis sekcji',
      type: 'localeText',
      description: 'Opis pod tytułem',
    }),
    defineField({
      name: 'categories',
      title: 'Kategorie technologii',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Nazwa kategorii',
              type: 'localeString',
              description: 'Nazwa kategorii (np. "Frontend", "Backend")',
            }),
            defineField({
              name: 'items',
              title: 'Lista technologii',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Nazwa',
                      type: 'localeString',
                      description: 'Nazwa technologii (np. React, Next.js)',
                    }),
                    defineField({
                      name: 'logo',
                      title: 'Logo',
                      type: 'image',
                      options: { hotspot: true },
                      description: 'Logo technologii (opcjonalne)',
                    }),
                  ],
                  preview: {
                    select: { title: 'name.pl' },
                    prepare({ title }) {
                      return { title: title || 'Technologia' };
                    },
                  },
                },
              ],
              description: 'Lista technologii z logo',
            }),
            defineField({
              name: 'order',
              title: 'Kolejność',
              type: 'number',
              description: 'Kolejność wyświetlania',
            }),
          ],
          preview: {
            select: {
              title: 'title.pl',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
    },
    prepare({ title }) {
      return {
        title: title || 'Technologie',
      }
    },
  },
})

