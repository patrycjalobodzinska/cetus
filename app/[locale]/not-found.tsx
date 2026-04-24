'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function NotFound() {
  const params = useParams()
  const locale = (params?.locale as string) || 'pl'
  const isEn = locale === 'en'

  const t = {
    title: isEn ? 'Page not found' : 'Nie znaleziono strony',
    description: isEn
      ? "The page you're looking for doesn't exist or has been moved."
      : 'Strona, której szukasz, nie istnieje lub została przeniesiona.',
    home: isEn ? 'Back to home' : 'Wróć na stronę główną',
    contact: isEn ? 'Contact us' : 'Skontaktuj się z nami',
    suggestions: isEn ? 'You may be looking for' : 'Być może szukasz',
  }

  const base = isEn ? '/en' : ''
  const suggestions = [
    { href: `${base}/o-nas`, label: isEn ? 'About us' : 'O nas' },
    { href: `${base}/oferta`, label: isEn ? 'Services' : 'Oferta' },
    { href: `${base}/case-studies`, label: isEn ? 'Case studies' : 'Realizacje' },
    { href: `${base}/kontakt`, label: isEn ? 'Contact' : 'Kontakt' },
  ]

  return (
    <div className="h-screen max-h-screen flex items-center justify-center px-4 overflow-hidden">
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
          {t.title}
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-md mx-auto">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Link
            href={base || '/'}
            className="inline-flex items-center px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            {t.home}
          </Link>
          <Link
            href={`${base}/kontakt`}
            className="text-blue-600 hover:underline font-semibold"
          >
            {t.contact}
          </Link>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">{t.suggestions}</p>
          <ul className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((s) => (
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
  )
}
