"use client";

import React, { useState } from "react";
import StarBorder from "./StarBorder";
import StarGradientButton from "./ui/gradientBackground";
import NavigationLink from "./NavigationLink";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export default function NavbarCurosora() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const navLinkClass = (isActive: boolean) =>
    cn(
      "transition-colors",
      isActive
        ? "text-blue-600 font-semibold"
        : "hover:text-blue-600 text-slate-700",
    );

  return (
    <div
      className={`sticky  top-0 z-50 w-full -mb-34  flex justify-center px-4 py-6 transition-all max-w-[1300px] mx-auto duration-700 ease-out ${"opacity-100 translate-y-0"}`}>
      {/* Mobile Header - Logo and Burger */}
      <div className="lg:hidden w-full max-w-[1300px]">
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-md border border-gray-100/50 shadow-sm rounded-md px-4 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <div>
              <NavigationLink
                className="w-32 h-12 rounded-lg flex cursor-pointer items-center justify-center "
                href={`/${locale}`}>
                {" "}
                <img
                  src="/logocetus.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </NavigationLink>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {" "}
            <LanguageSwitcher />
            {/* Burger Button */}
            <button
              className="p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true">
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

      {/* Main Navbar Container (Desktop) */}
      <div className="hidden lg:flex flex-row gap-4 w-full max-w-[1300px]">
        {/* --- LEFT SECTION (LOGO) --- */}
        <div className="relative transform -skew-x-12 bg-white/60 backdrop-blur-md border border-emerald-100/50 shadow-sm  rounded-sm ">
          <div className="transform skew-x-12 w-full h-full flex items-center px-5 py-1">
            <div className="flex items-center gap-3">
              <NavigationLink
                href={`/${locale}`}
                className="w-full h-16 rounded-md flex items-center justify-center ">
                <img
                  src="/logocetus.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </NavigationLink>
            </div>
          </div>
        </div>

        {/* --- RIGHT SECTION (NAVIGATION WITH STAR BORDER) --- */}
        <div className="flex-1 items-center justify-center transform -skew-x-12 h-[74px] bg-white/60 backdrop-blur-md border border-emerald-100/50 shadow-sm rounded-sm  ">
          {/* Content Container (Un-skewed) */}
          <div className="w-full h-full flex items-center justify-between px-8 transform skew-x-12">
            {/* Links */}
            <nav className="flex items-center gap-6 text-[15px] font-medium">
              <NavigationLink
                href={`/${locale}`}
                className={cn(
                  "flex items-center gap-2 group",
                  navLinkClass(
                    pathname === `/${locale}` || pathname === `/${locale}/`,
                  ),
                )}>
                {t("home")}
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full bg-blue-400 transition-opacity",
                    pathname === `/${locale}` || pathname === `/${locale}/`
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                  aria-hidden="true"></span>
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">
                /
              </span>

              <NavigationLink
                href={`/${locale}/o-nas`}
                className={navLinkClass(
                  pathname?.startsWith(`/${locale}/o-nas`) ?? false,
                )}>
                {t("about")}
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">
                /
              </span>

              <NavigationLink
                href={`/${locale}/oferta`}
                className={navLinkClass(
                  pathname?.startsWith(`/${locale}/oferta`) ?? false,
                )}>
                {t("services")}
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">
                /
              </span>

              <NavigationLink
                href={`/${locale}/case-studies`}
                className={navLinkClass(
                  pathname?.startsWith(`/${locale}/case-studies`) ?? false,
                )}>
                {t("caseStudies")}
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">
                /
              </span>

              <NavigationLink
                href={`/${locale}/kontakt`}
                className={navLinkClass(
                  pathname?.startsWith(`/${locale}/kontakt`) ?? false,
                )}>
                {t("contact")}
              </NavigationLink>
              <span className="text-slate-300 text-xs" aria-hidden="true">
                /
              </span>
            </nav>

            {/* Language Switcher and Action Button */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="relative overflow-visible">
                <Link href="mailto:kontakt@cetuspro.pl">
                  <StarGradientButton>
                    {t("freeConsultation")}
                  </StarGradientButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className=" shadow-2xl h-screen inset-0 top-0 fixed  flex flex-col gap-6 lg:hidden mt-24 border backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title">
          <nav className=" shadow-2xl h-[400px] backdrop-blur-md bg-white/60 inset-0 top-0 fixed p-6 flex flex-col gap-6 mt-2 lg:hidden border mx-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <h2 id="mobile-menu-title" className="sr-only">
              Menu nawigacyjne
            </h2>
            <NavigationLink
              href={`/${locale}`}
              className={cn(
                "text-lg font-medium border-b border-gray-100 pb-2",
                pathname === `/${locale}` || pathname === `/${locale}/`
                  ? "text-blue-600 font-semibold"
                  : "text-slate-900 hover:text-blue-600",
              )}
              onClick={() => setIsMobileMenuOpen(false)}>
              {t("home")}
            </NavigationLink>

            <NavigationLink
              href={`/${locale}/o-nas`}
              className={cn(
                "text-lg font-medium",
                pathname?.startsWith(`/${locale}/o-nas`)
                  ? "text-blue-600 font-semibold"
                  : "text-slate-900 hover:text-blue-600",
              )}
              onClick={() => setIsMobileMenuOpen(false)}>
              {t("about")}
            </NavigationLink>

            <NavigationLink
              href={`/${locale}/oferta`}
              className={cn(
                "text-lg font-medium",
                pathname?.startsWith(`/${locale}/oferta`)
                  ? "text-blue-600 font-semibold"
                  : "text-slate-900 hover:text-blue-600",
              )}
              onClick={() => setIsMobileMenuOpen(false)}>
              {t("services")}
            </NavigationLink>

            <NavigationLink
              href={`/${locale}/case-studies`}
              className={cn(
                "text-lg font-medium",
                pathname?.startsWith(`/${locale}/case-studies`)
                  ? "text-blue-600 font-semibold"
                  : "text-slate-900 hover:text-blue-600",
              )}
              onClick={() => setIsMobileMenuOpen(false)}>
              {t("caseStudies")}
            </NavigationLink>

            <NavigationLink
              href={`/${locale}/kontakt`}
              className={cn(
                "text-lg font-medium",
                pathname?.startsWith(`/${locale}/kontakt`)
                  ? "text-blue-600 font-semibold"
                  : "text-slate-900 hover:text-blue-600",
              )}
              onClick={() => setIsMobileMenuOpen(false)}>
              {t("contact")}
            </NavigationLink>

            <div className="flex items-center justify-center">
              <Link href="/kontakt">
                <StarGradientButton>{t("freeConsultation")}</StarGradientButton>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
