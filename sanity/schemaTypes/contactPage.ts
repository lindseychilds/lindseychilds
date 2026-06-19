import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "signature",
      title: "Signature",
      description: "Handwritten name in the sidebar. Defaults to the site name.",
      type: "string",
    }),
    defineField({
      name: "representationHeading",
      title: "Representation heading",
      type: "string",
      initialValue: "Representation",
    }),
    defineField({ name: "representationName", title: "Agency name", type: "string" }),
    defineField({ name: "representationUrl", title: "Agency website", type: "url" }),
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "city", title: "City / heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
            defineField({ name: "email", title: "Email", type: "string" }),
          ],
          preview: { select: { title: "city", subtitle: "email" } },
        },
      ],
    }),
    defineField({
      name: "directHeading",
      title: "Direct heading",
      type: "string",
      initialValue: "Direct",
    }),
    defineField({ name: "directEmail", title: "Direct email", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
