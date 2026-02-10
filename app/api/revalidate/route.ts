import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Route handler do revalidacji cache Sanity
 *
 * Konfiguracja webhooka w Sanity:
 * 1. Przejdź do https://www.sanity.io/manage
 * 2. Wybierz swój projekt
 * 3. Settings > API > Webhooks
 * 4. Dodaj nowy webhook:
 *    - URL: https://twoja-domena.vercel.app/api/revalidate?secret=TWÓJ_SECRET
 *    - Dataset: production (lub development)
 *    - Trigger on: Create, Update, Delete
 *    - Filter: *[_type == "faq"] || *[_type == "technologies"] || *[_type == "industries"] || *[_type == "offerStats"] || *[_type == "partner"] || *[_type == "homepageModules"] || *[_type == "team"] || *[_type == "caseStudy"] || *[_type == "footer"]
 *
 * Ustaw zmienną środowiskową REVALIDATE_SECRET w Vercel:
 * Settings > Environment Variables > Add New
 * Name: REVALIDATE_SECRET
 * Value: wygeneruj losowy string (np. openssl rand -base64 32)
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    revalidateTag('sanity', {})
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
