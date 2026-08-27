"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQ {
  _id: string;
  title?: string;
  description?: string;
}

/**
 * Lista pytań na włoskowych liniach - bez kafli i bez ściętych narożników.
 * Otwarte jest jedno pytanie naraz; wysokość odpowiedzi animujemy przez
 * grid-template-rows, bo to jedyny sposób animowania „do wysokości treści"
 * bez mierzenia elementu w JS.
 */
export default function FAQList({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border-t border-slate-200">
      {faqs.map((faq) => {
        const open = openId === faq._id;
        return (
          <div key={faq._id} className="border-b border-slate-200">
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : faq._id)}
                aria-expanded={open}
                className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
              >
                <span className="text-base font-semibold leading-snug text-slate-900 transition-colors duration-200 ease-out group-hover:text-blue-600 sm:text-lg">
                  {faq.title}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-[rotate,translate,color,border-color] duration-300 ease-out group-hover:border-blue-200 group-hover:text-blue-600"
                  style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-10 text-base leading-relaxed text-slate-600">
                  {faq.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
