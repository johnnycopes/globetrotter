import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { Tally } from 'src/app/shared/model/select.interface';

@Component({
  selector: 'app-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss']
})
export class NestedCheckboxesComponent implements OnInit {
  @Input() category: string;
  @Input() data: any;
  @Input() tally: Tally;
  public categoryModel: any; // TODO: type this

  constructor() { }

  ngOnInit() {
    console.group(this.data.name);
    console.log(this.data);
    console.groupEnd();

    /*
    * TODO:
    * - fix the category (top-level) tally
    * - make this component responsible for generating/maintaining its own tally
    */
    this.initializeModel(true);
  }

  initializeModel(startingValue: boolean) {
    const categoryStartingValue = startingValue ? 'checked' : 'unchecked';
    this.categoryModel = {
      category: this.category,
      checkboxState: categoryStartingValue,
      subcategories: []
    };
    this.data.subcategories.forEach(subcategory => {
      this.categoryModel.subcategories.push({
        name: subcategory.name,
        isChecked: startingValue,
        subcategories: subcategory.subcategories
      });
    });
  }

  onCategoryChange() {
    const newCheckboxState = this.categoryModel.checkboxState !== 'checked' ? 'checked' : 'unchecked';
    this.categoryModel.checkboxState = newCheckboxState;

    // set all subcategories' checkbox state to match that of the category's new checkbox state
    const isChecked = newCheckboxState === 'checked' ? true : false;
    this.categoryModel.subcategories.forEach(subcategory => {
      subcategory.isChecked = isChecked;
    });
  }

  onSubcategoryChange() {
    const sum = this.categoryModel.subcategories.reduce((accum, current) => {
      return current.isChecked ? accum + 1 : accum;
    }, 0);

    if (sum === 0) {
      this.categoryModel.checkboxState = 'unchecked';
    }
    else if (sum === this.categoryModel.subcategories.length) {
      this.categoryModel.checkboxState = 'checked';
    }
    else {
      this.categoryModel.checkboxState = 'indeterminate';
    }
  }

}
