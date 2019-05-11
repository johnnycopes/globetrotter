import * as _ from 'lodash';

type Item = {
  name: string;
  items?: Item[];
}
export class DefaultTreeProvider {
  getChildItems(item: Item): Item[] {
    if (item.items) {
      return item.items;
    }
    else {
      return [];
    }
  }

  getItemTotal(item: Item): number {
    if (!item.items) {
      return 1;
    }
    return _.reduce(item.items, (accum, subItem) => {
      return accum + this.getItemTotal(subItem);
    }, 0);
  }

  getItemDisplayName(item: Item): string {
    return item.name;
  }

  getItemID(item: Item): string {
    return item.name;
  }
}
