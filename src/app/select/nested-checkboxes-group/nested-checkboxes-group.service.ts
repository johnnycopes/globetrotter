import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NestedCheckboxesGroupService {

  constructor() { }

  groupDataByProperty(data: any[], property: string) {
    return _.groupBy(data, property);
  }

  groupSubcategoriesByCategory(data: any[], category: string, subcategory: string): _.Dictionary<string[]> {
    return _.reduce(data, (accum, item) => {
      const itemCategory = item[category];
      const itemSubcategory = item[subcategory];
      if (!accum[itemCategory]) {
        accum[itemCategory] = [];
      }
      if (!accum[itemCategory].includes(itemSubcategory)) {
        accum[itemCategory].push(itemSubcategory);
      }
      return accum;
    }, {});
  }

}
