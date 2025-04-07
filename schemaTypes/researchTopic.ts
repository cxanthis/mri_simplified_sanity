import { defineType, defineField } from "sanity";

export const researchTopics = defineType({
  name: "researchTopics",
  title: "Research Topics",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "number",
      readOnly: true,
      description: "Auto-incremented unique identifier",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: false,
      description: "Date when this document was created",
    }),
    defineField({
        name: "category",
        title: "Category",
        type: "string",
        options: {
          list: [
            { title: "MRI Fundamentals", value: "MRI Fundamentals" },
            { title: "MRI Procedures", value: "MRI Procedures" },
            { title: "MRI Safety", value: "MRI Safety" },
            { title: "Deeptech", value: "Deeptech" },
          ],
        },
        validation: (Rule) => Rule.required(),
        description: "Select one of the predefined categories",
      }),
      defineField({
          name: "researchType",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "Literature review", value: "Literature review" },
              { title: "Case study", value: "Case study" },
              { title: "Latest advancements", value: "Latest advancements" },
            ],
          },
          validation: (Rule) => Rule.required(),
          description: "Select one of the predefined categories",
        }),
    defineField({
      name: "teaser",
      title: "Teaser",
      type: "text",
      description: "Short description of the topic",
    }),
    defineField({
      name: "simplified",
      title: "Simplified Explanation",
      type: "text",
      description: "A simplified version of the topic",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: 'text',
      description: "Detailed description of the topic",
    }),
    defineField({
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          defineField({
            type: 'object',
            name: 'imageObject',
            title: 'Image Object',
            fields: [
              defineField({
                name: 'image',
                title: 'Image',
                type: 'image',
                options: { hotspot: true },
                fields: [
                  defineField({
                    name: 'caption',
                    title: 'Caption',
                    type: 'string',
                    description: 'Optional HTML caption for the image',
                  }),
                ],
              }),
              defineField({
                name: 'position',
                title: 'Image Position',
                type: 'number',
                description:
                  'Place the image before the nth <h2> element in the body.',
              }),
            ],
          }),
        ],
        validation: (Rule) => Rule.max(3),
    }),   
    defineField({
      name: "relatedTopics",
      title: "Related Topics",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "articles" }],
          options: {
            filter: "title != null",
            searchField: "title",
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: "Select one or more related articles.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "teaser",
      media: "image",
    },
  },
});
