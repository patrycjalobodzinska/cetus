'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Linkedin, Dribbble, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { useLocale, useTranslations } from 'next-intl';
import StarGradientButton from './ui/gradientBackground';
import Image from 'next/image';

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

const DEFAULT_OFFER_LINKS = [
  { titleKey: 'webApps', slug: 'aplikacje-webowe' },
  { titleKey: 'mobileApps', slug: 'aplikacje-mobilne' },
  { titleKey: 'uiUx', slug: 'ui-ux-design' },
  { titleKey: 'ai', slug: 'aI-i-automatyzacja-procesow' },
  { titleKey: 'cybersecurity', slug: 'cybersecurity' },
  { titleKey: 'transformation', slug: 'transformacja-technologiczna' },
  { titleKey: 'outsourcing', slug: 'outsourcing-programistow' },
  { titleKey: 'academy', slug: 'akademia-i-szkolenia' },
  { titleKey: 'venture', slug: 'cetus-venture-capital' },
];

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [offerProjects, setOfferProjects] = useState<OfferProject[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tOffer = useTranslations('offer.projects');

  useEffect(() => {
    async function fetchFooter() {
      try {
        const query = `*[_type == "footer"][0] {
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
        const data = await client.fetch<FooterData>(query, { locale });
        setFooterData(data);
      } catch (error) {
        console.error('Błąd podczas pobierania footera:', error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchOfferProjects() {
      try {
        const query = `*[_type == "offer"][0] {
          projects[] | order(order asc) {
            "title": coalesce(title[$locale], title.pl),
            slug,
            order
          }
        }`;
        const data = await client.fetch<{ projects?: OfferProject[] }>(query, { locale });
        if (data?.projects) {
          setOfferProjects(data.projects);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania projektów z oferty:', error);
      }
    }

    fetchFooter();
    fetchOfferProjects();
  }, [locale]);

  if (loading) {
    return (
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">Ładowanie...</p>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return null;
  }

  const offerLinks = offerProjects.length > 0
    ? offerProjects.map((p) => ({ title: p.title, slug: p.slug?.current || '#' }))
    : DEFAULT_OFFER_LINKS.map((item) => ({
        title: tOffer(`${item.titleKey}.title`),
        slug: item.slug,
      }));

  return (
    <footer className="bg-slate-900 text-white">
      {/* Tagline Banner */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-slate-300 text-center text-lg max-w-2xl mx-auto leading-relaxed">
            {t('tagline')}
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Kontakt Column */}
          <div className="lg:col-span-2 space-y-6">
            {footerData.contactTitle && (
              <h3 className="text-xl font-bold text-white">
                {footerData.contactTitle}
              </h3>
            )}
            {footerData.contactDescription && (
              <p className="text-slate-300 leading-relaxed text-sm">
                {footerData.contactDescription}
              </p>
            )}

            <div className="space-y-4">
              {footerData.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                  <a href={`tel:${footerData.phone}`} className="text-slate-300 hover:text-white transition-colors">
                    {footerData.phone}
                  </a>
                </div>
              )}
              {footerData.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <a href={`mailto:${footerData.email}`} className="text-slate-300 hover:text-white transition-colors">
                    {footerData.email}
                  </a>
                </div>
              )}
              {footerData.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                  <span className="text-slate-300">{footerData.address}</span>
                </div>
              )}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-slate-500 text-sm">{t('workingHours')}:</span>
                <span className="text-slate-400 text-sm">{t('workingHoursValue')}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {footerData.primaryButtonText && (
                <Link href={(footerData.primaryButtonLink?.startsWith('http') ? footerData.primaryButtonLink : `/${locale}${footerData.primaryButtonLink || '/kontakt'}`)}>
                  <StarGradientButton>
                    <span className="flex items-center gap-2 justify-center">
                      {footerData.primaryButtonText}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </StarGradientButton>
                </Link>
              )}
              {footerData.secondaryButtonText && (
                <Link href={(footerData.secondaryButtonLink?.startsWith('http') ? footerData.secondaryButtonLink : `/${locale}${footerData.secondaryButtonLink || '/kontakt'}`)}>
                  <button className="w-full px-6 py-3 bg-transparent text-blue-400 border-2 border-blue-400 font-semibold rounded-lg hover:bg-blue-400/10 transition-colors text-center">
                    {footerData.secondaryButtonText}
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Nawigacja Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{t('navigation')}</h3>
            <ul className="space-y-3">
              <li><Link href={`/${locale}`} className="text-slate-300 hover:text-white transition-colors">{tNav('home')}</Link></li>
              <li><Link href={`/${locale}/o-nas`} className="text-slate-300 hover:text-white transition-colors">{tNav('about')}</Link></li>
              <li><Link href={`/${locale}/oferta`} className="text-slate-300 hover:text-white transition-colors">{tNav('services')}</Link></li>
              <li><Link href={`/${locale}/case-studies`} className="text-slate-300 hover:text-white transition-colors">{tNav('caseStudies')}</Link></li>
              <li><Link href={`/${locale}/kontakt`} className="text-slate-300 hover:text-white transition-colors">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Oferta Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{t('services')}</h3>
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

          {/* Firma Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{t('company')}</h3>
            {footerData.companyLinks && footerData.companyLinks.length > 0 ? (
              <ul className="space-y-3">
                {footerData.companyLinks.map((link, index) => (
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
                <li><Link href={`/${locale}/case-studies`} className="text-slate-300 hover:text-white transition-colors">{tNav('caseStudies')}</Link></li>
                <li><Link href={`/${locale}/kontakt`} className="text-slate-300 hover:text-white transition-colors">{tNav('contact')}</Link></li>
              </ul>
            )}
          </div>

          {/* Dokumenty Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{t('documents')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/polityka-jakosci`} className="text-slate-300 hover:text-white transition-colors">
                  Polityka Jakości
                </Link>
              </li>
              {footerData.documentLinks && footerData.documentLinks.map((link, index) => (
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

      {/* Bottom Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href={`/${locale}`}>
                <Image src="/logocetus.png" alt="CetusPro" className="bg-white w-36 rounded-lg" width={144} height={48} />
              </Link>
              <div className="text-center sm:text-left">
                <p className="text-slate-400 text-sm font-medium mb-1">{t('stayInTouch')}</p>
                <p className="text-slate-500 text-xs">{t('followUs')}</p>
              </div>
            </div>

            {(footerData.socialMedia && footerData.socialMedia.length > 0) && (
              <div className="flex items-center gap-5">
                {footerData.socialMedia.map((social, index) => {
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

            {footerData.copyright && (
              <p className="text-slate-500 text-sm text-center lg:text-right">
                {footerData.copyright}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
