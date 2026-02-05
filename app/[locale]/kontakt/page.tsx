'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import PolygonAccordion from '@/app/components/PolygonAccordion';
import { useLocale } from 'next-intl';

interface FAQ {
  _id: string;
  title: string;
  description: string;
  order?: number;
}

export default function ContactPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqsLoading, setFaqsLoading] = useState(true);
  const [openFaqs, setOpenFaqs] = useState<Set<string>>(new Set());
  const locale = useLocale();

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const query = `*[_type == "faq"] | order(order asc) {
          _id,
          "title": coalesce(title[$locale], title.pl),
          "description": coalesce(description[$locale], description.pl),
          order
        }`;
        const data = await client.fetch<FAQ[]>(query, { locale });
        setFaqs(data);
      } catch (error) {
        console.error('Błąd podczas pobierania FAQ:', error);
      } finally {
        setFaqsLoading(false);
      }
    }
    fetchFAQs();
  }, [locale]);

  const toggleFaq = (faqId: string) => {
    setOpenFaqs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen ">
      <section className="relative overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
        <div className="mt-36 w-full justify-center container mx-auto pb-12 flex flex-col items-center relative overflow-x-hidden px-4">
          <div className="flex flex-col z-30 items-center justify-center relative max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl lg:text-7xl tracking-tighter text-slate-900 leading-[0.9] font-bold mb-6"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Skontaktuj się <span className="text-blue-600">z nami</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Masz pytania? Chcesz omówić swój projekt? Napisz do nas lub zadzwoń - odpowiemy w ciągu 24 godzin.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 ite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
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

      {/* FAQ Section with Polygon Shape and Accordion */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Najczęściej zadawane pytania
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Odpowiedzi na najczęstsze pytania dotyczące naszej oferty i procesu współpracy
            </p>
          </div>

          {faqsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">Ładowanie FAQ...</p>
            </div>
          ) : faqs.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq) => {
                if (!faq.title && !faq.description) return null;
                const isOpen = openFaqs.has(faq._id);
                return (
                  <PolygonAccordion
                    key={faq._id}
                    title={faq.title || ''}
                    isOpen={isOpen}
                    onToggle={() => toggleFaq(faq._id)}
                  >
                    {faq.description && (
                      <p className="text-slate-600 leading-relaxed">
                        {faq.description}
                      </p>
                    )}
                  </PolygonAccordion>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Brak pytań do wyświetlenia.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
