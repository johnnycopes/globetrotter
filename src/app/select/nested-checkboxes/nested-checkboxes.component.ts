import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Tally, FormModelObject } from '../../shared/model/select.interface';
import { NestedCheckboxesService } from './nested-checkboxes.service';

export interface FormInfo {
  form: FormModelObject;
  tally: Tally
};

@Component({
  selector: 'app-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss']
})
export class NestedCheckboxesComponent implements OnInit {
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

  constructor(private nestedCheckboxesService: NestedCheckboxesService) { }

  ngOnInit() {
    // organize data
    this.dataByCategory = this.nestedCheckboxesService.groupDataByProperty(this.data, this.category);
    this.dataBySubcategory = this.nestedCheckboxesService.groupDataByProperty(this.data, this.subcategory);
    this.subcategoriesByCategory = this.nestedCheckboxesService.groupSubcategoriesByCategory(this.data, this.category, this.subcategory);
    this.categories = Object.keys(this.dataByCategory);
    this.subcategories = Object.keys(this.dataBySubcategory);

    // initialize form/tally
    this.form = this.nestedCheckboxesService.createForm(this.categories, this.subcategories, true);
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
    const updatedFormModel = this.nestedCheckboxesService.createForm(this.categories, this.subcategories, true);
    this.form.setValue(updatedFormModel.value);
  }

  onClearAll() {
    const updatedFormModel = this.nestedCheckboxesService.createForm(this.categories, this.subcategories, false);
    this.form.setValue(updatedFormModel.value);
  }

  onCategoryChange(category: HTMLInputElement) {
    const subcategories = this.subcategoriesByCategory[category.value];
    const updateToFormModel = this.nestedCheckboxesService.createCategoryAndSubcategoryUpdate(category.value, subcategories, category.checked);
    this.form.patchValue(updateToFormModel);
  }

  onSubcategoryChange(category: HTMLInputElement) {
    const updateToFormModel = this.nestedCheckboxesService.createCategoryUpdate(this.form, category.value, this.subcategoriesByCategory[category.value]);
    this.form.patchValue(updateToFormModel);
  }

  private updateTally(): void {
    this.tally = this.nestedCheckboxesService.updateTally(this.form, this.dataBySubcategory, this.subcategoriesByCategory);
  }

}
