import { defineType, defineField, SanityDocument } from "sanity";

export const podcast = defineType({
  name: "podcast",
  title: "Podcast",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "number",
      readOnly: false,
      description: "Use it as a unique identifier",
      validation: (Rule) => Rule.required(),
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
        source: (doc: SanityDocument): string => {
          const data = doc as any
          const idPart = data.id ? data.id.toString() : ''
          const titlePart = data.title || ''
          return idPart ? `${idPart}-${titlePart}` : titlePart
        },
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
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief summary of the episode",
    }),
    defineField({
      name: "audioUrl",
      title: "Audio URL",
      type: "url",
      description: "Link to the podcast audio file",
    }),
    defineField({
        name: "duration",
        title: "Duration (minutes)",
        type: "number",
        description: "Length of the episode in minutes",
      }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Image to appear at the top of the article'
    }),
    defineField({
        name: "tags",
        title: "Tags",
        type: "array",
        of: [{ type: "string" }],
        description: 'Keywords or tags for categorizing the episode'
    }),    
    defineField({
        name: "guests",
        title: "Guests",
        type: "array",
        of: [{ type: "string" }],
        description: 'Names of guests featured in the episode'
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
      media: "headerImage",
    },
  },
});
