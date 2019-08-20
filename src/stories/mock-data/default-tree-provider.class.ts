import * as _ from 'lodash';

import { DefaultItem } from './default-item.interface';

export class DefaultTreeProvider {
  getItemDisplayName(item: DefaultItem): string {
    return item.name;
  }

  getItemID(item: DefaultItem): string {
    return item.name;
  }

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

  getItemIcon(item: DefaultItem): string {
    return item.name;
  }
}
