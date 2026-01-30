import React from 'react';

interface DecorativeImageProps {
  src: string;
  alt: string;
  overlay?: {
    value: string;
    label?: string;
    subLabel?: string;
    icon?: React.ReactNode;
  };
}

export default function DecorativeImage({ src, alt, overlay }: DecorativeImageProps) {
  // Generate unique IDs for SVG gradients and filters to avoid conflicts
  const uniqueId = React.useId();
  const gradientId = `neonGradient-${uniqueId}`;
  const filterId = `softNeon-${uniqueId}`;

  return (
    <div className="relative">
      {/* Bottom right SVG decoration */}
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="absolute rotate-180 -bottom-3 right-0"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M98 2 L70 20 L10 20 L10 98 "
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          filter={`url(#${filterId})`}
          strokeLinecap="round"
        />
        <rect x="92" y="0" width="8" height="8" fill="#3b82f6" filter={`url(#${filterId})`} />
        <rect x="27" y="82" width="8" height="8" fill="#3b82f6" transform="rotate(45 10 65)" filter={`url(#${filterId})`} />
      </svg>

      {/* Top left SVG decoration */}
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="absolute -top-3 left-0"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${gradientId}-2`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <filter id={`${filterId}-2`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M98 2 L70 20 L10 20 L10 98 "
          fill="none"
          stroke={`url(#${gradientId}-2)`}
          strokeWidth="2"
          filter={`url(#${filterId}-2)`}
          strokeLinecap="round"
        />
        <rect x="92" y="0" width="8" height="8" fill="#3b82f6" filter={`url(#${filterId}-2)`} />
        <rect x="27" y="82" width="8" height="8" fill="#3b82f6" transform="rotate(45 10 65)" filter={`url(#${filterId}-2)`} />
      </svg>

      {/* Image container */}
      <div className="relative p-5 rounded-md overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
        />

        {/* Optional overlay (for statistics) */}
        {overlay && (
          <div className="absolute bottom-6 left-6 bg-white rounded-2xl p-6 shadow-xl max-w-[200px]">
            <div className="flex items-center gap-4">
              {overlay.icon && (
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  {overlay.icon}
                </div>
              )}
              <div>
                <div className="text-3xl font-bold text-slate-900 leading-none">
                  {overlay.value}
                </div>
                {overlay.label && (
                  <div className="text-sm font-semibold text-slate-900 mt-1">
                    {overlay.label}
                  </div>
                )}
                {overlay.subLabel && (
                  <div className="text-xs text-slate-600">
                    {overlay.subLabel}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
