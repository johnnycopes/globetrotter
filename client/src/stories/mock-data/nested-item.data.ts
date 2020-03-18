import { IDefaultTreeItem } from "src/app/shared/components/tree/default-tree-item.interface";

export const NESTED_ITEM: IDefaultTreeItem = {
  id: "Africa",
  children: [
    {
      id: "Southern Africa",
      parentId: "Africa",
      children: [
        {
          id: "Swaziland",
          parentId: "Southern Africa",
        },
        {
          id: "Namibia",
          parentId: "Southern Africa",
        }
      ]
    },
    {
      id: "Central Africa",
      parentId: "Africa",
    },
    {
      id: "Northern Africa",
      parentId: "Africa",
      children: [
        {
          id: "Morocco",
          parentId: "Northern Africa",
          children: [
            {
              id: "Marrakesh",
              parentId: "Morocco",
            },
            {
              id: "Fes",
              parentId: "Morocco",
            }
          ]
        }
      ]
    },
  ],
};
