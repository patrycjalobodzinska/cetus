import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StarGradientButton from '../components/ui/gradientBackground';

interface CaseStudy {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  category?: string;
  description?: string;
  image?: any;
}

export default async function CaseStudiesPage() {
  const caseStudies = await client.fetch<CaseStudy[]>(`*[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    image
  }`);

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
        <div className="mt-36 w-full justify-center container mx-auto pb-12 flex flex-col items-center relative overflow-x-hidden px-4">
          <div className="flex flex-col z-30 items-center justify-center relative">
            <div className="relative">
              <h1
                className="text-4xl lg:text-7xl tracking-tighter text-slate-900 leading-[0.9] font-bold text-center"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                <span>Nasze </span>

                <span className="text-blue-600">realizacje</span>
              </h1>
            </div>

            <div className="space-y-2 items-center justify-center flex flex-col max-w-lg relative w-full px-4 mt-8">
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed text-center">
                Zobacz, jak pomogliśmy naszym klientom osiągnąć sukces dzięki nowoczesnym rozwiązaniom technologicznym.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {caseStudies && caseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => {
                if (!study.slug?.current) return null;

                return (
                  <Link
                    key={study._id}
                    href={`/case-studies/${study.slug.current}`}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600/30 overflow-hidden"
                  >
                    {study.image && (
                      <div className="h-64 overflow-hidden">
                        <img
                          src={urlFor(study.image).width(600).height(400).url()}
                          alt={study.title || 'Case Study'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {study.category && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-600 rounded-full text-xs font-medium mb-4">
                          {study.category}
                        </div>
                      )}
                      {study.title && (
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {study.title}
                        </h3>
                      )}
                      {study.description && (
                        <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                          {study.description}
                        </p>
                      )}
                      <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        Zobacz szczegóły
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">Brak case studies do wyświetlenia.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            Chcesz stworzyć podobne rozwiązanie?
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Skontaktuj się z nami i opowiedz o swoich potrzebach – stworzymy rozwiązanie dopasowane do Twojego biznesu.
          </p>
          <Link href="/kontakt">
            <StarGradientButton>
              Skontaktuj się z nami
            </StarGradientButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
