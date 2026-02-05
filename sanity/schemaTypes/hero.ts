import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Sekcja Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pierwsza linia tytułu',
      type: 'localeString',
      description: 'Pierwsza linia tytułu (np. "We create modern")',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Podświetlony fragment tytułu',
      type: 'localeString',
      description: 'Fragment tytułu, który będzie podświetlony (np. "software")',
    }),
    defineField({
      name: 'titleAfterHighlight',
      title: 'Tekst po podświetlonym fragmencie',
      type: 'localeString',
      description: 'Tekst po podświetlonym fragmencie (np. "that helps")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Podtytuł',
      type: 'localeString',
    }),
    defineField({
      name: 'subtitleHighlight',
      title: 'Podświetlony fragment podtytułu',
      type: 'localeString',
      description: 'Fragment podtytułu, który będzie podświetlony',
    }),
    defineField({
      name: 'titleThirdLine',
      title: 'Trzecia linia tytułu',
      type: 'localeString',
      description: 'Trzecia linia tytułu (np. "companies grow")',
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
  ],
  preview: {
    select: {
      title: 'title.pl',
      subtitle: 'subtitle.pl',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Sekcja Hero',
        subtitle: subtitle,
      }
    },
  },
})
