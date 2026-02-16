'use client';

import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactInfoSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="heading-2 text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Dane kontaktowe
            </h2>
            <p className="text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              Wybierz najwygodniejszą dla Ciebie formę kontaktu. Jesteśmy dostępni od poniedziałku do piątku w godzinach 9:00 - 17:00.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-600/30 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shrink-0">
                <Mail className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
              <a
                href="mailto:kontakt@cetuspro.pl"
                className="text-blue-600 hover:opacity-70 transition-opacity font-semibold mb-2"
              >
                kontakt@cetuspro.pl
              </a>
              <p className="text-sm text-slate-500">Odpowiadamy w ciągu 24h</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-600/30 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shrink-0">
                <Phone className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Telefon</h3>
              <a
                href="tel:+48123456789"
                className="text-blue-600 hover:opacity-70 transition-opacity font-semibold mb-2"
              >
                +48 123 456 789
              </a>
              <p className="text-sm text-slate-500">Pn-Pt 9:00 - 17:00</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-600/30 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shrink-0">
                <MapPin className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Adres</h3>
              <p className="text-slate-600 text-sm">
                ul. Adama Matuszczaka 14<br />
                35-083 Rzeszów<br />
                Polska
              </p>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-600 to-blue-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Bezpłatna konsultacja</h3>
            <p className="text-white/90 leading-relaxed mb-6 max-w-2xl mx-auto">
              Umów się na bezpłatną 30-minutową konsultację, podczas której omówimy Twoje potrzeby i zaproponujemy najlepsze rozwiązania.
            </p>
            <a
              href="mailto:kontakt@cetuspro.pl?subject=Bezpłatna konsultacja"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all"
            >
              <span>Umów konsultację</span>
              <Send className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

