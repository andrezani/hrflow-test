export const sortOptions = [
  { name: "Newest", current: true },
  { name: "Oldest", current: false },
  { name: "Name", current: false },
  { name: "Category", current: false },
];

export const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      {
        value: "AI / Research & Development",
        label: "AI Research & Dev",
      },
      {
        value: "Artificial Intelligence",
        label: "Artificial Intelligence",
      },
      {
        value: "Financial Services",
        label: "Financial Services",
      },
      { value: "Human Resources", label: "Human Resources", checked: false },
      {
        value: "Software Engineering",
        label: "Software Engineering",
      },
    ],
  },
];
