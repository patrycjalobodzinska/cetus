import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

const legacyMap: Record<string, string> = {
  '/contact': '/kontakt',
  '/about-company': '/o-nas',
  '/services': '/oferta',
  '/service/web-apps': '/oferta/aplikacje-webowe',
  '/service/mobile-apps': '/oferta/aplikacje-mobilne',
  '/service/ui-ux': '/oferta/fast-prototyping',
  '/service/mvp-startups': '/oferta/cetus-venture-capital',
  '/service/outsourcing': '/oferta/outsourcing-programistow',
  '/service/product-design': '/oferta/fast-prototyping',
  // UX/UI Design zastąpiony usługą Fast Prototyping, transformacja
  // technologiczna zdjęta z oferty (2026-08-28).
  '/oferta/ui-ux-design': '/oferta/fast-prototyping',
  '/oferta/transformacja-technologiczna': '/oferta',
  '/service/marketing-startups': '/oferta',
  '/career': '/o-nas',
  '/industries': '/oferta',
  '/our-technologies': '/oferta',
  '/accelerator': '/oferta/cetus-venture-capital',
  '/academy': '/oferta/akademia-i-szkolenia',
  '/our-clients': '/case-studies',
  // Stara polityka prywatnosci byla zaindeksowana pod /privacy-policy.
  '/privacy-policy': '/polityka-prywatnosci',
};

const legacyRedirects = [
  { from: '/pl', to: '/' },
  { from: '/pl/', to: '/' },
  ...Object.entries(legacyMap).flatMap(([oldPath, newPath]) => [
    { from: oldPath, to: newPath },
    { from: `/pl${oldPath}`, to: newPath },
    { from: `/en${oldPath}`, to: `/en${newPath}` },
  ]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  transpilePackages: ['next-sanity', '@sanity/vision'],
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/:path((?!studio).*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return legacyRedirects.map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
  },
};


export default withNextIntl(nextConfig);
