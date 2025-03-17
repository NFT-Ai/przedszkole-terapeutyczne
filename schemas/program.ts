export default {
  name: "program",
  title: "Programy",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Opis",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      title: "Ikona",
      type: "string",
      options: {
        list: [
          { title: "Książka", value: "BookOpen" },
          { title: "Mózg", value: "Brain" },
          { title: "Puzzle", value: "Puzzle" },
          { title: "Muzyka", value: "Music" },
          { title: "Serce", value: "HeartHandshake" },
          { title: "Sztućce", value: "Utensils" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Kolejność wyświetlania",
      type: "number",
      initialValue: 0,
    },
  ],
}

