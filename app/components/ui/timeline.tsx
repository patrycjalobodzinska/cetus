"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";

import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const updateHeight = () => {
      const rect = el.getBoundingClientRect();
      setHeight(rect.height);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-10"
      ref={containerRef}
    >

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="lg:h-8 h-6 w-6 absolute left-5 md:left-4 lg:w-8 rotate-45 bg-blue-100  flex items-center justify-center">
                <div className="lg:h-4 lg:w-4 h-2 w-2  bg-white  border border-neutral-300 p-1" />
              </div>
              <h3    style={{ fontFamily: "var(--font-michroma)" }}
              className="hidden md:block heading-2 md:pl-20 text-slate-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3   style={{ fontFamily: "var(--font-michroma)" }} className="md:hidden block text-2xl mb-4 text-left font-bold text-slate-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] z-0 bg-linear-to-b from-transparent via-neutral-200 to-transparent dark:via-neutral-600 mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] z-10 bg-linear-to-t from-blue-600 via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
