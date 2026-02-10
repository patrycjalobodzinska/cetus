'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import type { PolygonAccordionProps } from '@/types/components';

const POLYGON_CLIP_PATH = "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)";

export default function PolygonAccordion({
  title,
  children,
  isOpen,
  onToggle,
  className = '',
  icon,
  variant = 'default',
  isActive = false,
}: PolygonAccordionProps) {
  if (variant === 'button') {
    return (
      <button
        style={{
          clipPath: POLYGON_CLIP_PATH
        }}
        onClick={onToggle}
        className={`w-full text-left cursor-pointer p-0.5 rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
          isActive
            ? 'bg-blue-600 text-white shadow-xl scale-105'
            : 'bg-gray-100 text-slate-900 hover:bg-blue-100'
        } ${className}`}
      >
        <div
          style={{
            clipPath: POLYGON_CLIP_PATH
          }}
          className={`flex p-6 items-start space-x-4 ${
            isActive ? 'bg-blue-600' : 'bg-white'
          }`}
        >
          {icon && (
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isActive ? 'bg-white/20' : 'bg-blue-600/10'
            }`}>
              {icon}
            </div>
          )}
          <div className="flex-1 text-left">
            <h3 className={`text-lg font-bold mb-2 ${isActive ? 'text-white' : 'text-slate-900'}`}>
              {title}
            </h3>
            {children && (
              <div className={isActive ? 'text-white/90' : 'text-slate-600'}>
                {children}
              </div>
            )}
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`group relative ${className}`}
      style={{
        clipPath: POLYGON_CLIP_PATH
      }}
    >
      {/* Outer border with gradient */}
      <div
        className="p-px rounded-md transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.5) 0%, rgba(147, 197, 253, 0.5) 100%)",
          clipPath: POLYGON_CLIP_PATH
        }}
      >
        {/* Inner content */}
        <div
          className="bg-white rounded-md transition-all duration-300"
          style={{
            clipPath: POLYGON_CLIP_PATH
          }}
        >
          <button
            onClick={onToggle}
            className="w-full text-left cursor-pointer p-4 px-8 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:bg-blue-50"
            aria-expanded={isOpen}
          >
            <h3 className="text-lg md:text-xl font-bold text-slate-900 pr-8">
              {title}
            </h3>
            <div className="shrink-0 cursor-pointer">
              <Plus
                className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              />
            </div>
          </button>

          {/* Accordion content */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-8 pb-8 pt-0">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
