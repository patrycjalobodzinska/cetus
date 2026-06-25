"use client";

import React, { useEffect, useRef, useState } from "react";
import StarGradientButton from "./ui/gradientBackground";
import NavigationLink from "./NavigationLink";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const OFFER_LINKS = [
  { titleKey: "webApps", slug: "aplikacje-webowe" },
  { titleKey: "mobileApps", slug: "aplikacje-mobilne" },
  { titleKey: "uiUx", slug: "ui-ux-design" },
  { titleKey: "ai", slug: "aI-i-automatyzacja-procesow" },
  { titleKey: "cybersecurity", slug: "cybersecurity" },
  { titleKey: "transformation", slug: "transformacja-technologiczna" },
  { titleKey: "outsourcing", slug: "outsourcing-programistow" },
  { titleKey: "academy", slug: "akademia-i-szkolenia" },
  { titleKey: "venture", slug: "cetus-venture-capital" },
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
            : "hover:text-blue-600 text-slate-700"
        )}
      >
        {triggerLabel}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
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
            : "opacity-0 -translate-y-1 pointer-events-none"
        )}
      >
        <ul
          className="min-w-[280px] bg-white border border-gray-100 rounded-md shadow-xl py-2 max-h-[70vh] overflow-y-auto"
        >
          <li>
            <Link
              href={items[0] ? items[0].href.replace(/\/[^/]+$/, "") : "#"}
              className="block px-4 py-2 text-sm text-slate-900 font-semibold hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:bg-blue-50 focus-visible:text-blue-700"
            >
              {allLabel}
            </Link>
          </li>
          <li role="separator" aria-hidden="true" className="my-1 border-t border-gray-100" />
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
          active ? "text-blue-600 font-semibold" : "text-slate-900 hover:text-blue-600"
        )}
      >
        <span>{triggerLabel}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            isOpen && "rotate-180"
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
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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

  const isContactPage = pathname?.startsWith(`/${locale}/kontakt`);
  const consultationHref = isContactPage
    ? "mailto:contact@cetuspro.com?subject=Consultation"
    : `/${locale}/kontakt`;

  const servicesActive = pathname?.startsWith(`/${locale}/oferta`) ?? false;

  const serviceItems: ServiceItem[] = OFFER_LINKS.filter((l) => isValidSlug(l.slug)).map(
    (item) => ({
      title: tOffer(`${item.titleKey}.title`),
      slug: item.slug,
      href: `/${locale}/oferta/${item.slug}`,
    })
  );

  const navLinkClass = (isActive: boolean) =>
    cn(
      "whitespace-nowrap transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
      isActive
        ? "text-blue-600 font-semibold"
        : "hover:text-blue-600 text-slate-700"
    );

  return (
    <div
      className={`sticky top-0 z-50 w-full -mb-34 flex justify-center px-4 py-6 transition-all max-w-[1300px] mx-auto duration-700 ease-out opacity-100 translate-y-0`}
    >
      {/* Mobile Header */}
      <div className="lg:hidden w-full max-w-[1300px]">
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-md border border-gray-100/50 shadow-sm rounded-md px-4 py-3">
          <div className="flex items-center">
            <NavigationLink
              className="w-32 h-12 rounded-lg flex cursor-pointer items-center justify-center"
              href={`/${locale}`}
            >
              <img
                src="/logocetus.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </NavigationLink>
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
        <div className="relative shrink-0 transform -skew-x-12 bg-white/60 backdrop-blur-md border border-emerald-100/50 shadow-sm rounded-sm">
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
            </div>
          </div>
        </div>

        <div className="flex-1 items-center justify-center transform -skew-x-12 h-[74px] bg-white/60 backdrop-blur-md border border-emerald-100/50 shadow-sm rounded-sm">
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
                    pathname === `/${locale}` || pathname === `/${locale}/`
                  )
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
                      : "opacity-0 group-hover:opacity-100"
                  )}
                  aria-hidden="true"
                />
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">/</span>

              <NavigationLink
                href={`/${locale}/o-nas`}
                className={navLinkClass(
                  pathname?.startsWith(`/${locale}/o-nas`) ?? false
                )}
                aria-current={
                  pathname?.startsWith(`/${locale}/o-nas`) ? "page" : undefined
                }
              >
                {t("about")}
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">/</span>

              <ServicesDropdownDesktop
                items={serviceItems}
                active={servicesActive}
                allLabel={t("allServices")}
                triggerLabel={t("services")}
                menuLabel={t("servicesMenuLabel")}
              />
              <span className="text-slate-300 text-xs" aria-hidden="true">/</span>

              <NavigationLink
                href={`/${locale}/blog`}
                className={navLinkClass(
                  pathname?.startsWith(`/${locale}/blog`) ?? false
                )}
                aria-current={
                  pathname?.startsWith(`/${locale}/blog`) ? "page" : undefined
                }
              >
                {t("blog")}
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">/</span>

              <NavigationLink
                href={`/${locale}/kontakt`}
                className={navLinkClass(
                  pathname?.startsWith(`/${locale}/kontakt`) ?? false
                )}
                aria-current={
                  pathname?.startsWith(`/${locale}/kontakt`) ? "page" : undefined
                }
              >
                {t("contact")}
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">/</span>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="relative overflow-visible">
                {isContactPage ? (
                  <a href={consultationHref}>
                    <StarGradientButton>{t("freeConsultation")}</StarGradientButton>
                  </a>
                ) : (
                  <Link href={consultationHref}>
                    <StarGradientButton>{t("freeConsultation")}</StarGradientButton>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="shadow-2xl inset-0 top-0 fixed flex flex-col lg:hidden mt-24 border backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200 z-40"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <nav
            className="shadow-2xl max-h-[calc(100vh-6rem)] overflow-y-auto backdrop-blur-md bg-white/95 inset-x-0 top-0 fixed p-6 flex flex-col gap-4 mt-2 lg:hidden border mx-4 animate-in fade-in slide-in-from-top-4 duration-200"
            aria-label="Mobilna nawigacja"
            onClick={(e) => e.stopPropagation()}
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
                  : "text-slate-900 hover:text-blue-600"
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

            <NavigationLink
              href={`/${locale}/o-nas`}
              className={cn(
                "text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm",
                pathname?.startsWith(`/${locale}/o-nas`)
                  ? "text-blue-600 font-semibold"
                  : "text-slate-900 hover:text-blue-600"
              )}
              aria-current={
                pathname?.startsWith(`/${locale}/o-nas`) ? "page" : undefined
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("about")}
            </NavigationLink>

            <ServicesDisclosureMobile
              items={serviceItems}
              active={servicesActive}
              allLabel={t("allServices")}
              triggerLabel={t("services")}
              openLabel={t("openServicesMenu")}
              closeLabel={t("closeServicesMenu")}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />

            <NavigationLink
              href={`/${locale}/blog`}
              className={cn(
                "text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm",
                pathname?.startsWith(`/${locale}/blog`)
                  ? "text-blue-600 font-semibold"
                  : "text-slate-900 hover:text-blue-600"
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
                  : "text-slate-900 hover:text-blue-600"
              )}
              aria-current={
                pathname?.startsWith(`/${locale}/kontakt`) ? "page" : undefined
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("contact")}
            </NavigationLink>

            <div className="flex items-center justify-center pt-2">
              {isContactPage ? (
                <a
                  href={consultationHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <StarGradientButton>{t("freeConsultation")}</StarGradientButton>
                </a>
              ) : (
                <Link
                  href={consultationHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <StarGradientButton>{t("freeConsultation")}</StarGradientButton>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
