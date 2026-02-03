'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import StarGradientButton from '@/app/components/ui/gradientBackground';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Aplikacje webowe',
    'Aplikacje mobilne',
    'UI/UX Design',
    'AI i automatyzacja',
    'Cybersecurity',
    'Transformacja technologiczna',
    'Akademia i szkolenia',
    'Outsourcing programistów',
    'Cetus Venture Capital',
    'Inne'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form data:', formData);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: ''
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
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

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
                  style={{ fontFamily: "var(--font-michroma)" }}
                >
                  Dane kontaktowe
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Wybierz najwygodniejszą dla Ciebie formę kontaktu. Jesteśmy dostępni od poniedziałku do piątku w godzinach 9:00 - 17:00.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-600/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
                    <a
                      href="mailto:kontakt@cetuspro.pl"
                      className="text-blue-600 hover:opacity-70 transition-opacity font-semibold"
                    >
                      kontakt@cetuspro.pl
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Odpowiadamy w ciągu 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-600/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Telefon</h3>
                    <a
                      href="tel:+48123456789"
                      className="text-blue-600 hover:opacity-70 transition-opacity font-semibold"
                    >
                      +48 123 456 789
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Pn-Pt 9:00 - 17:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-600/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Adres</h3>
                    <p className="text-slate-600">
                      ul. Przykładowa 123<br />
                      00-001 Warszawa<br />
                      Polska
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Bezpłatna konsultacja</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  Umów się na bezpłatną 30-minutową konsultację, podczas której omówimy Twoje potrzeby i zaproponujemy najlepsze rozwiązania.
                </p>
                <a
                  href="mailto:kontakt@cetuspro.pl?subject=Bezpłatna konsultacja"
                  className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all"
                >
                  <span>Umów konsultację</span>
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h2
                className="text-3xl font-bold text-slate-900 mb-6"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                Wyślij wiadomość
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800 text-sm">
                    Dziękujemy za wiadomość! Skontaktujemy się z Tobą w ciągu 24 godzin.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-800 text-sm">
                    Wystąpił błąd. Spróbuj ponownie lub napisz bezpośrednio na kontakt@cetuspro.pl
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                      placeholder="Jan Kowalski"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                      placeholder="jan@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                      placeholder="+48 123 456 789"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
                      Firma
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                      placeholder="Nazwa firmy"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-slate-900 mb-2">
                    Interesująca usługa
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                  >
                    <option value="">Wybierz usługę</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none"
                    placeholder="Opisz swój projekt lub zadaj pytanie..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  <StarGradientButton>
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          Wyślij wiadomość
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </span>
                  </StarGradientButton>
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Wysyłając formularz akceptujesz naszą politykę prywatności
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Często zadawane pytania
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Jak szybko otrzymam odpowiedź?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Odpowiadamy na wszystkie zapytania w ciągu 24 godzin w dni robocze. W pilnych sprawach polecamy kontakt telefoniczny.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Czy konsultacja jest płatna?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pierwsza 30-minutowa konsultacja jest całkowicie bezpłatna. Omówimy Twoje potrzeby i zaproponujemy najlepsze rozwiązania.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Czy pracujecie zdalnie?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tak, pracujemy zarówno zdalnie, jak i stacjonarnie. Dostosowujemy się do preferencji i potrzeb naszych klientów.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Jak wygląda proces współpracy?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Po konsultacji przygotowujemy ofertę dostosowaną do Twoich potrzeb. Po jej akceptacji rozpoczynamy realizację projektu z regularnym raportowaniem postępów.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
