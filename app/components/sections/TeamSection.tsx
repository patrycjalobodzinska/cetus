'use client';

import { urlFor } from '@/sanity/lib/image';
import PolygonCard from '@/app/components/PolygonCard';
import type { TeamMember } from '@/lib/sanity/types';

interface TeamSectionProps {
  members: TeamMember[];
  loading: boolean;
}

export default function TeamSection({ members, loading }: TeamSectionProps) {
  if (loading) {
    return (
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">Ładowanie zespołu...</p>
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) {
    return null;
  }

  return (
    <section className="py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            Nasz zespół
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Poznaj ludzi, którzy tworzą naszą firmę i codziennie pracują nad najlepszymi rozwiązaniami dla naszych klientów.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <PolygonCard
              key={member._id}
              imageUrl={urlFor(member.image).width(400).height(400).url()}
              title={`${member.firstName} ${member.lastName}`}
              description={member.position}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

