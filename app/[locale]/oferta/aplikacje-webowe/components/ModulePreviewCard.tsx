'use client';

import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getIcon } from '../utils/moduleIcons';
import { renderModuleMockup } from '../utils/moduleMockups';

interface ModulePreviewCardProps {
  activeModule: number;
  modules: Array<{
    icon: string;
    title: string;
    items: string[];
  }>;
}

export default function ModulePreviewCard({ activeModule, modules }: ModulePreviewCardProps) {
  const t = useTranslations('webApps.modules');
  const Icon = getIcon(modules[activeModule]?.icon);
  const currentModule = modules[activeModule];

  return (
    <div
      style={{
        background: "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
      }}
      className="rounded-md shadow-md shadow-blue-300 p-0.5"
    >
      <div className="bg-white rounded-md p-4 md:p-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {currentModule?.title}
            </h3>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 bg-white/5 rounded-lg flex items-center px-3">
                  <div className="w-3 h-3 text-gray-500 mr-2">🔒</div>
                  <div className="h-2 bg-white/10 rounded w-32"></div>
                </div>
              </div>
            </div>

            {renderModuleMockup(activeModule)}
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <ul className="space-y-3">
              {currentModule?.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

