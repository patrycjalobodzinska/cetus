import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Wpis na blogu (Co u nas)",
  type: "document",
  description: "Wpis bloga (/blog). Trzy najnowsze wpisy pokazują się też na stronie głównej.",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł wpisu",
      type: "localeString",
      description: "Używany do generowania sluga i na liście wpisów.",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: (doc: any) => doc?.title?.pl || doc?.title?.en || "",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Krótki opis (do listingu)",
      type: "localeText",
    }),
    defineField({
      name: "coverImage",
      title: "Zdjęcie okładkowe (lista wpisów)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "localeString",
    }),
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Imię i nazwisko", type: "string" }),
        defineField({ name: "role", title: "Stanowisko", type: "localeString" }),
        defineField({
          name: "avatar",
          title: "Zdjęcie",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tagi",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "sections",
      title: "Sekcje wpisu (slice)",
      description:
        "Dodawaj dowolne sekcje w wybranej kolejności. Możesz wielokrotnie używać tego samego typu.",
      type: "array",
      of: [
        defineArrayMember({ type: "bpHeroSection", title: "Hero - nagłówek" }),
        defineArrayMember({
          type: "bpRichTextSection",
          title: "Tekst sformatowany",
        }),
        defineArrayMember({ type: "bpImageSection", title: "Zdjęcie" }),
        defineArrayMember({ type: "bpQuoteSection", title: "Cytat" }),
        defineArrayMember({ type: "bpGallerySection", title: "Galeria" }),
        defineArrayMember({ type: "bpCodeSection", title: "Blok kodu" }),
        defineArrayMember({ type: "bpVideoSection", title: "Wideo" }),
        defineArrayMember({ type: "bpListSection", title: "Lista" }),
        defineArrayMember({ type: "bpCalloutSection", title: "Callout" }),
        defineArrayMember({ type: "bpCtaSection", title: "CTA" }),
        defineArrayMember({ type: "bpButtonSection", title: "Przycisk z linkiem" }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO - tytuł",
      type: "localeString",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO - opis",
      type: "localeText",
    }),
  ],
  orderings: [
    {
      title: "Najnowsze",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.pl",
      subtitle: "category.pl",
      media: "coverImage",
    },
  },
});
