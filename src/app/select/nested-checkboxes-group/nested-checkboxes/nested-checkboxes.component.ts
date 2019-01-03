import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { Category } from '../nested-checkboxes-group.component';

export interface CategoryModel {
  name: string;
  checkboxState: string;
  subcategories: SubcategoryModel[];
  current: number;
  total: number;
}

interface SubcategoryModel {
  name: string;
  checkboxState: string;
  subcategories: any[];
  total: number;
}

@Component({
  selector: 'app-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss']
})
export class NestedCheckboxesComponent implements OnInit {
  @Input() category: Category; // The data used to create the model that two-way binds with the UI
  @Input() allChecked: boolean; // Sets all checkboxes to be selected or deselected from the start
  @Input() imagePath?: string; // The file path of an image to be displayed next to the checkboxes
  @Output() modelChanged: EventEmitter<CategoryModel> = new EventEmitter<CategoryModel>();
  public model: CategoryModel;

  constructor() { }

  ngOnInit() {
    this.initializeModel(this.allChecked);
  }

  initializeModel(allChecked: boolean) {
    this.model = {
      name: this.category.name,
      checkboxState: allChecked ? 'checked' : 'unchecked',
      subcategories: [],
      current: 0,
      total: 0
    };
    _.forEach(this.category.subcategories, subcategory => {
      const subcategoryModel: SubcategoryModel = {
        name: subcategory.name,
        checkboxState: allChecked ? 'checked' : 'unchecked',
        subcategories: subcategory.subcategories,
        total: subcategory.subcategories.length
      };
      this.model.subcategories.push(subcategoryModel);
      this.model.total += subcategoryModel.subcategories.length;
    });
    this.model.current = allChecked ? this.model.total : 0;

    this.modelChanged.emit(this.model);
  }

  onCategoryChange(newCheckboxState: string) {
    this.model.checkboxState = newCheckboxState;
    this.model.subcategories.forEach(subcategory => {
      subcategory.checkboxState = newCheckboxState;
    });

    // update the tally
    this.model.current = this.model.checkboxState === 'checked' ? this.model.total : 0;

    this.modelChanged.emit(this.model);
  }

  onSubcategoryChange(newCheckboxState: string, subcategory: SubcategoryModel) {
    subcategory.checkboxState = newCheckboxState;
    this.model.current = _.reduce(this.model.subcategories, (accum, current) => {
      return current.checkboxState === 'checked' ? accum + current.total : accum;
    }, 0);

    if (this.model.current === 0) {
      this.model.checkboxState = 'unchecked';
    }
    else if (this.model.current === this.model.total) {
      this.model.checkboxState = 'checked';
    }
    else {
      this.model.checkboxState = 'indeterminate';
    }

    this.modelChanged.emit(this.model);
  }
}
