import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutUs',
  title: 'Sekcja O nas',
  type: 'document',
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
      name: 'primaryButtonText',
      title: 'Tekst głównego przycisku',
      type: 'string',
      default: 'Porozmawiajmy o projekcie',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Link głównego przycisku',
      type: 'string',
      default: '/kontakt',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Tekst drugiego przycisku',
      type: 'string',
      default: 'Zobacz nasze usługi',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Link drugiego przycisku',
      type: 'string',
      default: '/oferta',
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statValue',
      title: 'Wartość statystyki',
      type: 'string',
      description: 'Wartość wyświetlana w overlay (np. "30+")',
      default: '30+',
    }),
    defineField({
      name: 'statLabel',
      title: 'Etykieta statystyki',
      type: 'string',
      description: 'Etykieta wyświetlana w overlay (np. "Ekspertów")',
      default: 'Ekspertów',
    }),
    defineField({
      name: 'statSubLabel',
      title: 'Podtytuł statystyki',
      type: 'string',
      description: 'Podtytuł wyświetlany w overlay (np. "W zespole")',
      default: 'W zespole',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})
