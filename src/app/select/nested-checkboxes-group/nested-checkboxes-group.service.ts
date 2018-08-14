import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { Tally, FormModelUpdate, FormModelObject } from '../../shared/model/select.interface';

interface IndeterminateStatus {
  allSubcategoriesChecked: boolean;
  allSubcategoriesUnchecked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NestedCheckboxesGroupService {

  constructor(private fb: FormBuilder) { }

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

  createForm(categories: string[], subcategories: string[], initValue: boolean): FormGroup {
    const formModel = this.createFormModelObject(categories, subcategories, initValue);
    return this.fb.group(formModel);
  }

  createCategoryUpdate(form: FormGroup, category: string, subcategories: string[]): FormModelUpdate {
    const { allSubcategoriesChecked, allSubcategoriesUnchecked } = this.evaluateIndeterminate(form, subcategories);
    const formModelUpdate = {
      [category]: {
        checked: undefined,
        indeterminate: undefined
      }
    };
    if (!allSubcategoriesChecked && !allSubcategoriesUnchecked) {
      formModelUpdate[category].checked = null;
      formModelUpdate[category].indeterminate = true
    }
    else if (allSubcategoriesChecked) {
      formModelUpdate[category].checked = true;
      formModelUpdate[category].indeterminate = false
    }
    else if (allSubcategoriesUnchecked) {
      formModelUpdate[category].checked = false;
      formModelUpdate[category].indeterminate = false
    }
    return formModelUpdate;
  }

  createCategoryAndSubcategoryUpdate(category: string, subcategories: string[], isChecked: boolean): FormModelUpdate {
    const formModelUpdate = {};
    formModelUpdate[category] = { indeterminate: false };
    _.forEach(subcategories, (subcategory) => {
      formModelUpdate[subcategory] = isChecked;
    });
    return formModelUpdate;
  }

  updateTally(form: FormGroup, dataBySubcategory: _.Dictionary<any[]>, subcategoriesByCategory: _.Dictionary<string[]>): Tally {
    const formModel = form.value;
    const tally = { total: 0 };
    _.forEach(subcategoriesByCategory, (subcategories, category) => {
      tally[category] = 0;
      _.forEach(subcategories, (subcategory) => {
        if (formModel[subcategory]) {
          const numberOfItems = dataBySubcategory[subcategory].length;
          tally[category] += numberOfItems;
          tally.total += numberOfItems;
        }
      });
    });
    return tally;
  }

  private evaluateIndeterminate(form: FormGroup, subcategories: string[]): IndeterminateStatus {
    const formModel = form.value;
    const allSubcategoriesChecked = subcategories.every((subcategory) => {
      return formModel[subcategory] === true;
    });
    const allSubcategoriesUnchecked = subcategories.every((subcategory) => {
      return formModel[subcategory] === false;
    });
    return {
      allSubcategoriesChecked,
      allSubcategoriesUnchecked
    };
  }

  private createFormModelObject(categories: string[], subcategories: string[], isChecked: boolean): FormModelObject {
    const formModelObject = {};
    _.forEach(categories, (category) => {
      formModelObject[category] = this.fb.group({
        checked: isChecked,
        indeterminate: false
      })
    });
    _.forEach(subcategories, (subcategory) => {
      formModelObject[subcategory] = isChecked;
    });
    return formModelObject;
  }

}
