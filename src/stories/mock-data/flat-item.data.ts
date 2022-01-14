import { IDefaultTreeItem } from "@shared/components/tree/default-tree-item.interface";

export const FLAT_ITEMS: IDefaultTreeItem[] = [
  { id: "Africa", parentId: undefined },
  { id: "Southern Africa", parentId: "Africa" },
  { id: "Swaziland", parentId: "Southern Africa" },
  { id: "Namibia", parentId: "Southern Africa" },
  { id: "Central Africa", parentId: "Africa" },
  { id: "Northern Africa", parentId: "Africa" },
  { id: "Morocco", parentId: "Northern Africa" },
  { id: "Marrakesh", parentId: "Morocco" },
  { id: "Fes", parentId: "Morocco" }
];
