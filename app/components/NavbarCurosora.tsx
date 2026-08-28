"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import StarGradientButton from "./ui/gradientBackground";
import NavigationLink from "./NavigationLink";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { EuFlag } from "./FundingSigns";
import { cn } from "@/lib/utils";
import { SHOW_ABOUT_PAGE, SHOW_CASE_STUDIES } from "@/lib/featureFlags";

const OFFER_LINKS = [
  { titleKey: "webApps", slug: "aplikacje-webowe" },
  { titleKey: "mobileApps", slug: "aplikacje-mobilne" },
  { titleKey: "fastPrototyping", slug: "fast-prototyping" },
  { titleKey: "ai", slug: "aI-i-automatyzacja-procesow" },
  { titleKey: "cybersecurity", slug: "cybersecurity" },
  { titleKey: "outsourcing", slug: "outsourcing-programistow" },
  { titleKey: "academy", slug: "akademia-i-szkolenia" },
] as const;

const isValidSlug = (slug: string) => /^[a-zA-Z0-9-]+$/.test(slug);

interface ServiceItem {
  title: string;
  slug: string;
  href: string;
}

function ServicesDropdownDesktop({
  items,
  active,
  allLabel,
  triggerLabel,
  menuLabel,
}: {
  items: ServiceItem[];
  active: boolean;
  allLabel: string;
  triggerLabel: string;
  menuLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = "services-dropdown-desktop";
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setIsOpen(false), 120);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [isOpen]);

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setIsOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={cancelClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
          active
            ? "text-blue-600 font-semibold"
            : "hover:text-blue-600 text-slate-700",
        )}
      >
        {triggerLabel}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={menuId}
        role="region"
        aria-label={menuLabel}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-150",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none",
        )}
      >
        <ul className="min-w-[280px] bg-white border border-gray-100 rounded-md shadow-xl py-2 max-h-[70vh] overflow-y-auto">
          <li>
            <Link
              href={items[0] ? items[0].href.replace(/\/[^/]+$/, "") : "#"}
              className="block px-4 py-2 text-sm text-slate-900 font-semibold hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:bg-blue-50 focus-visible:text-blue-700"
            >
              {allLabel}
            </Link>
          </li>
          <li
            role="separator"
            aria-hidden="true"
            className="my-1 border-t border-gray-100"
          />
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:bg-blue-50 focus-visible:text-blue-700"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServicesDisclosureMobile({
  items,
  active,
  allLabel,
  triggerLabel,
  openLabel,
  closeLabel,
  onNavigate,
}: {
  items: ServiceItem[];
  active: boolean;
  allLabel: string;
  triggerLabel: string;
  openLabel: string;
  closeLabel: string;
  onNavigate: () => void;
}) {
  const [isOpen, setIsOpen] = useState(active);
  const panelId = "services-disclosure-mobile";

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? closeLabel : openLabel}
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between text-left text-lg font-medium py-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
          active
            ? "text-blue-600 font-semibold"
            : "text-slate-900 hover:text-blue-600",
        )}
      >
        <span>{triggerLabel}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <ul className="pl-3 pt-2 pb-1 space-y-2 border-l-2 border-blue-100">
            <li>
              <NavigationLink
                href={items[0] ? items[0].href.replace(/\/[^/]+$/, "") : "#"}
                onClick={onNavigate}
                className="block py-1.5 text-base font-semibold text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:underline"
              >
                {allLabel}
              </NavigationLink>
            </li>
            {items.map((item) => (
              <li key={item.slug}>
                <NavigationLink
                  href={item.href}
                  onClick={onNavigate}
                  className="block py-1.5 text-base text-slate-700 hover:text-blue-600 focus-visible:outline-none focus-visible:underline"
                >
                  {item.title}
                </NavigationLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function NavbarCurosora() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("nav");
  const tOffer = useTranslations("offer.projects");
  const locale = useLocale();
  const pathname = usePathname();

  // Na stronie kontaktu przycisk prowadzi do sekcji z danymi kontaktowymi,
  // a nie do `mailto:` - adres nie ma po co siedzieć w HTML nagłówka
  // każdej podstrony (to darmowy łup dla harvesterów spamu).
  const consultationHref = `/${locale}/kontakt`;

  // Menu mobilne jest dialogiem: Escape je zamyka, a tło pod nakładką się nie
  // przewija (inaczej scroll „przechodzi" na stronę pod menu).
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Zmiana adresu (także przyciskiem „wstecz") zamyka menu.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const servicesActive = pathname?.startsWith(`/${locale}/oferta`) ?? false;

  const serviceItems: ServiceItem[] = OFFER_LINKS.filter((l) =>
    isValidSlug(l.slug),
  ).map((item) => ({
    title: tOffer(`${item.titleKey}.title`),
    slug: item.slug,
    href: `/${locale}/oferta/${item.slug}`,
  }));

  const navLinkClass = (isActive: boolean) =>
    cn(
      "whitespace-nowrap transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
      isActive
        ? "text-blue-600 font-semibold"
        : "hover:text-blue-600 text-slate-700",
    );

  return (
    // <header>, a nie <div> - inaczej logo, przełącznik języka i menu mobilne
    // leżą poza jakimkolwiek landmarkiem (WCAG 1.3.1 / axe "region").
    <header
      className={`sticky top-0 z-50 w-full -mb-34 flex justify-center px-4 pt-2 pb-6 transition-all max-w-[1300px] mx-auto duration-700 ease-out opacity-100 translate-y-0`}
    >
      {/* Mobile Header */}
      <div className="lg:hidden w-full max-w-[1300px]">
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-md border border-gray-100/50 shadow-sm rounded-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <NavigationLink
              className="w-32 h-12 shrink-0 rounded-lg flex cursor-pointer items-center justify-center"
              href={`/${locale}`}
            >
              <img
                src="/logocetus.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </NavigationLink>
            <EuFlag className="h-6 w-auto shrink-0 rounded-sm" />
          </div>
          <div className="flex items-center justify-center">
            <LanguageSwitcher />
            <button
              className="p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex flex-row gap-4 w-full max-w-[1300px]">
        <div className="relative shrink-0 transform -skew-x-12 bg-white/60 backdrop-blur-md border border-emerald-100/50 shadow-sm rounded-xl">
          <div className="transform skew-x-12 w-full h-full flex items-center px-5 py-1">
            <div className="flex items-center gap-3">
              <NavigationLink
                href={`/${locale}`}
                className="h-16 w-40 rounded-md flex items-center justify-center"
              >
                <img
                  src="/logocetus.png"
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </NavigationLink>
              <EuFlag className="h-8 w-auto shrink-0 rounded-sm" />
            </div>
          </div>
        </div>

        <div className="flex-1 items-center justify-center transform -skew-x-12 h-[74px] bg-white/60 backdrop-blur-md border border-emerald-100/50 shadow-sm rounded-xl">
          <div className="w-full h-full flex items-center justify-between px-6 transform skew-x-12">
            <nav
              className="flex flex-nowrap items-center gap-4 text-[15px] font-medium whitespace-nowrap"
              aria-label="Główna nawigacja"
            >
              <NavigationLink
                href={`/${locale}`}
                className={cn(
                  "flex items-center gap-2 group",
                  navLinkClass(
                    pathname === `/${locale}` || pathname === `/${locale}/`,
                  ),
                )}
                aria-current={
                  pathname === `/${locale}` || pathname === `/${locale}/`
                    ? "page"
                    : undefined
                }
              >
                {t("home")}
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full bg-blue-400 transition-opacity",
                    pathname === `/${locale}` || pathname === `/${locale}/`
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                  aria-hidden="true"
                />
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">
                /
              </span>

              {/* O nas - ukryte (SHOW_ABOUT_PAGE). Razem z linkiem znika
                  ukośnik, żeby w pasku nie został wiszący separator. */}
              {SHOW_ABOUT_PAGE && (
                <>
                  <NavigationLink
                    href={`/${locale}/o-nas`}
                    className={navLinkClass(
                      pathname?.startsWith(`/${locale}/o-nas`) ?? false,
                    )}
                    aria-current={
                      pathname?.startsWith(`/${locale}/o-nas`) ? "page" : undefined
                    }
                  >
                    {t("about")}
                  </NavigationLink>
                  <span className="text-slate-300 text-xs" aria-hidden="true">
                    /
                  </span>
                </>
              )}

              <ServicesDropdownDesktop
                items={serviceItems}
                active={servicesActive}
                allLabel={t("allServices")}
                triggerLabel={t("services")}
                menuLabel={t("servicesMenuLabel")}
              />
              <span className="text-slate-300 text-xs" aria-hidden="true">
                /
              </span>

              {/* Realizacje - ukryte na produkcji (SHOW_CASE_STUDIES).
                  Razem z linkiem znika ukośnik, żeby w pasku nie został
                  wiszący separator. */}
              {SHOW_CASE_STUDIES && (
                <>
                  <NavigationLink
                    href={`/${locale}/case-studies`}
                    className={navLinkClass(
                      pathname?.startsWith(`/${locale}/case-studies`) ?? false,
                    )}
                    aria-current={
                      pathname?.startsWith(`/${locale}/case-studies`)
                        ? "page"
                        : undefined
                    }
                  >
                    {t("caseStudies")}
                  </NavigationLink>
                  <span className="text-slate-300 text-xs" aria-hidden="true">
                    /
                  </span>
                </>
              )}

              <NavigationLink
                href={`/${locale}/blog`}
                className={navLinkClass(
                  pathname?.startsWith(`/${locale}/blog`) ?? false,
                )}
                aria-current={
                  pathname?.startsWith(`/${locale}/blog`) ? "page" : undefined
                }
              >
                {t("blog")}
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">
                /
              </span>

              <NavigationLink
                href={`/${locale}/kontakt`}
                className={navLinkClass(
                  pathname?.startsWith(`/${locale}/kontakt`) ?? false,
                )}
                aria-current={
                  pathname?.startsWith(`/${locale}/kontakt`)
                    ? "page"
                    : undefined
                }
              >
                {t("contact")}
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">
                /
              </span>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="relative overflow-visible">
                <Link href={consultationHref}>
                  <StarGradientButton>
                    {t("freeConsultation")}
                  </StarGradientButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay
          Portal do <body>, a nie dziecko <header>. Nagłówek ma własny kontekst
          stapiania (`z-50`), a `backdrop-filter` rozmywa tylko to, co jest
          namalowane pod nim W TYM SAMYM kontekście - w środku nagłówka nakładka
          rozmywała więc same paski nagłówka, a nie stronę pod spodem (stąd
          „blurowanie tylko headera"). Z portalu nakładka widzi całą stronę.

          Panel jest `fixed` i dostaje `top` POD paskiem nagłówka (8 px
          paddingu nagłówka + 72 px wysokości paska). Wcześniej stał na
          `top-0 mt-2`, czyli wjeżdżał pod nagłówek i menu było niewidoczne. */}
      {isMobileMenuOpen &&
        createPortal(
          <>
            <div
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-sm animate-in fade-in duration-200 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              className="fixed inset-x-4 top-[5.5rem] z-40 flex max-h-[calc(100dvh-7rem)] flex-col gap-4 overflow-y-auto rounded-2xl border border-gray-100 bg-white/95 p-6 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200 lg:hidden"
              aria-label="Mobilna nawigacja"
            >
              <h2 id="mobile-menu-title" className="sr-only">
                Menu nawigacyjne
              </h2>
              <NavigationLink
                href={`/${locale}`}
                className={cn(
                  "text-lg font-medium border-b border-gray-100 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm",
                  pathname === `/${locale}` || pathname === `/${locale}/`
                    ? "text-blue-600 font-semibold"
                    : "text-slate-900 hover:text-blue-600",
                )}
                aria-current={
                  pathname === `/${locale}` || pathname === `/${locale}/`
                    ? "page"
                    : undefined
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("home")}
              </NavigationLink>

              {SHOW_ABOUT_PAGE && (
                <NavigationLink
                  href={`/${locale}/o-nas`}
                  className={cn(
                    "text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm",
                    pathname?.startsWith(`/${locale}/o-nas`)
                      ? "text-blue-600 font-semibold"
                      : "text-slate-900 hover:text-blue-600",
                  )}
                  aria-current={
                    pathname?.startsWith(`/${locale}/o-nas`) ? "page" : undefined
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("about")}
                </NavigationLink>
              )}

              <ServicesDisclosureMobile
                items={serviceItems}
                active={servicesActive}
                allLabel={t("allServices")}
                triggerLabel={t("services")}
                openLabel={t("openServicesMenu")}
                closeLabel={t("closeServicesMenu")}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />

              {SHOW_CASE_STUDIES && (
                <NavigationLink
                  href={`/${locale}/case-studies`}
                  className={cn(
                    "text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm",
                    pathname?.startsWith(`/${locale}/case-studies`)
                      ? "text-blue-600 font-semibold"
                      : "text-slate-900 hover:text-blue-600",
                  )}
                  aria-current={
                    pathname?.startsWith(`/${locale}/case-studies`)
                      ? "page"
                      : undefined
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("caseStudies")}
                </NavigationLink>
              )}

              <NavigationLink
                href={`/${locale}/blog`}
                className={cn(
                  "text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm",
                  pathname?.startsWith(`/${locale}/blog`)
                    ? "text-blue-600 font-semibold"
                    : "text-slate-900 hover:text-blue-600",
                )}
                aria-current={
                  pathname?.startsWith(`/${locale}/blog`) ? "page" : undefined
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("blog")}
              </NavigationLink>

              <NavigationLink
                href={`/${locale}/kontakt`}
                className={cn(
                  "text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm",
                  pathname?.startsWith(`/${locale}/kontakt`)
                    ? "text-blue-600 font-semibold"
                    : "text-slate-900 hover:text-blue-600",
                )}
                aria-current={
                  pathname?.startsWith(`/${locale}/kontakt`)
                    ? "page"
                    : undefined
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("contact")}
              </NavigationLink>

              <div className="flex items-center justify-center pt-2">
                <Link
                  href={consultationHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <StarGradientButton>
                    {t("freeConsultation")}
                  </StarGradientButton>
                </Link>
              </div>
            </nav>
          </>,
          document.body,
        )}
    </header>
  );
}
