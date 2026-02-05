'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  if (!config.projectId || !config.dataset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sanity Studio Configuration Error</h1>
          <p className="text-slate-600 mb-2">
            Please set the following environment variables:
          </p>
          <ul className="text-left list-disc list-inside space-y-1 text-slate-600">
            <li><code className="bg-slate-100 px-2 py-1 rounded">NEXT_PUBLIC_SANITY_PROJECT_ID</code></li>
            <li><code className="bg-slate-100 px-2 py-1 rounded">NEXT_PUBLIC_SANITY_DATASET</code></li>
          </ul>
          <p className="text-sm text-slate-500 mt-4">
            Current dataset: {config.dataset || 'not set'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <NextStudio
      config={config as any}
      unstable_globalStyles
    />
  )
}
