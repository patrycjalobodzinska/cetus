import { defineField, defineType } from 'sanity'

/**
 * Sekcja "Dofinansowanie / Fundusze Europejskie" (/dofinansowanie + stopka).
 *
 * Obowiazki informacyjne beneficjenta dla projektu POPW 2014-2020 (Zalacznik
 * nr 8 do umowy o dofinansowanie, rozdz. 4 - strona internetowa):
 *  - znak Funduszy Europejskich z nazwa programu, barwy RP i znak Unii
 *    Europejskiej z nazwa funduszu (pelne zestawienie znakow),
 *  - flaga UE z napisem "Unia Europejska" widoczna w momencie wejscia na
 *    strone, bez przewijania w dol (u nas: znak w naglowku, patrz
 *    app/components/FundingSigns.tsx),
 *  - krotki opis projektu: cele, planowane efekty, wartosc projektu,
 *    wklad Funduszu Europejskiego,
 *  - (zalecane) hasztag #FunduszeUE / #FunduszeEuropejskie.
 *
 * Znaki sa w repo jako oficjalne pliki z pakietu MFiPR (public/fundusze),
 * wiec pole "logoLockup" jest opcjonalne - sluzy tylko do nadpisania ich
 * innym zestawieniem (np. gdy dojdzie projekt z perspektywy 2021-2027).
 *
 * WAZNE: wartosci (tytul projektu, kwoty, nr umowy) musza pochodzic wprost
 * z umowy o dofinansowanie. Nie wolno ich zmyslac.
 */
export default defineType({
  name: 'funding',
  title: 'Dofinansowanie (/dofinansowanie)',
  type: 'document',
  description: 'Strona /dofinansowanie oraz logotyp funduszy w stopce.',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Opublikowane (widoczne na stronie)',
      description:
        'Zaznacz dopiero, gdy uzupelnisz prawdziwe dane z umowy o dofinansowanie oraz wgrasz oficjalne zestawienie znakow. Gdy wylaczone: strona /dofinansowanie pokazuje stan "w przygotowaniu", a pasek w stopce sie nie wyswietla.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'heading',
      title: 'Naglowek strony',
      type: 'localeString',
    }),
    defineField({
      name: 'intro',
      title: 'Wprowadzenie (opcjonalne)',
      type: 'localeText',
    }),
    defineField({
      name: 'logoLockup',
      title: 'Oficjalne zestawienie znakow (obraz)',
      description:
        'Opcjonalne. Serwis ma juz wbudowane oficjalne zestawienie znakow POPW (Fundusze Europejskie Polska Wschodnia + barwy RP + Unia Europejska z EFRR). Wgraj plik tylko wtedy, gdy instytucja przekaze inne zestawienie - wtedy zastapi ono wbudowane. Format poziomy, na bialym tle.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny (alt)',
          type: 'string',
          initialValue:
            'Fundusze Europejskie Polska Wschodnia, Rzeczpospolita Polska, Unia Europejska - Europejski Fundusz Rozwoju Regionalnego',
        }),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Projekty',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'fundingProject',
          fields: [
            defineField({
              name: 'name',
              title: 'Tytul projektu',
              description: 'Dokladnie jak w umowie o dofinansowanie.',
              type: 'localeString',
            }),
            defineField({
              name: 'programName',
              title: 'Nazwa programu / dzialania',
              description:
                'Np. "Fundusze Europejskie dla Nowoczesnej Gospodarki 2021-2027, Dzialanie ..." lub program regionalny.',
              type: 'localeString',
            }),
            defineField({
              name: 'fund',
              title: 'Fundusz',
              description: 'Np. Europejski Fundusz Rozwoju Regionalnego (EFRR).',
              type: 'localeString',
            }),
            defineField({
              name: 'contractNumber',
              title: 'Numer umowy o dofinansowanie (opcjonalnie)',
              type: 'string',
            }),
            defineField({
              name: 'objective',
              title: 'Cel / przedmiot projektu',
              type: 'localeText',
            }),
            defineField({
              name: 'effects',
              title: 'Planowane efekty / rezultaty',
              description:
                'Wymagany element opisu projektu na stronie (rozdz. 4.3 Zalacznika nr 8). Przepisz wprost z umowy o dofinansowanie.',
              type: 'localeText',
            }),
            defineField({
              name: 'projectValue',
              title: 'Wartosc projektu',
              description: 'Kwota z jednostka, np. "1 234 567,89 zl".',
              type: 'string',
            }),
            defineField({
              name: 'euContribution',
              title: 'Wysokosc wkladu Unii Europejskiej',
              description: 'Kwota dofinansowania z UE, np. "987 654,32 zl".',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'name.pl', subtitle: 'euContribution' },
            prepare({ title, subtitle }) {
              return {
                title: title || '(brak tytulu projektu)',
                subtitle: subtitle ? `Wklad UE: ${subtitle}` : 'brak kwoty wkladu UE',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'hashtags',
      title: 'Hasztagi (zalecane)',
      type: 'string',
      initialValue: '#FunduszeUE #FunduszeEuropejskie',
    }),
    defineField({
      name: 'signalUrl',
      title: 'Link do mechanizmu sygnalizacyjnego (opcjonalnie)',
      description:
        'Adres do zglaszania nieprawidlowosci/naduzyc finansowych, jesli wymagany w Twojej umowie.',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Dofinansowanie (Fundusze Europejskie)' }
    },
  },
})
