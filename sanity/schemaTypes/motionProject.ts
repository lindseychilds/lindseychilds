import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const motionProject = defineType({
  name: "motionProject",
  title: "Motion Project",
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
      name: "vimeoUrl",
      title: "Vimeo URL",
      description: "Paste the full Vimeo link, e.g. https://vimeo.com/1081978050",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      description: "Cover image shown in the Motion grid.",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      validation: (r) => r.required(),
    }),
    orderRankField({ type: "motionProject" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "title", subtitle: "vimeoUrl", media: "thumbnail" },
  },
});
