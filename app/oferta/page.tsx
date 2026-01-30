'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import PolygonCard from '@/app/components/PolygonCard';
import StarGradientButton from '@/app/components/ui/gradientBackground';

interface OfferProject {
  _id?: string;
  title: string;
  description: string;
  image: any;
  order: number;
  slug?: {
    current: string;
  };
  link?: string;
}

export default function OfferPage() {
  const [projects, setProjects] = useState<OfferProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const query = `*[_type == "offer"][0] {
          projects[] | order(order asc) {
            _id,
            title,
            description,
            image,
            order,
            slug,
            link
          }
        }`;
        const data = await client.fetch<{ projects?: OfferProject[] }>(query);
        if (data?.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania projektów:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Nasza <span className="text-blue-600">oferta</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Kompleksowe rozwiązania technologiczne dostosowane do potrzeb Twojego biznesu
            </p>
          </div>
        </div>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">Ładowanie ofert...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="lg:grid grid-cols-3 items-center justify-center gap-6">
              {projects.map((project) => {
                const href = project.link || (project.slug?.current ? `/oferta/${project.slug.current}` : undefined);
                return (
                  <PolygonCard className='w-full h-full'
                    key={project._id || project.title}
                    imageUrl={urlFor(project.image).width(400).height(400).url()}
                    title={project.title}
                    description={project.description}
                    href={"/oferta/"+href}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Brak ofert do wyświetlenia.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24  border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            Chcesz dowiedzieć się więcej?
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Skontaktuj się z nami i omówmy, jak możemy pomóc w rozwoju Twojego biznesu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <StarGradientButton>
                Skontaktuj się z nami
              </StarGradientButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
