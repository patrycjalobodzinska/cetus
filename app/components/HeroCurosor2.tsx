'use client';

import React from 'react';
import StatsPanel from './StatsPanel';
import NavbarCurosora from './NavbarCurosora';
import CardSwap, { Card } from './CardSwap';
import { BackgroundRippleEffect } from './ui/background-ripple-effect';
import Float from './Float';
import StarGradientButton from './ui/gradientBackground';

export default function HeroCurosora() {

  return (
    <section className="relative  overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden bg-white">
    <div className="absolute inset-0 z-30">  <BackgroundRippleEffect cols={36} /></div> {/* Tło z napisem CETUSPRO */}
      {/* Tło z napisem CETUSPRO */}




      {/* --- MAIN HERO CONTENT --- */}
      <div className=" mt-26 w-full  container mx-auto lg:pt-16 pb-12 flex flex-col lg:flex-row items-center relative overflow-x-hidden ">

        {/* Background Text Layer (CETUSPRO) */}


        {/* Left Column: Text */}
        <div className="w-full flex flex-col z-30 lg:pt-10 xl:pt-0 lg:min-w-[650px] relative px-4 lg:pl-10 lg:pr-0">

          {/* Decorative Circuit Line Left */}
          <div className="absolute -left-6 lg:left-0 -top-10 lg:top-0 bottom-0 w-10 pointer-events-none ">
             <svg className="absolute top-10 left-0 w-32 h-80" viewBox="0 0 100 250" fill="none">
                <defs>
                  <linearGradient id="gradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path d="M 20 0 V 100 L 40 130 H 60" stroke="url(#gradientLeft)" strokeWidth="2" className="opacity-100" />
                <rect x="58" y="134" width="7" height="7" transform="rotate(45 70 130)" fill="url(#gradientLeft)" opacity="1" />
             </svg>
          </div>

          <div className="relative   lg:min-h-[280px] xl:min-h-[320px]">
        <h1 className="text-4xl lg:text-7xl font-bold tracking-tighter text-slate-900 leading-[0.9]">
        <span className=" text-6xl lg:hidden   font-black text-gray-200 opacity-80 ">
          CETUSPRO
        </span>     <div className="flex items-center gap-4 min-h-[1.2em]">
                 <span className="f">We create</span>
               </div>
               <span className="block text-slate-900 min-h-[1.2em]">
                 <span className="font-">modern <span className="text-blue-600">software</span></span>
               </span>
               <span className="block text-slate-900 min-h-[1.2em] pl-11 lg:pl-12">
                 <span className="font-">that helps</span>
               </span>
               <span className="block text-slate-900 min-h-[1.2em]">
                 <span className="">companies grow</span>
               </span>
             </h1>
          </div>

          <div className="mt-8 space-y-6 hidden lg:block max-w-lg relative">
            <h2 className="text-lg lg:text-xl text-slate-600 leading-relaxed pl-2">
              <span className="font-bold text-blue-600">#1 Secure AI Infrastructure Layer</span> build on<br/>
              Decentralized Physical Infrastructure Network
            </h2>

            <div className="flex items-center gap-8 pt-4">
                <div className="relative group">

                  <button className="relative flex items-center gap-3 px-8 py-3 rounded-lg border border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-300 z-20 bg-white">
                    <span>Zobacz realizacje</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-y-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </button>
                </div>

                {/* Decorative Line Right of Button */}
                <div className=" h-12 w-32 relative -mt-6">
                    <svg className="absolute top-4 left-0 w-full h-full" viewBox="0 0 100 50" fill="none">
                        <defs>
                          <linearGradient id="gradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.95" />
                            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
                          </linearGradient>
                        </defs>
                         <path d="M 0 40 H 50 L 80 10" stroke="url(#gradientRight)" strokeWidth="2" className="opacity-100" />
                         <rect x="77" y="6"  width="7" height="7" transform="rotate(4 80 10)" fill="url(#gradientRight)" opacity="1" />
                    </svg>
                </div>
            </div>
          </div>

        </div>
    {/* Right Column: 3 Rotated Images */}
        <div className="w-full ml-20 flex items-center justify-center lg:justify-end relative z-30 mt-8 lg:mt-0 px-4">
          <div className="relative  w-full h-[500px]">
            {/* Pierwsze zdjęcie (z tyłu, najbardziej przekręcone w lewo) */}
            <div className="absolute top-0 left-0 w-[250px] h-[350px] rounded-xl overflow-hidden shadow-2xl transform  z-30">
              <img
                src="/career_2.jpg"
                alt="Image 1"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Drugie zdjęcie (w środku, lekko przekręcone w prawo) */}
            <div className="absolute top-0 left-40  w-[250px] h-[350px] rounded-xl overflow-hidden shadow-2xl transform rotate-20 z-20">
              <img
                src="/career_2.jpg"
                alt="Image 2"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Trzecie zdjęcie (z przodu, najbardziej przekręcone w prawo) */}

          </div>
        </div>

         <div className="mt-8 space-y-2 lg:hidden max-w-lg relative w-full px-4">
            <h2 className="text-lg lg:text-xl text-slate-600 leading-relaxed">
              <span className="font-bold text-blue-600">#1 Secure AI Infrastructure Layer</span> <br/>
              Decentralized Physical Infrastructure Network
            </h2>


                  <StarGradientButton >
                    <span>Explore</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-y-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </StarGradientButton>

          </div>

      </div>




</section>
  );
}
