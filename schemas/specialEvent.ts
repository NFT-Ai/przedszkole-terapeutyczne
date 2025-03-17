export default {
  name: "specialEvent",
  title: "Wydarzenia Specjalne",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "featured",
      title: "Wyróżnione (pokaż w sliderze)",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "eventDate",
      title: "Data wydarzenia",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "bannerImage",
      title: "Zdjęcie banera",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Opis",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "location",
      title: "Lokalizacja",
      type: "string",
    },
    {
      name: "registrationLink",
      title: "Link do rejestracji",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "bannerImage",
      date: "eventDate",
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString("pl-PL") : "",
      }
    },
  },
}

