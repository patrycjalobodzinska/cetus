import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'offer',
  title: 'Oferta',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Podświetlony fragment tytułu',
      type: 'string',
      description: 'Fragment tytułu, który będzie podświetlony (np. "Ecosystem")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Tekst przycisku',
      type: 'string',
      default: 'Get Started',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link przycisku',
      type: 'string',
      description: 'Link do strony (np. /oferta lub pełny URL)',
      validation: (Rule) => Rule.required(),
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
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Opis',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Obraz',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Kolejność',
              type: 'number',
              description: 'Kolejność wyświetlania',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              description: 'Unikalny identyfikator URL (np. strategy-discovery)',
              options: {
                source: 'title',
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
              validation: (Rule) => Rule.required(),
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
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'titleHighlight',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Oferta',
        subtitle: subtitle,
      }
    },
  },
})
