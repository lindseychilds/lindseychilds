"use client";

import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

const singletons = [
  { id: "siteSettings", title: "Site Settings" },
  { id: "aboutPage", title: "About Page" },
  { id: "contactPage", title: "Contact Page" },
];

const singletonIds = new Set(singletons.map((s) => s.id));

export default defineConfig({
  name: "default",
  title: "Lindsey Childs",
  projectId,
  dataset,
  basePath: "/studio",
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((t) => !singletonIds.has(t.schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonIds.has(context.schemaType)
        ? input.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action || ""),
          )
        : input,
  },
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            ...singletons.map(({ id, title }) =>
              S.listItem()
                .title(title)
                .id(id)
                .child(S.document().schemaType(id).documentId(id)),
            ),
            S.divider(),
            orderableDocumentListDeskItem({
              type: "stillProject",
              title: "Stills Projects",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "motionProject",
              title: "Motion Projects",
              S,
              context,
            }),
          ]),
    }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
