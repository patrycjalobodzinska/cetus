'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Linkedin, Dribbble, Twitter, Facebook, Instagram } from 'lucide-react';
import { client } from '@/sanity/lib/client';
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

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [offerProjects, setOfferProjects] = useState<OfferProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const query = `*[_type == "footer"][0] {
          contactTitle,
          contactDescription,
          phone,
          email,
          address,
          primaryButtonText,
          primaryButtonLink,
          secondaryButtonText,
          secondaryButtonLink,
          companyLinks[] {
            text,
            url
          },
          documentLinks[] {
            text,
            url
          },
          socialMedia[] {
            platform,
            url
          },
          copyright
        }`;
        const data = await client.fetch<FooterData>(query);
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
            title,
            slug,
            order
          }
        }`;
        const data = await client.fetch<{ projects?: OfferProject[] }>(query);
        if (data?.projects) {
          setOfferProjects(data.projects);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania projektów z oferty:', error);
      }
    }

    fetchFooter();
    fetchOfferProjects();
  }, []);

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

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Kontakt Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">
              {footerData.contactTitle || 'Kontakt'}
            </h3>
            {footerData.contactDescription && (
              <p className="text-slate-300 leading-relaxed">
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
            </div>

            <div className="flex flex-col gap-3 pt-4">
              {footerData.primaryButtonText && (
                <Link href={footerData.primaryButtonLink || '/kontakt'}>
                  <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center">
                    {footerData.primaryButtonText}
                  </button>
                </Link>
              )}
              {footerData.secondaryButtonText && (
                <Link href={footerData.secondaryButtonLink || '/kontakt'}>
                  <button className="w-full px-6 py-3 bg-transparent text-blue-400 border-2 border-blue-400 font-semibold rounded-lg hover:bg-blue-400/10 transition-colors text-center">
                    {footerData.secondaryButtonText}
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Oferta Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Oferta</h3>
            <ul className="space-y-3">
              {offerProjects.length > 0 ? (
                offerProjects.map((project, index) => (
                  <li key={index}>
                    <Link
                      href={project.slug?.current ? `/oferta/${project.slug.current}` : '#'}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {project.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-400 text-sm">Brak ofert</li>
              )}
            </ul>
          </div>

          {/* Firma Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Firma</h3>
            <ul className="space-y-3">
              {footerData.companyLinks && footerData.companyLinks.length > 0 ? (
                footerData.companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url || '#'}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/case-studies" className="text-slate-300 hover:text-white transition-colors">
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link href="/o-nas" className="text-slate-300 hover:text-white transition-colors">
                      O nas
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Dokumenty Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Dokumenty</h3>
            <ul className="space-y-3">
              {footerData.documentLinks && footerData.documentLinks.length > 0 ? (
                footerData.documentLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url || '#'}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/regulamin" className="text-slate-300 hover:text-white transition-colors">
                      Regulamin
                    </Link>
                  </li>
                  <li>
                    <Link href="/polityka-prywatnosci" className="text-slate-300 hover:text-white transition-colors">
                      Polityka prywatności
                    </Link>
                  </li>
                  <li>
                    <Link href="/pliki-cookies" className="text-slate-300 hover:text-white transition-colors">
                      Pliki cookies
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">

       <Link href="/">      <Image src="/logocetus.png"  alt="CetusPro" className='bg-white w-40 rounded-lg' width={100} height={100} />   </Link>   </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {footerData.socialMedia && footerData.socialMedia.length > 0 ? (
                footerData.socialMedia.map((social, index) => {
                  const Icon = socialIcons[social.platform.toLowerCase()];
                  if (!Icon) return null;
                  return (
                    <a
                      key={index}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-colors"
                      aria-label={social.platform}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })
              ) : (
                <>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors" aria-label="Dribbble">
                    <Dribbble className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors" aria-label="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>

            {/* Copyright */}
            <p className="text-slate-400 text-sm text-center md:text-right">
              {footerData.copyright || '© 2025 CetusPro. Wszelkie prawa zastrzeżone.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
