import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Realizacja (case study)",
  type: "document",
  description: "Realizacja pokazywana w sekcji Realizacje na stronie głównej i na /case-studies. Zaznacz \"featured\", żeby trafiła na pierwsze miejsce.",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł projektu",
      type: "localeString",
      description: "Używany do generowania sluga i na karcie listingu.",
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
      name: "image",
      title: "Miniatura (karta listingu)",
      type: "image",
      description:
        "Zdjęcie wyświetlane na liście case studies. Nie pojawia się na stronie projektu.",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Kategoria (karta listingu)",
      type: "localeString",
      description: 'Np. „Marketplace e-commerce"',
    }),
    defineField({
      name: "description",
      title: "Opis (karta listingu)",
      type: "localeText",
    }),
    defineField({
      name: "featured",
      title: "Główna realizacja (duży kafel)",
      type: "boolean",
      description:
        "Zaznacz jedną realizację - trafi na duży kafel otwierający sekcję Realizacje na stronie głównej. Jeśli zaznaczysz kilka, wybrana zostanie najnowsza.",
      initialValue: false,
    }),
    defineField({
      name: "solution",
      title: "Efekt (karta listingu)",
      type: "localeText",
      description: 'Krótkie podsumowanie rezultatu - pokazywane po nagłówku „Efekt”.',
    }),
    defineField({
      name: "sections",
      title: "Sekcje strony",
      type: "array",
      of: [
        defineArrayMember({ type: "csHeroSection", title: "Hero - nagłówek projektu" }),
        defineArrayMember({ type: "csFeaturesSection", title: "Realizacja - ekrany + karty" }),
        defineArrayMember({ type: "csMetricsSection", title: "Metryki" }),
        defineArrayMember({ type: "csAboutSection", title: "O projekcie" }),
        defineArrayMember({ type: "csOutcomeSection", title: "Wyzwanie / Rozwiązanie / Efekt" }),
        defineArrayMember({ type: "csScopeSection", title: "Zakres" }),
        defineArrayMember({ type: "csGallerySection", title: "Galeria - zobacz efekt" }),
        defineArrayMember({ type: "csTechSection", title: "Technologie" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.pl",
      category: "category.pl",
      featured: "featured",
      media: "image",
    },
    prepare({ title, category, featured, media }: any) {
      return {
        title,
        subtitle: featured ? "★ Główna realizacja" : category,
        media,
      };
    },
  },
});
