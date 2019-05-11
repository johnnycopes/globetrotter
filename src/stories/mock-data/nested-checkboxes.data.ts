export const MOCK_NESTED_CHECKBOXES_DATA = {
  name: "Level 1",
  items: [
    {
      name: "Level 2A",
      items: [
        { name: "Level 3A #1" },
        { name: "Level 3A #2" },
      ]
    },
    {
      name: "Level 2B",
      items: [
        { name: "Level 3B #1" },
        { name: "Level 3B #2" },
        { name: "Level 3B #3" },
      ]
    }
  ]
};

export const SOME_SELECTED_DICT = {
  "Level 1": "indeterminate",
  "Level 2A": "indeterminate",
  "Level 2B": "indeterminate",
  "Level 3A #1": "unchecked",
  "Level 3A #2": "checked",
  "Level 3B #1": "checked",
  "Level 3B #2": "unchecked",
  "Level 3B #3": "checked"
};

export const ALL_SELECTED_DICT = {
  "Level 1": "checked",
  "Level 2A": "checked",
  "Level 2B": "checked",
  "Level 3A #1": "checked",
  "Level 3A #2": "checked",
  "Level 3B #1": "checked",
  "Level 3B #2": "checked",
  "Level 3B #3": "checked"
};
