import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

interface CategoryModel {
  name: string;
  checkboxState: string;
  subcategories: SubcategoryModel[];
  current: number;
  total: number;
}

interface SubcategoryModel {
  name: string;
  isChecked: boolean;
  subcategories: any[];
  total: number;
}

@Component({
  selector: 'app-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss']
})
export class NestedCheckboxesComponent implements OnInit {
  @Input() data: any; // TODO: type this
  @Input() startingValue?: boolean; // Sets all checkboxes to be selected or deselected from the start (default is true)
  @Input() imagePath?: string; // Displays an image alongside the checkboxes
  public model: CategoryModel;

  constructor() {
    this.startingValue = this.startingValue ? this.startingValue : true;
  }

  ngOnInit() {
    this.initializeModel(this.startingValue);
  }

  initializeModel(startingValue: boolean) {
    this.model = {
      name: this.data.name,
      checkboxState: startingValue ? 'checked' : 'unchecked',
      subcategories: [],
      current: 0,
      total: 0
    };
    _.forEach(this.data.subcategories, subcategory => {
      const subcategoryModel: SubcategoryModel = {
        name: subcategory.name,
        isChecked: startingValue,
        subcategories: subcategory.subcategories,
        total: subcategory.subcategories.length
      };
      this.model.subcategories.push(subcategoryModel);
      this.model.total += subcategoryModel.subcategories.length;
    });
    this.model.current = startingValue ? this.model.total : 0;
  }

  onCategoryChange() {
    const newCheckboxState = this.model.checkboxState !== 'checked' ? 'checked' : 'unchecked';
    this.model.checkboxState = newCheckboxState;

    // set all subcategories' checkbox state to match that of the category's new checkbox state
    const isChecked = newCheckboxState === 'checked' ? true : false;
    this.model.subcategories.forEach(subcategory => {
      subcategory.isChecked = isChecked;
    });

    // update the tally
    this.model.current = isChecked ? this.model.total : 0;
  }

  onSubcategoryChange(subcategory) {
    // evaluate which subcategories are checked and update the category checkbox state accordingly
    const sum = _.reduce(this.model.subcategories, (accum, current) => {
      return current.isChecked ? accum + 1 : accum;
    }, 0);

    if (sum === 0) {
      this.model.checkboxState = 'unchecked';
    }
    else if (sum === this.model.subcategories.length) {
      this.model.checkboxState = 'checked';
    }
    else {
      this.model.checkboxState = 'indeterminate';
    }

    // update the tally
    if (subcategory.isChecked) {
      this.model.current += subcategory.total;
    }
    else {
      this.model.current -= subcategory.total;
    }
  }

}
