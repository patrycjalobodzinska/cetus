"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  const [corsError, setCorsError] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState<string>("");

  useEffect(() => {
    setCurrentOrigin(window.location.origin);

    const errorHandler = (event: ErrorEvent) => {
      const message = event.message || "";
      if (
        message.includes("CORS") ||
        message.includes("Access-Control-Allow-Origin") ||
        message.includes("Failed to fetch") ||
        message.includes("404") ||
        message.includes("users/me")
      ) {
        setCorsError(true);
      }
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || event.reason?.toString() || "";
      if (
        reason.includes("CORS") ||
        reason.includes("Access-Control") ||
        reason.includes("404") ||
        reason.includes("users/me")
      ) {
        setCorsError(true);
      }
    };

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok && response.status === 404) {
          const url = args[0]?.toString() || "";
          if (
            url.includes("sanity.io") &&
            (url.includes("users/me") || url.includes("ping"))
          ) {
            setCorsError(true);
          }
        }
        return response;
      } catch (error) {
        throw error;
      }
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", unhandledRejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener(
        "unhandledrejection",
        unhandledRejectionHandler,
      );
      window.fetch = originalFetch;
    };
  }, []);

  if (!config.projectId || !config.dataset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Sanity Studio Configuration Error
          </h1>
          <p className="text-slate-600 mb-2">
            Please set the following environment variables:
          </p>
          <ul className="text-left list-disc list-inside space-y-1 text-slate-600">
            <li>
              <code className="bg-slate-100 px-2 py-1 rounded">
                NEXT_PUBLIC_SANITY_PROJECT_ID
              </code>
            </li>
            <li>
              <code className="bg-slate-100 px-2 py-1 rounded">
                NEXT_PUBLIC_SANITY_DATASET
              </code>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (corsError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="text-center max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-slate-900">
            Dataset Missing (404 Error)
          </h1>
          <p className="text-slate-600 mb-6">
            The dataset{" "}
            <code className="bg-slate-100 px-2 py-1 rounded font-mono">
              {config.dataset}
            </code>{" "}
            does not exist in your Sanity project.
          </p>
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-left mb-6">
            <p className="text-lg font-semibold text-red-800 mb-4">
              Primary Issue: Dataset Not Found
            </p>
            <div className="bg-white rounded-lg p-4 border border-red-200 mb-4">
              <p className="text-sm font-semibold text-slate-700 mb-3">
                Quick Fix - Create Dataset:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
                <li>
                  Go to{" "}
                  <a
                    href="https://sanity.io/manage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline font-medium">
                    sanity.io/manage
                  </a>
                </li>
                <li>
                  Select project:{" "}
                  <code className="bg-slate-100 px-2 py-1 rounded font-mono">
                    {config.projectId}
                  </code>
                </li>
                <li>
                  Click <strong>&quot;Datasets&quot;</strong> tab
                </li>
                <li>
                  Click <strong>&quot;Add dataset&quot;</strong> button
                </li>
                <li>
                  Name it exactly:{" "}
                  <code className="bg-slate-100 px-2 py-1 rounded font-mono">
                    {config.dataset}
                  </code>
                </li>
                <li>
                  Select <strong>&quot;Production&quot;</strong> or{" "}
                  <strong>&quot;Development&quot;</strong> mode
                </li>
                <li>
                  Click <strong>&quot;Create&quot;</strong>
                </li>
                <li>Wait 1-2 minutes, then refresh this page</li>
              </ol>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setCorsError(false);
                window.location.reload();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Reload Page
            </button>
            <a
              href="https://sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors inline-block">
              Open Sanity Manage
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <NextStudio config={config as any} unstable_globalStyles />;
}
