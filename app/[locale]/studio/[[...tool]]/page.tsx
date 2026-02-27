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
            ⚠️ Dataset Missing (404 Error)
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
              🔴 Primary Issue: Dataset Not Found
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
                  Click <strong>"Datasets"</strong> tab
                </li>
                <li>
                  Click <strong>"Add dataset"</strong> button
                </li>
                <li>
                  Name it exactly:{" "}
                  <code className="bg-slate-100 px-2 py-1 rounded font-mono">
                    {config.dataset}
                  </code>
                </li>
                <li>
                  Select <strong>"Production"</strong> or{" "}
                  <strong>"Development"</strong> mode
                </li>
                <li>
                  Click <strong>"Create"</strong>
                </li>
                <li>Wait 1-2 minutes, then refresh this page</li>
              </ol>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">
                Alternative: Use Existing Dataset
              </p>
              <p className="text-sm text-slate-600">
                If you already have a dataset, set environment variable{" "}
                <code className="bg-white px-2 py-1 rounded">
                  NEXT_PUBLIC_SANITY_DATASET
                </code>{" "}
                to the existing dataset name.
              </p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left mb-6">
            <p className="text-sm font-semibold text-slate-700 mb-4">
              <strong>Current origin:</strong>{" "}
              <code className="bg-white px-2 py-1 rounded border">
                {currentOrigin}
              </code>
            </p>
            <p className="text-sm font-semibold text-slate-700 mb-4">
              <strong>Also configure CORS (if not done already):</strong>
            </p>
            <ol className="list-decimal list-inside space-y-3 text-sm text-slate-700 mb-4">
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
                Select your project:{" "}
                <code className="bg-white px-2 py-1 rounded border">
                  {config.projectId}
                </code>
              </li>
              <li>
                Go to <strong>API</strong> → <strong>CORS origins</strong>
              </li>
              <li>
                Add <strong>ALL</strong> of these domains (one per line):
                <div className="mt-2 space-y-1">
                  <code className="block bg-white px-2 py-1 rounded border text-xs">
                    {currentOrigin}
                  </code>
                  <code className="block bg-white px-2 py-1 rounded border text-xs">
                    https://cetus-five.vercel.app
                  </code>
                  <code className="block bg-white px-2 py-1 rounded border text-xs">
                    https://*.vercel.app
                  </code>
                  {currentOrigin.includes("www.") ? (
                    <code className="block bg-white px-2 py-1 rounded border text-xs">
                      {currentOrigin.replace("www.", "")}
                    </code>
                  ) : (
                    <code className="block bg-white px-2 py-1 rounded border text-xs">
                      {currentOrigin.replace("https://", "https://www.")}
                    </code>
                  )}
                </div>
              </li>
              <li>
                Enable <strong>&quot;Allow credentials&quot;</strong> checkbox
                for each origin
              </li>
              <li>Save the changes and wait 2-5 minutes</li>
              <li>Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)</li>
            </ol>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left mb-4">
            <p className="text-sm text-slate-700 mb-2">
              <strong>Important - 404 Error Detected:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 mb-3">
              <li>
                <strong>Dataset check:</strong> Make sure the dataset{" "}
                <code className="bg-white px-1 rounded">{config.dataset}</code>{" "}
                exists in your project
              </li>
              <li>
                <strong>Project access:</strong> Verify you have access to
                project{" "}
                <code className="bg-white px-1 rounded">
                  {config.projectId}
                </code>
              </li>
              <li>
                <strong>API version:</strong> Current API version is{" "}
                <code className="bg-white px-1 rounded">
                  {config.apiVersion}
                </code>
              </li>
            </ul>
            <div className="bg-red-50 border border-red-200 rounded p-3 mt-3">
              <p className="text-sm font-semibold text-red-800 mb-1">
                If you see 404 errors:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-red-700">
                <li>
                  Go to{" "}
                  <a
                    href="https://sanity.io/manage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline">
                    sanity.io/manage
                  </a>
                </li>
                <li>
                  Check if dataset{" "}
                  <code className="bg-white px-1 rounded">
                    {config.dataset}
                  </code>{" "}
                  exists
                </li>
                <li>
                  If not, create it or change{" "}
                  <code className="bg-white px-1 rounded">
                    NEXT_PUBLIC_SANITY_DATASET
                  </code>{" "}
                  to an existing dataset
                </li>
                <li>
                  Verify project ID{" "}
                  <code className="bg-white px-1 rounded">
                    {config.projectId}
                  </code>{" "}
                  is correct
                </li>
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
