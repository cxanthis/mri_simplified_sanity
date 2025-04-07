import { defineType, defineField } from "sanity";

export const news = defineType({
  name: "news",
  title: "News",
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
            { title: "MRI Technology & Innovations", value: "technology" },
            { title: "Clinical Applications & Case Studies", value: "clinical" },
            { title: "Research & Development", value: "rnd" },
            { title: "Equipment & Devices", value: "equipment" },
            { title: "Industry & Market News", value: "industry" },
            { title: "Safety & Regulations", value: "safety" },
            { title: "Conferences & Events", value: "events" },
            { title: "Educational Resources & Training", value: "education" },
            { title: "Expert Opinions & Interviews", value: "experts" },
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
                  'Place the image before the nth <p> element in the body.',
              }),
            ],
          }),
        ],
        validation: (Rule) => Rule.max(3),
    }), {
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      description: 'Image to appear at the top of the article'
    },
    {
      name: 'externalLinks',
      title: 'External Links',
      type: 'array',
      description: 'Links for additional reading',
      of: [
        {
          type: 'object',
          name: 'externalLink',
          title: 'External Link',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url'
            }
          ]
        }
      ]
    },
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
