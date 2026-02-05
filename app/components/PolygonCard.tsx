import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

interface PolygonCardProps {
  imageUrl?: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export default function PolygonCard({ imageUrl, title, description, href, className = '', fallbackIcon }: PolygonCardProps) {
  const clipPath = "polygon(17% 0, 100% 0, 100% 89%, 83% 100%, 0 100%, 0 11%)";

  const cardContent = (
    <>
      {/* Zewnętrzny kontener z efektem "obramowania" */}
      <div
        className={`p-0.5 bg-gray-200 rounded-tl-lg rounded-br-lg h-[310px] w-[240px] group-hover:bg-blue-200 transition-colors duration-300 ${className}`}
        style={{
          clipPath: clipPath
        }}
      >
        {/* Kontener wewnętrzny na zawartość karty */}
        <div
          className="w-full rounded-tl-lg rounded-br-lg p-2 bg-white h-full flex flex-col overflow-hidden group-hover:shadow-lg transition-shadow duration-300"
          style={{
            clipPath: clipPath
          }}
        >
          {/* Sekcja obrazu */}
          <div
            style={{
              clipPath: clipPath
            }}
            className="w-full h-full overflow-hidden flex flex-col"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-top object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                {fallbackIcon || <User className="w-24 h-24 text-gray-400" />}
              </div>
            )}
            <div className="p-4 min-h-[100px] flex flex-col items-start text-left">
              <h4 className="text-gray-900 text-md font-semibold mb-1 truncate w-full group-hover:text-blue-600 transition-colors duration-300">
                {title}
              </h4>
              <p className="text-gray-400 text-sm overflow-hidden text-ellipsis line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group block">
        {cardContent}
      </Link>
    );
  }

  return <div className="group">{cardContent}</div>;
}
