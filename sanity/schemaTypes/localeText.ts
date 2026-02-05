import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'localeText',
  title: 'Opis (PL/EN)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'pl',
      title: 'Polski',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'pl', subtitle: 'en' },
    prepare({ title, subtitle }) {
      return {
        title: title ? String(title).slice(0, 60) : '',
        subtitle: subtitle ? String(subtitle).slice(0, 60) : '',
      }
    },
  },
})
