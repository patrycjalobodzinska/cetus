import Link from 'next/link';
import { Mail, MapPin, Linkedin, Dribbble, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { FundingSignSet } from './FundingSigns';
import { getLocale, getTranslations } from 'next-intl/server';
import StarGradientButton from './ui/gradientBackground';
import Image from 'next/image';
import ObfuscatedEmail from './ObfuscatedEmail';
import { cloakEmail } from '@/lib/emailCloak';
import CookieSettingsLink from './consent/CookieSettingsLink';

interface FooterData {
  contactTitle?: string;
  contactDescription?: string;
  phone?: string;
  email?: string;
  address?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  companyLinks?: Array<{ text: string; url: string }>;
  documentLinks?: Array<{ text: string; url: string }>;
  socialMedia?: Array<{ platform: string; url: string }>;
  copyright?: string;
}

interface FundingData {
  enabled?: boolean;
  logoLockup?: { asset?: unknown; alt?: string };
}

interface OfferProject {
  title: string;
  slug?: {
    current: string;
  };
  order?: number;
}

const socialIcons: Record<string, any> = {
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
};

const DEFAULT_SOCIAL_MEDIA = [
  { platform: 'facebook', url: 'https://www.facebook.com/cetusprocom/?locale=pl_PL' },
  { platform: 'instagram', url: 'https://www.instagram.com/cetuspro/' },
  { platform: 'linkedin', url: 'https://pl.linkedin.com/company/cetuspro' },
];

const DEFAULT_OFFER_LINKS = [
  { titleKey: 'webApps', slug: 'aplikacje-webowe' },
  { titleKey: 'mobileApps', slug: 'aplikacje-mobilne' },
  { titleKey: 'fastPrototyping', slug: 'fast-prototyping' },
  { titleKey: 'ai', slug: 'aI-i-automatyzacja-procesow' },
  { titleKey: 'cybersecurity', slug: 'cybersecurity' },
  { titleKey: 'outsourcing', slug: 'outsourcing-programistow' },
  { titleKey: 'academy', slug: 'akademia-i-szkolenia' },
];

const FOOTER_QUERY = `*[_type == "footer"][0] {
  "contactTitle": coalesce(contactTitle[$locale], contactTitle.pl),
  "contactDescription": coalesce(contactDescription[$locale], contactDescription.pl),
  phone,
  email,
  address,
  "primaryButtonText": coalesce(primaryButtonText[$locale], primaryButtonText.pl),
  primaryButtonLink,
  "secondaryButtonText": coalesce(secondaryButtonText[$locale], secondaryButtonText.pl),
  secondaryButtonLink,
  companyLinks[] {
    "text": coalesce(text[$locale], text.pl),
    url
  },
  documentLinks[] {
    "text": coalesce(text[$locale], text.pl),
    url
  },
  socialMedia[] {
    platform,
    url
  },
  "copyright": coalesce(copyright[$locale], copyright.pl)
}`;

const OFFER_PROJECTS_QUERY = `*[_type == "offer"][0] {
  projects[] | order(order asc) {
    "title": coalesce(title[$locale], title.pl),
    slug,
    order
  }
}`;

const FUNDING_QUERY = `*[_type == "funding"][0] {
  enabled,
  logoLockup { asset, alt }
}`;

const isValidSlug = (slug: string) => /^[a-zA-Z0-9-]+$/.test(slug);

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const tOffer = await getTranslations('offer.projects');
  const tFunding = await getTranslations('funding');

  let footerData: FooterData | null = null;
  let offerProjects: OfferProject[] = [];
  let funding: FundingData | null = null;

  try {
    const [footer, offer, fundingDoc] = await Promise.all([
      client.fetch<FooterData | null>(FOOTER_QUERY, { locale }),
      client.fetch<{ projects?: OfferProject[] } | null>(OFFER_PROJECTS_QUERY, { locale }),
      client.fetch<FundingData | null>(FUNDING_QUERY),
    ]);
    footerData = footer ?? null;
    offerProjects = offer?.projects ?? [];
    funding = fundingDoc ?? null;
  } catch (error) {
    console.error('Footer Sanity fetch failed:', error);
  }

  // Pasek pokazujemy, gdy dofinansowanie jest opublikowane. Oficjalne
  // zestawienie znaków z Sanity ma pierwszeństwo; dopóki go nie ma, pokazujemy
  // emblemat UE rysowany w kodzie z wymaganym podpisem.
  const showFundingStrip = Boolean(funding?.enabled);
  const hasOfficialLockup = Boolean(funding?.logoLockup?.asset);

  const data: FooterData = footerData ?? {};

  const offerLinks = (offerProjects.length > 0
    ? offerProjects.map((p) => ({ title: p.title, slug: p.slug?.current || '' }))
    : DEFAULT_OFFER_LINKS.map((item) => ({
        title: tOffer(`${item.titleKey}.title`),
        slug: item.slug,
      }))
  ).filter((link) => link.slug && isValidSlug(link.slug));

  const socialMedia =
    data.socialMedia && data.socialMedia.length > 0
      ? data.socialMedia
      : DEFAULT_SOCIAL_MEDIA;

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p
            style={{ fontFamily: "var(--font-michroma)" }}
            className="text-white text-center text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {t('tagline')}
          </p>
          <div aria-hidden="true" className="mt-6 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {data.contactTitle && (
              // h2, bo to pierwszy nagłówek stopki - kolejne kolumny są h3.
              // Przy h3 na podstronach bez sekcji h2 powstawał przeskok h1 -> h3.
              <h2
                style={{ fontFamily: "var(--font-michroma)" }}
                className="text-2xl md:text-3xl font-black text-white leading-tight"
              >
                {data.contactTitle}
              </h2>
            )}
            {data.contactDescription && (
              <p className="text-slate-300 leading-relaxed text-sm">
                {data.contactDescription}
              </p>
            )}

            <div className="space-y-4">
              {data.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <ObfuscatedEmail
                    token={cloakEmail(data.email)}
                    className="text-slate-300 hover:text-white transition-colors"
                  />
                </div>
              )}
              {data.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                  <span className="text-slate-300">{data.address}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-sm">{t('taxIdLabel')}:</span>
                <span className="text-slate-300 text-sm">{t('taxIdValue')}</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-slate-500 text-sm">{t('workingHours')}:</span>
                <span className="text-slate-400 text-sm">{t('workingHoursValue')}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {data.primaryButtonText && (
                <Link href={(data.primaryButtonLink?.startsWith('http') ? data.primaryButtonLink : `/${locale}${data.primaryButtonLink || '/kontakt'}`)}>
                  <StarGradientButton>
                    <span className="flex items-center gap-2 justify-center">
                      {data.primaryButtonText}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </StarGradientButton>
                </Link>
              )}
              {data.secondaryButtonText && (
                <Link href={(data.secondaryButtonLink?.startsWith('http') ? data.secondaryButtonLink : `/${locale}${data.secondaryButtonLink || '/kontakt'}`)}>
                  <button className="w-full px-6 py-3 bg-transparent text-blue-400 border-2 border-blue-400 font-semibold rounded-lg hover:bg-blue-400/10 transition-colors text-center">
                    {data.secondaryButtonText}
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 before:content-[''] before:w-6 before:h-[2px] before:bg-blue-500 before:rounded-full">{t('navigation')}</h3>
            <ul className="space-y-3">
              <li><Link href={`/${locale}`} className="text-slate-300 hover:text-white transition-colors">{tNav('home')}</Link></li>
              <li><Link href={`/${locale}/o-nas`} className="text-slate-300 hover:text-white transition-colors">{tNav('about')}</Link></li>
              <li><Link href={`/${locale}/oferta`} className="text-slate-300 hover:text-white transition-colors">{tNav('services')}</Link></li>
              <li><Link href={`/${locale}/kontakt`} className="text-slate-300 hover:text-white transition-colors">{tNav('contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 before:content-[''] before:w-6 before:h-[2px] before:bg-blue-500 before:rounded-full">{t('services')}</h3>
            <ul className="space-y-3">
              {offerLinks.map((project, index) => (
                <li key={index}>
                  <Link
                    href={`/${locale}/oferta/${project.slug}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 before:content-[''] before:w-6 before:h-[2px] before:bg-blue-500 before:rounded-full">{t('company')}</h3>
            {data.companyLinks && data.companyLinks.length > 0 ? (
              <ul className="space-y-3">
                {data.companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.url || '#'} className="text-slate-300 hover:text-white transition-colors">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                <li><Link href={`/${locale}/o-nas`} className="text-slate-300 hover:text-white transition-colors">{tNav('about')}</Link></li>
                <li><Link href={`/${locale}/kontakt`} className="text-slate-300 hover:text-white transition-colors">{tNav('contact')}</Link></li>
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 before:content-[''] before:w-6 before:h-[2px] before:bg-blue-500 before:rounded-full">{t('documents')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/polityka-jakosci`} className="text-slate-300 hover:text-white transition-colors">
                  {t('qualityPolicy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/polityka-prywatnosci`} className="text-slate-300 hover:text-white transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/dofinansowanie`} className="text-slate-300 hover:text-white transition-colors">
                  {t('euFunding')}
                </Link>
              </li>
              <li>
                {/* Wejście do zgód cookies musi być dostępne w każdej chwili,
                    inaczej zgody nie da się realnie wycofać. */}
                <CookieSettingsLink />
              </li>
              {data.documentLinks && data.documentLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url || '#'} className="text-slate-300 hover:text-white transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pasek wiarygodności: dofinansowanie UE i certyfikat ISO. Biały, bo
          oficjalne znaki muszą stać na jasnym tle. */}
      <div className="relative border-t border-slate-800/60 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:px-8">
          {showFundingStrip && (
            <div className="flex flex-col items-center gap-5 sm:items-start">
              {hasOfficialLockup ? (
                <Image
                  src={urlFor(funding!.logoLockup).width(1000).fit('max').url()}
                  alt={
                    funding!.logoLockup!.alt ||
                    'Znak Fundusze Europejskie, flaga Unii Europejskiej - Dofinansowane przez Unie Europejska'
                  }
                  width={1000}
                  height={160}
                  className="h-14 sm:h-16 w-auto"
                />
              ) : (
                /* Pełne zestawienie znaków: FE Polska Wschodnia + barwy RP + UE
                   z EFRR. Stoi na każdej podstronie, w szerokości, w której
                   podpisy w znaku pozostają czytelne. */
                <FundingSignSet
                  locale={locale}
                  className="h-auto w-full max-w-[720px]"
                />
              )}

              <div className="text-center sm:text-left">
                <p className="text-sm leading-relaxed text-slate-600">
                  {tFunding('footerNote')}
                </p>
                <Link
                  href={`/${locale}/dofinansowanie`}
                  className="mt-1 inline-block text-sm font-semibold text-blue-600 underline-offset-4 transition-colors hover:text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {tFunding('footerLink')}
                </Link>
              </div>
            </div>
          )}

          {/* Certyfikat ISO. Zakres jest podany wprost, bo certyfikat obejmuje
              usługi szkoleniowe, a nie całą działalność firmy. */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center lg:justify-end lg:self-center">
            <span className="flex h-14 shrink-0 items-center rounded-xl border border-slate-200 px-4 text-base font-bold tracking-tight text-slate-900 sm:h-16 sm:text-lg">
              {t('iso.standard')}
            </span>
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-slate-900">{t('iso.system')}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                {t('iso.certificate')}
              </p>
              <p className="text-xs leading-relaxed text-slate-600">{t('iso.scope')}</p>
              <Link
                href={`/${locale}/polityka-jakosci`}
                className="mt-1 inline-block text-sm font-semibold text-blue-600 underline-offset-4 transition-colors hover:text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {t('iso.link')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-slate-800/60 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href={`/${locale}`}>
                <Image src="/logocetus.png" alt="CETUSPRO" className="bg-white w-36 rounded-lg" width={144} height={48} />
              </Link>
              <div className="text-center sm:text-left">
                <p className="text-slate-400 text-sm font-medium mb-1">{t('stayInTouch')}</p>
                <p className="text-slate-500 text-xs">{t('followUs')}</p>
              </div>
            </div>

            {socialMedia.length > 0 && (
              <div className="flex items-center gap-5">
                {socialMedia.map((social, index) => {
                  const Icon = socialIcons[social.platform.toLowerCase()];
                  if (!Icon) return null;
                  return (
                    <a
                      key={index}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
                      aria-label={social.platform}
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            )}

            {data.copyright && (
              <p className="text-slate-500 text-sm text-center lg:text-right">
                {data.copyright}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
