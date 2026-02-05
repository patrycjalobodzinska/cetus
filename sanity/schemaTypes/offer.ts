import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'offer',
  title: 'Oferta',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'localeString',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Podświetlony fragment tytułu',
      type: 'localeString',
      description: 'Fragment tytułu, który będzie podświetlony (np. "Ecosystem")',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'localeText',
    }),
    defineField({
      name: 'buttonText',
      title: 'Tekst przycisku',
      type: 'localeString',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link przycisku',
      type: 'string',
      description: 'Link do strony (np. /oferta lub pełny URL)',
    }),
    defineField({
      name: 'projects',
      title: 'Projekty/Oferty',
      type: 'array',
      of: [
        {
          type: 'object',
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
              name: 'image',
              title: 'Obraz',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'order',
              title: 'Kolejność',
              type: 'number',
              description: 'Kolejność wyświetlania',
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              description: 'Unikalny identyfikator URL (np. strategy-discovery)',
              options: {
                source: (doc: any) => doc?.title?.pl || doc?.title?.en || '',
                maxLength: 96,
                slugify: (input: string) => input
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w\-]+/g, '')
                  .replace(/\-\-+/g, '-')
                  .replace(/^-+/, '')
                  .replace(/-+$/, '')
                  .slice(0, 96),
              },
            }),
            defineField({
              name: 'link',
              title: 'Link do podstrony',
              type: 'string',
              description: 'Link do podstrony projektu (opcjonalne, jeśli nie podano, użyty zostanie slug)',
            }),
          ],
          preview: {
            select: {
              title: 'title.pl',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      subtitle: 'titleHighlight.pl',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Oferta',
        subtitle: subtitle,
      }
    },
  },
})
