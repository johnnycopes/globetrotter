import { DefaultItem } from "./default-item.interface";

export const MOCK_DATA: DefaultItem = {
  name: "Earth",
  items: [
    {
      name: "Asia",
      items: [
        { name: "China" },
        { name: "Taiwan" },
      ]
    },
    {
      name: "Europe",
      items: [
        { name: "Germany" },
        { name: "Italy" },
        { name: "Spain" },
      ]
    }
  ]
};

export const SOME_SELECTED_DICT = {
  "Earth": "indeterminate",
  "Asia": "indeterminate",
  "Europe": "indeterminate",
  "China": "unchecked",
  "Taiwan": "checked",
  "Germany": "checked",
  "Italy": "unchecked",
  "Spain": "checked"
};

export const ALL_SELECTED_DICT = {
  "Earth": "checked",
  "Asia": "checked",
  "Europe": "checked",
  "China": "checked",
  "Taiwan": "checked",
  "Germany": "checked",
  "Italy": "checked",
  "Spain": "checked"
};
