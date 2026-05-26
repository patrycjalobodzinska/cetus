'use client';

import { useState } from 'react';
import PolygonAccordion from '@/app/components/PolygonAccordion';

interface FAQ {
  _id: string;
  title?: string;
  description?: string;
}

export default function FAQList({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <PolygonAccordion
          key={faq._id}
          title={faq.title || ''}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <p className="text-slate-600 leading-relaxed">
            {faq.description || ''}
          </p>
        </PolygonAccordion>
      ))}
    </div>
  );
}
