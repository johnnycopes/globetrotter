import { DefaultItem } from "./default-tree-provider.class";

export const MOCK_DATA: DefaultItem[] = [
  {
    name: "Africa",
    items: [
      {
        name: "Northern Africa",
        items: [
          { name: "Morocco" },
          { name: "Egypt" }
        ]
      },

    ]
  },
  {
    name: "Europe",
    items: [
      {
        name: "Western Europe",
        items: [
          { name: "Germany" },
          { name: "Italy" },
          { name: "Spain" }
        ]
      }
    ]
  }
];
