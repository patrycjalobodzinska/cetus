import type { Metadata } from 'next'
import Link from 'next/link'
import { NextIntlClientProvider } from 'next-intl'
import NavbarCurosora from './components/NavbarCurosora'
import NavigationProvider from './components/NavigationProvider'
import messages from '../messages/pl.json'

export const metadata: Metadata = {
  title: 'Nie znaleziono strony | CETUSPRO',
  description: 'Strona, której szukasz, nie istnieje lub została przeniesiona.',
  robots: { index: false, follow: false },
}

export default function RootNotFound() {
  return (
    <NextIntlClientProvider locale="pl" messages={messages}>
      <NavigationProvider>
      <NavbarCurosora />
      <div className="h-[calc(100vh-8rem)] max-h-[calc(100vh-8rem)] flex items-center justify-center px-4 overflow-hidden">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-8xl md:text-[10rem] font-black leading-none mb-4 bg-gradient-to-br from-blue-500 to-blue-900 bg-clip-text text-transparent tracking-tight"
            style={{ fontFamily: 'var(--font-michroma)' }}
          >
            404
          </p>
          <h1
            className="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-michroma)' }}
          >
            Nie znaleziono strony
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-md mx-auto">
            Strona, której szukasz, nie istnieje lub została przeniesiona.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Wróć na stronę główną
            </Link>
            <Link
              href="/kontakt"
              className="text-blue-600 hover:underline font-semibold"
            >
              Skontaktuj się z nami
            </Link>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">Być może szukasz</p>
            <ul className="flex flex-wrap gap-2 justify-center">
              {[
                { href: '/oferta', label: 'Oferta' },
                { href: '/kontakt', label: 'Kontakt' },
              ].map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </NavigationProvider>
    </NextIntlClientProvider>
  )
}
