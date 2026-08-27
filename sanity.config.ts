/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure, SINGLETON_TYPES } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion: apiVersion || "2021-06-07",
  schema,
  document: {
    // Singletony edytujemy wyłącznie przez lewe menu.
    newDocumentOptions: (prev) =>
      prev.filter((item) => !SINGLETON_TYPES.includes(item.templateId)),
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion || "2021-06-07" }),
  ],
});
