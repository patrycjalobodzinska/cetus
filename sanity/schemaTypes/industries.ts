import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'industries',
  title: 'Branże',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'localeString',
      description: 'Tytuł sekcji (np. "Branże, w których działamy")',
    }),
    defineField({
      name: 'description',
      title: 'Opis sekcji',
      type: 'localeText',
      description: 'Opis pod tytułem',
    }),
    defineField({
      name: 'items',
      title: 'Branże',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nazwa branży',
              type: 'localeString',
              description: 'Nazwa branży (np. "E-commerce", "Finanse")',
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
              title: 'name.pl',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Tekst przycisku CTA',
      type: 'localeString',
      description: 'Tekst przycisku na dole sekcji',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link przycisku CTA',
      type: 'string',
      description: 'Link przycisku (np. /kontakt)',
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
    },
    prepare({ title }) {
      return {
        title: title || 'Branże',
      }
    },
  },
})

