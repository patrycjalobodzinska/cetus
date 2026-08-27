import type { ComponentType } from 'react'
import type { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import {
  ArchiveIcon,
  BlockContentIcon,
  BookIcon,
  CaseIcon,
  CogIcon,
  DocumentsIcon,
  DocumentTextIcon,
  EarthAmericasIcon,
  HeartIcon,
  HomeIcon,
  ImagesIcon,
  HelpCircleIcon,
  MenuIcon,
  PlayIcon,
  RocketIcon,
  StarIcon,
  ThListIcon,
  UsersIcon,
} from '@sanity/icons'
import { apiVersion } from './env'

/**
 * Struktura lewego menu w Studio.
 *
 * Zasada: układ menu odwzorowuje serwis, a nie listę schematów - najpierw
 * strona główna (sekcja po sekcji, w kolejności jak na stronie), potem
 * podstrony, potem treści zbiorcze (blog, realizacje) i ustawienia globalne.
 */

/**
 * Dokument występujący w jednym egzemplarzu (np. Footer) otwieramy od razu
 * w edytorze, z pominięciem listy z jednym elementem.
 *
 * Id istniejącego dokumentu odczytujemy z datasetu, bo dokumenty powstały
 * z losowymi id - wymuszenie `documentId === typ` tworzyłoby drugi, pusty wpis.
 */
const singleton = (
  S: StructureBuilder,
  context: StructureResolverContext,
  type: string,
  title: string,
  icon?: ComponentType,
) =>
  S.listItem()
    .id(`singleton-${type}`)
    .title(title)
    .icon(icon)
    .child(async () => {
      const client = context.getClient({ apiVersion })
      const existingId = await client.fetch<string | null>(
        `*[_type == $type] | order(_updatedAt desc)[0]._id`,
        { type },
      )
      const documentId = (existingId ?? type).replace(/^drafts\./, '')

      return S.document().schemaType(type).documentId(documentId).title(title)
    })

/**
 * Lista dokumentów danego typu. `orderBy` ustawia domyślne sortowanie listy,
 * żeby kolejność w Studio odpowiadała kolejności na stronie (pole "Kolejność"),
 * zamiast domyślnej daty utworzenia.
 */
const list = (
  S: StructureBuilder,
  type: string,
  title: string,
  icon?: ComponentType,
  orderBy?: { field: string; direction: 'asc' | 'desc' }[],
) => {
  const item = S.documentTypeListItem(type).title(title).icon(icon)
  if (!orderBy) return item

  return item.child(
    S.documentTypeList(type).title(title).defaultOrdering(orderBy),
  )
}

const BY_ORDER = [{ field: 'order', direction: 'asc' as const }]

export const structure = (S: StructureBuilder, context: StructureResolverContext) =>
  S.list()
    .title('CetusPro')
    .items([
      S.divider().title('Strona główna'),

      S.listItem()
        .id('home')
        .title('Strona główna')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Strona główna')
            .items([
              singleton(S, context, 'processSection', 'Proces', ThListIcon),
              singleton(S, context, 'whatsNew', 'Rolki z Facebooka', PlayIcon),
              list(S, 'homepageModule', 'Kafle pod Realizacjami', BlockContentIcon, BY_ORDER),
              list(S, 'partner', 'Zaufali nam - logotypy', UsersIcon, BY_ORDER),
              list(S, 'sponsor', 'Sponsoring', HeartIcon, BY_ORDER),
              list(S, 'faq', 'FAQ (wspólne dla strony głównej i /kontakt)', HelpCircleIcon, BY_ORDER),
            ]),
        ),

      S.divider().title('Podstrony'),

      S.listItem()
        .id('page-about')
        .title('O nas')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('O nas')
            .items([
              singleton(S, context, 'aboutUs', 'Sekcja "O nas"', DocumentTextIcon),
              list(S, 'history', 'Historia firmy', BookIcon, BY_ORDER),
              list(S, 'team', 'Zespół', UsersIcon, BY_ORDER),
            ]),
        ),

      S.listItem()
        .id('page-offer')
        .title('Oferta')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Oferta')
            .items([
              list(S, 'servicePage', 'Strony usług (/oferta/...)', DocumentsIcon),
              singleton(S, context, 'offerStats', 'Statystyki oferty', ThListIcon),
              singleton(S, context, 'industries', 'Branże', EarthAmericasIcon),
              singleton(S, context, 'technologies', 'Technologie', CogIcon),
            ]),
        ),

      singleton(S, context, 'rollUpPage', 'Roll-up (/roll-up)', RocketIcon),
      singleton(S, context, 'funding', 'Dofinansowanie (/dofinansowanie)', StarIcon),

      S.divider().title('Treści'),

      list(S, 'blogPost', 'Blog - wpisy (3 najnowsze też na stronie głównej)', DocumentTextIcon, [
        { field: 'publishedAt', direction: 'desc' },
      ]),
      list(S, 'caseStudy', 'Realizacje (strona główna i /case-studies)', ImagesIcon, [
        { field: 'featured', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ]),

      S.divider().title('Ustawienia globalne'),

      singleton(S, context, 'footer', 'Stopka', MenuIcon),
      singleton(S, context, 'offer', 'Lista usług w stopce', ThListIcon),

      S.divider().title('Archiwum'),

      S.listItem()
        .id('archive')
        .title('Nieużywane na stronie')
        .icon(ArchiveIcon)
        .child(
          S.list()
            .title('Nieużywane na stronie')
            .items([
              list(S, 'hero', 'Sekcja Hero (stara)', ArchiveIcon),
              list(S, 'stats', 'Statystyki (stare)', ArchiveIcon),
            ]),
        ),
    ])

/**
 * Typy występujące w jednym egzemplarzu - ukrywamy je w globalnym "+ Create",
 * żeby nie dało się przypadkiem stworzyć drugiej stopki czy drugiego procesu.
 */
export const SINGLETON_TYPES = [
  'processSection',
  'whatsNew',
  'aboutUs',
  'offerStats',
  'industries',
  'technologies',
  'rollUpPage',
  'funding',
  'footer',
  'offer',
]
