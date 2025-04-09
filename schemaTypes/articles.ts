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
      name: 'previousArticle',
      title: 'Previous Article',
      type: 'reference',
      description: 'Link to the previous article',
      to: [{ type: 'articles' }],
    }),
    // New reference for the next article
    defineField({
      name: 'nextArticle',
      title: 'Next Article',
      type: 'reference',
      description: 'Link to the next article',
      to: [{ type: 'articles' }]
    }),
    // New reference for the parent article
    defineField({
      name: 'parentArticle',
      title: 'Parent Article',
      type: 'reference',
      description: 'Link to the parent article',
      to: [{ type: 'articles' }],
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
      title: "SEO",
      type: "object",
      fields: [
        // Basic SEO Fields
        defineField({
          name: "seoTitle",
          title: "SEO Title",
          type: "string",
          description: "A concise title for SEO purposes.",
        }),
        defineField({
          name: "seoDescription",
          title: "SEO Description",
          type: "text",
          rows: 3,
          description: "A brief summary ideally under 160 characters.",
        }),
        defineField({
          name: "seoKeywords",
          title: "SEO Keywords",
          type: "string",
          description: "Comma-separated list of targeted keywords.",
        }),
        defineField({
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
          description:
            "The canonical URL for this article to prevent duplicate content issues.",
        }),
        defineField({
          name: "structuredData",
          title: "Structured Data (JSON‑LD)",
          type: "text",
          description:
            "Insert JSON‑LD structured data (e.g., schema.org/Article) to enhance rich snippets.",
        }),
        defineField({
          name: "metaRobots",
          title: "Meta Robots",
          type: "string",
          options: {
            list: [
              { title: "Index, Follow", value: "index, follow" },
              { title: "Noindex, Nofollow", value: "noindex, nofollow" },
            ],
          },
          description: "Control indexing and crawling of this page.",
        }),
        // Open Graph Metadata
        defineField({
          name: "og",
          title: "Open Graph Metadata",
          type: "object",
          fields: [
            defineField({
              name: "ogTitle",
              title: "OG Title",
              type: "string",
              description: "Title for social sharing via Open Graph.",
            }),
            defineField({
              name: "ogDescription",
              title: "OG Description",
              type: "text",
              rows: 3,
              description: "Description for social sharing via Open Graph.",
            }),
            defineField({
              name: "ogImage",
              title: "OG Image",
              type: "image",
              options: { hotspot: true },
              description:
                "Image used for social sharing on platforms like Facebook.",
            }),
          ],
        }),

        // Twitter Card Metadata
        defineField({
          name: "twitter",
          title: "Twitter Card Metadata",
          type: "object",
          fields: [
            defineField({
              name: "twitterTitle",
              title: "Twitter Title",
              type: "string",
              description: "Title for Twitter card.",
            }),
            defineField({
              name: "twitterDescription",
              title: "Twitter Description",
              type: "text",
              rows: 3,
              description: "Description for Twitter card.",
            }),
            defineField({
              name: "twitterImage",
              title: "Twitter Image",
              type: "image",
              options: { hotspot: true },
              description:
                "Image used for Twitter sharing.",
            }),
          ],
        }),
        // Publication dates for content freshness
        defineField({
          name: "publishedAt",
          title: "Published At",
          type: "datetime",
          description: "The date and time the article was first published.",
        }),
        defineField({
          name: "updatedAt",
          title: "Updated At",
          type: "datetime",
          description: "The date and time the article was last updated.",
        }),

        // Author information to enhance credibility
        defineField({
          name: "author",
          title: "Author",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "text",
              rows: 3,
              description: "A short biography of the author.",
            }),
            defineField({
              name: "profileImage",
              title: "Profile Image",
              type: "image",
              options: { hotspot: true },
              description: "Profile picture of the author.",
            }),
            defineField({
              name: "social",
              title: "Social Profiles",
              type: "object",
              fields: [
                defineField({
                  name: "twitter",
                  title: "Twitter URL",
                  type: "url",
                }),
                defineField({
                  name: "linkedin",
                  title: "LinkedIn URL",
                  type: "url",
                }),
              ],
            })
          ],
        }),
      ],
    }),
  ],
});
