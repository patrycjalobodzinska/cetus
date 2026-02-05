'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if Sanity project is accessible
    const checkSanityConnection = async () => {
      try {
        const response = await fetch(
          `https://${config.projectId}.api.sanity.io/v${config.apiVersion}/data/query/${config.dataset}?query=*[_type == "sanity.projectSettings"][0]`
        )
        if (!response.ok && response.status === 404) {
          setError(`Dataset "${config.dataset}" not found. Please create it in your Sanity project or set NEXT_PUBLIC_SANITY_DATASET environment variable.`)
        }
      } catch (err) {
        // Ignore errors - Studio will handle them
      }
    }
    checkSanityConnection()
  }, [])

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Sanity Dataset Error</h1>
          <p className="text-slate-600 mb-4">{error}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <p className="text-sm text-slate-700 mb-2">
              <strong>To fix this:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600">
              <li>Go to <a href="https://sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">sanity.io/manage</a></li>
              <li>Select your project (ID: {config.projectId})</li>
              <li>Create a dataset named &quot;{config.dataset}&quot;</li>
              <li>Or set <code className="bg-white px-1 rounded">NEXT_PUBLIC_SANITY_DATASET</code> to an existing dataset</li>
            </ol>
          </div>
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
