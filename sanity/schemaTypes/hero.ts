import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Sekcja Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pierwsza linia tytułu',
      type: 'string',
      description: 'Pierwsza linia tytułu (np. "We create modern")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Podświetlony fragment tytułu',
      type: 'string',
      description: 'Fragment tytułu, który będzie podświetlony (np. "software")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAfterHighlight',
      title: 'Tekst po podświetlonym fragmencie',
      type: 'string',
      description: 'Tekst po podświetlonym fragmencie (np. "that helps")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Podtytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitleHighlight',
      title: 'Podświetlony fragment podtytułu',
      type: 'string',
      description: 'Fragment podtytułu, który będzie podświetlony',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleThirdLine',
      title: 'Trzecia linia tytułu',
      type: 'string',
      description: 'Trzecia linia tytułu (np. "companies grow")',
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
      default: 'Explore',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Sekcja Hero',
        subtitle: subtitle,
      }
    },
  },
})
