export default {
  name: "testimonial",
  title: "Opinie",
  type: "document",
  fields: [
    {
      name: "content",
      title: "Treść opinii",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Autor",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Rola (np. Mama Adama, 5 lat)",
      type: "string",
    },
    {
      name: "rating",
      title: "Ocena (1-5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).required(),
    },
  ],
}

