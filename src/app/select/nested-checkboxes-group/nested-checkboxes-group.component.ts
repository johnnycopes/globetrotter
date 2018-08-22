import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { Tally, FormModelObject } from '../../shared/model/select.interface';
import { NestedCheckboxesGroupService } from './nested-checkboxes-group.service';
import { CategoryModel } from './nested-checkboxes/nested-checkboxes.component';

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
  public dataByCategory: _.Dictionary<any[]>;
  public dataBySubcategory: _.Dictionary<any[]>;
  public subcategoriesByCategory: _.Dictionary<string[]>;
  public categories: string[];
  public subcategories: string[];
  public form: FormGroup;
  public tally: Tally;

  // new! keep this
  public newDataByCategory: any; // TODO: rename this
  public model: any = {
    current: 0,
    total: 0,
    categories: {}
  };
  public entireFormSelected: boolean;

  constructor(private nestedCheckboxesGroupService: NestedCheckboxesGroupService) {
    this.entireFormSelected = true;
  }

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
    this.entireFormSelected = true;

    // OLD CODE
    // const updatedFormModel = this.nestedCheckboxesGroupService.createForm(this.categories, this.subcategories, true);
    // this.form.setValue(updatedFormModel.value);
  }

  onClearAll() {
    this.entireFormSelected = false;

    // OLD CODE
    // const updatedFormModel = this.nestedCheckboxesGroupService.createForm(this.categories, this.subcategories, false);
    // this.form.setValue(updatedFormModel.value);
  }

  updateModel(model: CategoryModel) {
    this.model.categories[model.name] = model;

    if (Object.keys(this.model.categories).length === this.newDataByCategory.length) {
      const tally = _.reduce(this.model.categories, (accum, current) => {
        accum.current += current.current;
        accum.total += current.total;
        return accum;
      }, {current: 0, total: 0});
      this.model.current = tally.current;
      this.model.total = tally.total;

      console.log(this.model);
    }
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
  }

}
