"use client";

import React from "react";

type MarqueeImage = {
  src: string;
  alt: string;
  name?: string;
  description?: string;
};

type TeamMarqueeProps = {
  images: MarqueeImage[];
  title?: string;
  rows?: number;
};

export default function TeamMarquee({
  images,
  title,
  rows = 3,
}: TeamMarqueeProps) {
  if (!images || images.length === 0) return null;

  const chunkSize = Math.ceil(images.length / rows);
  const rowImages: MarqueeImage[][] = [];
  for (let r = 0; r < rows; r++) {
    const chunk = images.slice(r * chunkSize, (r + 1) * chunkSize);
    if (chunk.length > 0) rowImages.push(chunk);
  }

  while (rowImages.length < rows) rowImages.push(images);

  return (
    <div className="w-full py-8 overflow-hidden">
      {title && (
        <h2
          style={{ fontFamily: "var(--font-michroma)" }}
          className="text-center mb-8 px-4 text-2xl font-black tracking-tight text-gray-900"
        >
          {title}
        </h2>
      )}
      <div
        className="flex flex-col gap-4"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        {rowImages.map((row, idx) => {
          const duration = 30 + idx * 8;
          const reverse = idx % 2 === 1;
          const doubled = [...row, ...row];
          return (
            <div key={idx} className="relative overflow-hidden">
              <div
                className="flex gap-4 w-max"
                style={{
                  animation: `team-marquee-${reverse ? "rev" : "fwd"} ${duration}s linear infinite`,
                }}
              >
                {doubled.map((img, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-40 h-40 rounded-xl overflow-hidden bg-gray-200 relative"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    {(img.name || img.description) && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        {img.name && (
                          <p className="text-white text-xs font-semibold truncate">
                            {img.name}
                          </p>
                        )}
                        {img.description && (
                          <p className="text-white/80 text-[10px] truncate">
                            {img.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes team-marquee-fwd {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes team-marquee-rev {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
