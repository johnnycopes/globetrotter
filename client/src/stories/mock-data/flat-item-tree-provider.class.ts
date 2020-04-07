import * as _ from 'lodash';

import { ITreeProvider } from "@shared/components/tree/tree.component";
import { IDefaultTreeItem } from '@shared/components/tree/default-tree-item.interface';

export class FlatItemTreeProvider implements ITreeProvider<IDefaultTreeItem> {
  private itemsKeyedById: _.Dictionary<IDefaultTreeItem>;
  private itemsGroupedByParentId: _.Dictionary<IDefaultTreeItem[]>;

  constructor(items: IDefaultTreeItem[]) {
    this.itemsKeyedById = _.keyBy(items, "id");
    this.itemsGroupedByParentId = _.groupBy(items, "parentId");
  }

  public getId(item: IDefaultTreeItem): string {
    return item.id;
  }

  public getParent(item: IDefaultTreeItem): IDefaultTreeItem | undefined {
    const parentId = item.parentId;
    if (!!parentId) {
      return this.itemsKeyedById[parentId];
    }
    return undefined;
  }

  public getChildren(item: IDefaultTreeItem): IDefaultTreeItem[] {
    return this.itemsGroupedByParentId[item.id] || [];
  }
}
