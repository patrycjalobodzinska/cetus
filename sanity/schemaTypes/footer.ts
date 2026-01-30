import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'contactTitle',
      title: 'Tytuł sekcji Kontakt',
      type: 'string',
      initialValue: 'Kontakt',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Opis sekcji Kontakt',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'string',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Tekst głównego przycisku',
      type: 'string',
      initialValue: 'Napisz do nas',
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
      type: 'string',
      initialValue: 'Umów konsultację',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Link drugiego przycisku',
      type: 'string',
      initialValue: '/kontakt',
    }),
    defineField({
      name: 'companyLinks',
      title: 'Linki w sekcji Firma',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Tekst linku',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'documentLinks',
      title: 'Linki w sekcji Dokumenty',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Tekst linku',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platforma',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Dribbble', value: 'dribbble' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Tekst copyright',
      type: 'string',
      initialValue: '© 2025 CetusPro. Wszelkie prawa zastrzeżone.',
    }),
  ],
  preview: {
    select: {
      title: 'contactTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Footer',
      }
    },
  },
})
