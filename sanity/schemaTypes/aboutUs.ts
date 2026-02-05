import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutUs',
  title: 'Sekcja O nas',
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
      name: 'primaryButtonText',
      title: 'Tekst głównego przycisku',
      type: 'localeString',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Link głównego przycisku',
      type: 'string',
      initialValue: '/kontakt',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Tekst drugiego przycisku',
      type: 'localeString',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Link drugiego przycisku',
      type: 'string',
      initialValue: '/oferta',
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'statValue',
      title: 'Wartość statystyki',
      type: 'string',
      description: 'Wartość wyświetlana w overlay (np. "30+")',
      initialValue: '30+',
    }),
    defineField({
      name: 'statLabel',
      title: 'Etykieta statystyki',
      type: 'localeString',
      description: 'Etykieta wyświetlana w overlay (np. "Ekspertów")',
    }),
    defineField({
      name: 'statSubLabel',
      title: 'Podtytuł statystyki',
      type: 'localeString',
      description: 'Podtytuł wyświetlany w overlay (np. "W zespole")',
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      subtitle: 'description.pl',
      media: 'image',
    },
  },
})
