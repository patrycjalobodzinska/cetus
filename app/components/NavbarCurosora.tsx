'use client';

import React, { useState, useEffect } from 'react';
import StarBorder from './StarBorder';
import StarGradientButton from './ui/gradientBackground';
import NavigationLink from './NavigationLink';

export default function NavbarCurosora() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`sticky  top-0 z-50 w-full -mb-34  flex justify-center px-4 py-6 transition-all max-w-[1300px] mx-auto duration-700 ease-out ${
'opacity-100 translate-y-0'
    }`}>
      {/* Mobile Header - Logo and Burger */}
      <div className="lg:hidden w-full max-w-[1300px]">
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-md border border-gray-100/50 shadow-sm rounded-md px-4 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <div >
            <NavigationLink className="w-32 h-12 rounded-lg flex cursor-pointer items-center justify-center overflow-hidden" href="/">     <img src="/logocetus.png" alt="Logo" className="w-full h-full object-contain" /></NavigationLink>
            </div>
          </div>

          {/* Burger Button */}
          <button
            className="p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Navbar Container (Desktop) */}
      <div className="hidden lg:flex flex-row gap-2 w-full max-w-[1300px]">

        {/* --- LEFT SECTION (LOGO) --- */}
        <div className="relative transform -skew-x-12 bg-white/60 backdrop-blur-md border border-emerald-100/50 shadow-sm  rounded-sm overflow-hidden">
           <div className="transform skew-x-12 w-full h-full flex items-center px-5 py-1">
              <div className="flex items-center gap-3">
                 <NavigationLink href="/" className="w-full h-16 rounded-md flex items-center justify-center overflow-hidden">
                    <img src="/logocetus.png" alt="Logo" className="w-full h-full object-contain" />
                 </NavigationLink>


              </div>
           </div>
        </div>

        {/* --- RIGHT SECTION (NAVIGATION WITH STAR BORDER) --- */}
        <div className="flex-1 items-center justify-center transform -skew-x-12 h-[74px] bg-white/60 backdrop-blur-md border border-emerald-100/50 shadow-sm rounded-sm  overflow-hidden">

                {/* Content Container (Un-skewed) */}
                <div className="w-full h-full flex items-center justify-between px-8 transform skew-x-12">
                    {/* Links */}
                    <nav className="flex items-center gap-6 text-[15px] font-medium text-slate-700">
                        <NavigationLink href="/" className="flex items-center gap-2 hover:text-blue-600 transition-colors group">
                         Strona główna
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </NavigationLink>
                        <span className="text-slate-300 text-xs">/</span>

                        <NavigationLink href="/o-nas" className="hover:text-blue-600 transition-colors">O nas</NavigationLink>
                        <span className="text-slate-300 text-xs">/</span>

                        <NavigationLink href="/oferta" className="hover:text-blue-600 transition-colors">Usługi</NavigationLink>
                        <span className="text-slate-300 text-xs">/</span>

                        <NavigationLink href="/case-studies" className="hover:text-blue-600 transition-colors" >Realizacje</NavigationLink>
                        <span className="text-slate-300 text-xs">/</span>

                        <NavigationLink href="/kontakt" className="hover:text-blue-600 transition-colors">Kontakt</NavigationLink>
                        <span className="text-slate-300 text-xs">/</span>


                    </nav>

                    {/* Action Button with StarBorder */}
                    <div className="relative overflow-visible">

           <StarGradientButton>Darmowa konsultacja</StarGradientButton>         </div>
                </div>

        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className=" shadow-2xl h-screen inset-0 top-0 fixed  flex flex-col gap-6 lg:hidden mt-24 border backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
           <nav className=" shadow-2xl h-[380px] bg-white inset-0 top-0 fixed p-6 flex flex-col gap-6 mt-2 lg:hidden border mx-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <NavigationLink
            href="/"
            className="text-lg font-medium hover:text-blue-600 text-slate-900 border-b border-gray-100 pb-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Strona główna
          </NavigationLink>

          <NavigationLink
            href="/o-nas"
            className="text-lg hover:text-blue-600 font-medium text-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            O nas
          </NavigationLink>

          <NavigationLink
            href="/oferta"
            className="text-lg hover:text-blue-600 font-medium text-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Usługi
          </NavigationLink>

          <NavigationLink
            href="/case-studies"
            className="hover:text-blue-600 transition-colors text-lg font-medium text-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Realizacje
          </NavigationLink>

          <NavigationLink
            href="/kontakt"
            className="hover:text-blue-600 text-lg font-medium text-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kontakt
          </NavigationLink>



                    {/* Action Button with StarBorder */}
                    <div className="flex items-center justify-center">

           <StarGradientButton>Darmowa konsultacja</StarGradientButton>         </div>
</nav>
            </div>
      )}
    </div>
  );
}
