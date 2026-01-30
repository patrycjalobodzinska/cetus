'use client';

import React from 'react';

export default function AboutUs() {
  return (
    <section className="relative w-full min-h-scree py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative">

          {/* SVG Line - Left Side */}
          <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 100 800" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradientLine" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* Main vertical line with slight curve */}
              <path
                d="M 20 0 Q 25 200 20 400 Q 15 600 20 800"
                stroke="url(#gradientLine)"
                strokeWidth="2"
                className="opacity-100"
                strokeLinecap="round"
              />
              {/* Diamond marker at the end */}
              <rect
                x="17"
                y="795"
                width="6"
                height="6"
                transform="rotate(45 20 798)"
                fill="url(#gradientLine)"
                opacity="1"
              />
            </svg>
          </div>

          {/* Header */}
          <div className="pl-12 lg:pl-20">
            <h2 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tight">
              POZNAJ NAS
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}
