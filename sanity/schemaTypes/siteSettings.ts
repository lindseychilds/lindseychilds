import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "nav", title: "Navigation" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site name (nav logo)",
      type: "string",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "preloaderName",
      title: "Preloader name",
      description: "Shown in the loading screen. Defaults to the site name.",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "general",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      description: "Without the @ — e.g. lindseychilds",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      description: "Order and labels of the top navigation. Hide a link to keep its page but remove it from the menu.",
      type: "array",
      group: "nav",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "Path", type: "string", description: "e.g. /stills, /about, or an external URL", validation: (r) => r.required() }),
            defineField({ name: "hidden", title: "Hidden", type: "boolean", initialValue: false }),
          ],
          preview: {
            select: { title: "label", subtitle: "href", hidden: "hidden" },
            prepare: ({ title, subtitle, hidden }) => ({
              title: hidden ? `${title} (hidden)` : title,
              subtitle,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Browser / SEO title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
