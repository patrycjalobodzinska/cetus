import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageModule',
  title: 'Moduł Strony Głównej',
  type: 'document',
  fields: [
    defineField({
      name: 'moduleNumber',
      title: 'Numer modułu',
      type: 'string',
      description: 'Numer modułu (np. "Module 01", "Module 03")',
    }),
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'localeString',
      description: 'Tytuł modułu (np. "Dlaczego klienci nam ufają?")',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'localeText',
      description: 'Opis modułu',
    }),
    defineField({
      name: 'image',
      title: 'Obraz',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Obraz modułu',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Link do strony (np. "/case-studies", "/o-nas") - wpisany ręcznie',
    }),
    defineField({
      name: 'linkText',
      title: 'Tekst linku',
      type: 'localeString',
      description: 'Tekst przycisku/linku (np. "CASE STUDIES", "ZESPÓŁ")',
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
      title: 'title.pl',
      moduleNumber: 'moduleNumber',
      media: 'image',
    },
    prepare({ title, moduleNumber, media }) {
      return {
        title: moduleNumber ? `${moduleNumber} - ${title || 'Brak tytułu'}` : title || 'Brak tytułu',
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

