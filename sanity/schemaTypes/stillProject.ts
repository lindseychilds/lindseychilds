import { defineArrayMember, defineField, defineType } from "sanity";

export const stillProject = defineType({
  name: "stillProject",
  title: "Stills Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Short caption shown beside the cover on the home page.",
      type: "string",
    }),
    defineField({
      name: "featuredOnHome",
      title: "Show on home page",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "images",
      title: "Images",
      description: "First image is the cover. Drag to reorder.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        }),
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "images.0" },
  },
});
