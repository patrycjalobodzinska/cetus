import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner Strategiczny',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa',
      type: 'localeString',
      description: 'Nazwa partnera',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Logo partnera',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'localeText',
      description: 'Krótki opis partnera (opcjonalne)',
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
      description: 'Opcjonalne powiązanie z case study - jeśli wybrane, kafelek będzie linkiem do tego case study',
    }),
    defineField({
      name: 'order',
      title: 'Kolejność',
      type: 'number',
      description: 'Kolejność wyświetlania (mniejsza liczba = wyżej)',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      name: 'name.pl',
      media: 'logo',
    },
    prepare({ name, media }) {
      return {
        title: name || 'Brak nazwy',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Kolejność',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
