'use client';

import React, { useState, useEffect, useRef } from 'react';
import { client } from '@/sanity/lib/client';



interface Stat {
  title: string;
  count: number;
  order: number;
}

export default function StatsPanel() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const query = `*[_type == "stats"] | order(order asc) {
          title,
          count,
          order
        }`;
        const data = await client.fetch<Stat[]>(query);
        setStats(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych stats:', error);
        // Fallback do domyślnych wartości w przypadku błędu
        setStats([
          { title: "Zrealizowanych projektów", count: 50, order: 1 },
          { title: "Zadowolonych klientów", count: 30, order: 2 },
          { title: "Ekspertów w zespole", count: 15, order: 3 },
          { title: "Lat doświadczenia", count: 5, order: 4 }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);


  if (loading) {
    return (
      <div className="relative w-full mx-auto lg:mb-10 px-4 overflow-visible">
        <div className="relative max-w-6xl mx-auto flex justify-center items-center py-12 overflow-visible">
          <div className="text-center">Ładowanie statystyk...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto lg:mb-10 px-4 overflow-visible">
      <div className="relative max-w-6xl mx-auto flex justify-center items-center py-12 overflow-visible">



        {/* Right Top Line - pozycjonowana względem panelu */}

        <div
          className="relative w-full mx-6 md:mx-16 max-w-5xl min-h-40 py-6 md:h-28 bg-gray-50 border border-gray-100 text-gray-900 flex flex-col md:flex-row items-center justify-around sm:px-12 px-6 md:px-16 drop-shadow-xl z-10 stats-polygon"
          style={{
            filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))"
          }}
        >
          <div className="relative w-full md:grid-cols-4 grid  grid-cols-2 md:py-4 gap-4 md:gap-8 z-10">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col justify-between text-center min-w-[120px]">
                <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium tracking-wide uppercase">
                  {stat.title}
                </div>
                <div className="text-2xl md:text-5xl font-medium text-gray-900 tracking-wider">
                  <div>
                    <span aria-hidden="true">{stat.count}+</span>
                    <span className="sr-only">Ponad {stat.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Decorative Circuit Lines (SVG) - 2 osobne absolutne kontenery POZA panelem --- */}
        {/* Left Bottom Line - przyklejona do lewego dolnego rogu polygonu */}
        <div className="absolute hidden md:block left-0 bottom-0 w-[400px] h-[80px] pointer-events-none z-0" style={{ left: '0px', top: 'calc(5px)' }}>
          <svg className="w-full h-full" viewBox="0 0 300 70" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
              {/* Delikatniejszy blur (zredukowany z 3 na 1.5) */}
              <filter id="softNeon" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M10 65 L35 65 L60 20 L300 20 L400 20"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              filter="url(#softNeon)"
              strokeLinecap="round"
            />
            <rect x="7" y="62" width="6" height="6" fill="#3b82f6" transform="rotate(45 10 65)" filter="url(#softNeon)" />
          </svg>
        </div>

        {/* Prawa Górna Linia */}
        <div className="absolute hidden md:block w-[400px] h-[80px] pointer-events-none z-0" style={{ right: '0px', bottom: 'calc(20px)' }}>
          <svg className="w-full h-full" viewBox="0 0 300 70" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M10 65 L240 65 L265 20 L290 20 L294 20"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              filter="url(#softNeon)"
              strokeLinecap="round"
            />
            <rect x="287" y="17" width="6" height="6" fill="#93c5fd" transform="rotate(45 290 20)" filter="url(#softNeon)" />
          </svg>
        </div>

      </div>
    </div>
  );
}
