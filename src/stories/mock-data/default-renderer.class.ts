import * as _ from 'lodash';

import { DefaultItem } from './default-item.interface';

export class DefaultRenderer {
  getImagePath(item: DefaultItem): string {
    return `assets/icons/${item.name}.svg`;
  }
}
