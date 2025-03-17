export default {
  name: "teamMember",
  title: "Zespół",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Imię i nazwisko",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Stanowisko",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Zdjęcie",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      title: "Opis",
      type: "text",
    },
    {
      name: "order",
      title: "Kolejność wyświetlania",
      type: "number",
      initialValue: 0,
    },
  ],
}

