"use client";

import { Timeline } from "@/app/components/ui/timeline";
import { urlFor } from "@/sanity/lib/image";
import type { HistoryItem } from "@/lib/sanity/types";

interface HistoryTimelineSectionProps {
  items: HistoryItem[];
  loading: boolean;
}

export default function HistoryTimelineSection({ items, loading }: HistoryTimelineSectionProps) {
  const timelineData = items.map((item) => {
    const imageUrl = item.image ? urlFor(item.image).width(1200).height(800).url() : undefined;

    return {
      title: item.year || item.title,
      content: (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">
            {item.year}
          </p>
          <h3 className="heading-3 text-slate-900 mb-3">
            {item.title}
          </h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            {item.description}
          </p>
          {imageUrl && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100">
              <img
                src={imageUrl}
                alt={item.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            className="heading-1 lg:mt-0 mt-12 text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            Nasza historia
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Zobacz kluczowe momenty naszej podróży i osiągnięcia, które ukształtowały naszą firmę.
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">Ładowanie historii...</p>
          </div>
        ) : timelineData.length > 0 ? (
          <div className="relative w-full overflow-visible">
            <Timeline data={timelineData} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">Brak danych do wyświetlenia.</p>
          </div>
        )}
      </div>
    </section>
  );
}
