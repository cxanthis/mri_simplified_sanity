import { defineType, defineField, SanityDocument } from "sanity";

export const articles = defineType({
  name: "articles",
  title: "Articles",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content_id",
      title: "Content ID",
      type: "number",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: SanityDocument): string => {
          const data = doc as any
          const idPart = data.content_id ? data.content_id.toString() : ''
          const titlePart = data.title || ''
          return idPart ? `${idPart}-${titlePart}` : titlePart
        },
        maxLength: 200,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with dashes
            .replace(/[^\w-]+/g, "") // Remove special characters
            .slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "articleType",
        title: "Article Type",
        type: "string",
        options: {
            list: [
            { title: "Part", value: "part" },
            { title: "Chapter", value: "chapter" },
            { title: "Section", value: "section" },
            { title: "Sub-section", value: "sub-section" },
            { title: "Topic", value: "topic" },
            ],
            layout: "radio", // Can be "dropdown" or "radio"
        },
        validation: (Rule) => Rule.required(),
        }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
    }),
    defineField({
      name: "advanced",
      title: "Advanced Concepts",
      type: "text",
    }),
    defineField({
      name: "clinical",
      title: "Clinical Relevance",
      type: "text",
    }),
    defineField({
      name: "references",
      title: "References",
      type: "text",
    }),
    defineField({
      name: "simplified",
      title: "Simplified Version",
      type: "text",
    }),
    defineField({
      name: "chapter_id",
      title: "Chapter ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "seo",
        title: "SEO Metadata",
        type: "object",
        fields: [
            defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            validation: (Rule) => Rule.max(60),
            }),
            defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            validation: (Rule) => Rule.max(160),
            }),
            defineField({
            name: "ogImage",
            title: "Open Graph Image",
            type: "image",
            options: { hotspot: true },
            }),
            defineField({
            name: "ogType",
            title: "Open Graph Type",
            type: "string",
            options: {
                list: ["website", "article", "profile", "video"],
                layout: "radio",
            },
            }),
        ],
    }),
  ],
});
