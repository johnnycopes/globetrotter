import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { Tally, FormModelObject } from '../../shared/model/select.interface';
import { NestedCheckboxesGroupService } from './nested-checkboxes-group.service';

export interface FormInfo {
  form: FormModelObject;
  tally: Tally
};

@Component({
  selector: 'app-nested-checkboxes-group',
  templateUrl: './nested-checkboxes-group.component.html',
  styleUrls: ['./nested-checkboxes-group.component.scss']
})
export class NestedCheckboxesGroupComponent implements OnInit {
  @Input() readonly data: any[];
  @Input() readonly category: string;
  @Input() readonly subcategory: string;
  @Output() formChanged: EventEmitter<FormInfo> = new EventEmitter<FormInfo>();
  public newDataByCategory: any; // TODO: rename this
  public dataByCategory: _.Dictionary<any[]>;
  public dataBySubcategory: _.Dictionary<any[]>;
  public subcategoriesByCategory: _.Dictionary<string[]>;
  public categories: string[];
  public subcategories: string[];
  public form: FormGroup;
  public tally: Tally;

  constructor(private nestedCheckboxesGroupService: NestedCheckboxesGroupService) { }

  ngOnInit() {
    // organize data
    this.dataByCategory = this.nestedCheckboxesGroupService.groupDataByProperty(this.data, this.category);
    this.dataBySubcategory = this.nestedCheckboxesGroupService.groupDataByProperty(this.data, this.subcategory);
    this.subcategoriesByCategory = this.nestedCheckboxesGroupService.groupSubcategoriesByCategory(this.data, this.category, this.subcategory);
    this.categories = Object.keys(this.dataByCategory);
    this.subcategories = Object.keys(this.dataBySubcategory);

    // new! keep this
    this.initializeData();
    //

    // initialize form/tally
    this.form = this.nestedCheckboxesGroupService.createForm(this.categories, this.subcategories, true);
    this.updateTally();
    this.formChanged.emit({
      form: this.form.value,
      tally: this.tally
    });
    this.form.valueChanges.subscribe(() => {
      this.updateTally();
      this.formChanged.emit({
        form: this.form.value,
        tally: this.tally
      });
    });
  }

  onSelectAll() {
    const updatedFormModel = this.nestedCheckboxesGroupService.createForm(this.categories, this.subcategories, true);
    this.form.setValue(updatedFormModel.value);
  }

  onClearAll() {
    const updatedFormModel = this.nestedCheckboxesGroupService.createForm(this.categories, this.subcategories, false);
    this.form.setValue(updatedFormModel.value);
  }

  onCategoryChange(category: HTMLInputElement) {
    const subcategories = this.subcategoriesByCategory[category.value];
    const updateToFormModel = this.nestedCheckboxesGroupService.createCategoryAndSubcategoryUpdate(category.value, subcategories, category.checked);
    this.form.patchValue(updateToFormModel);
  }

  onSubcategoryChange(category: HTMLInputElement) {
    const updateToFormModel = this.nestedCheckboxesGroupService.createCategoryUpdate(this.form, category.value, this.subcategoriesByCategory[category.value]);
    this.form.patchValue(updateToFormModel);
  }

  private updateTally(): void {
    this.tally = this.nestedCheckboxesGroupService.updateTally(this.form, this.dataBySubcategory, this.subcategoriesByCategory);
  }

  private initializeData() {
    this.newDataByCategory = [];
    _.forEach(this.categories, category => {
      const categoryData = {
        name: category,
        subcategories: []
      };
      _.forEach(this.subcategoriesByCategory[category], subcategory => {
        const subcategoryData = {
          name: subcategory,
          subcategories: this.dataBySubcategory[subcategory]
        };
        categoryData.subcategories.push(subcategoryData);
      });
      this.newDataByCategory.push(categoryData);
    });
    console.log('new data structure', this.newDataByCategory);
  }
}


/* TODO: consider these notes for how the model should look in the parent/child components

{
  "Asia": {
    "current": 60,
      "total": 60,
        "checkboxState": "checked",
          "subregions": [
            {
              "name": "Southern Asia",
              "count": 8,
              "checkboxState": "checked"
            },
            {
              "name": "Western Asia",
              "count": 18,
              "checkboxState": "checked"
            }
          ]
  }
}

{
  "name": "Asia",
    // "current": 60, these are calculated by the component itself
    // "total": 60,
    "checkboxState": "checked",
      "subregions": [
        {
          "name": "Southern Asia",
          // "total": 8, // these are passed in from the parent
          "checkboxState": "checked" // could be generated by the component itself
        },
        {
          "name": "Western Asia",
          // "total": 18,
          "checkboxState": "checked"
        }
      ]
}

*/
