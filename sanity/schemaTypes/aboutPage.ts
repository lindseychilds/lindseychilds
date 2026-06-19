import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "signature",
      title: "Signature",
      description: "Handwritten name in the sidebar. Defaults to the site name.",
      type: "string",
    }),
    defineField({
      name: "biographyHeading",
      title: "Biography heading",
      type: "string",
      initialValue: "Biography",
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Bold", value: "strong" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "clientsHeading",
      title: "Clients heading",
      type: "string",
      initialValue: "Clients",
    }),
    defineField({
      name: "clients",
      title: "Clients",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
