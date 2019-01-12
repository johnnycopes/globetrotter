import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Country } from 'src/app/model/country.interface';

export interface Category {
  name: string;
  subcategories: Category[];
}

export interface CategoryModel {
  name: string;
  checkboxState: string;
  subcategories: SubcategoryModel[]; // how can I make this CategoryModel[] when the model does need to transmit the array of countries at the bottom level of the model to the quiz component?
  current: number;
  total: number;
}

interface SubcategoryModel {
  name: string;
  checkboxState: string;
  subcategories: Category[]; // why does this fail when I try to type it as Country[]?
  total: number;
}

@Component({
  selector: 'app-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss']
})
export class NestedCheckboxesComponent implements OnInit {
  @Input() category: Category; // The data used to populate the component create the model
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
