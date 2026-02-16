'use client';

import type { HowWeHelpSectionProps } from '@/types/sections';

export default function HowWeHelpSection({ title, services, icons, className = '' }: HowWeHelpSectionProps) {
  return (
    <section className={`pb-24 relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2
            className="heading-1 text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = icons?.[index];
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-600/30"
              >
                <div className="relative p-12">
                  <div className="flex items-center gap-4 mb-6">
                    {Icon && (
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <h3 className="heading-2 text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-8 h-1 w-20 bg-blue-600 rounded-full group-hover:w-32 transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
