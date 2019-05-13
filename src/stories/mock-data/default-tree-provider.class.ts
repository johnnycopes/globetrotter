import * as _ from 'lodash';

export type DefaultItem = {
  name: string;
  items?: DefaultItem[];
}
export class DefaultTreeProvider {
  getChildItems(item: DefaultItem): DefaultItem[] {
    if (item.items) {
      return item.items;
    }
    else {
      return [];
    }
  }

  getItemTotal(item: DefaultItem): number {
    if (!item.items) {
      return 1;
    }
    return _.reduce(item.items, (accum, subItem) => {
      return accum + this.getItemTotal(subItem);
    }, 0);
  }

  getItemDisplayName(item: DefaultItem): string {
    return item.name;
  }

  getItemID(item: DefaultItem): string {
    return item.name;
  }
}
