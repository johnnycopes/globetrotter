import { Component, OnInit, Input } from '@angular/core';

import { Tally } from 'src/app/shared/model/select.interface';

@Component({
  selector: 'app-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss']
})
export class NestedCheckboxesComponent implements OnInit {
  @Input() category: string;
  @Input() subcategories: string[];
  @Input() dataByCategory: _.Dictionary<any[]>;
  @Input() dataBySubcategory: _.Dictionary<any[]>;
  @Input() tally: Tally;
  public categoryModel: any; // TODO: define this

  constructor() { }

  ngOnInit() {
    console.group(`${this.category}:`);
    console.log('data by category:', this.dataByCategory);
    console.log('data by subcategory:', this.subcategories);
    console.log('tally:', this.tally);
    console.groupEnd();

    /*
    * TODO:
    * - initialize the form in a cleaner way
    * - extract the useful functionality out of the nested-checkboxes-group service
    * - make this component responsible for generating/maintaining its own tally
    */
    this.categoryModel = {
      category: this.category,
      checkboxState: true,
      subcategories: {}
    };
    this.initializeModel();
  }

  initializeModel() {
    this.subcategories.forEach(subcategory => {
      this.categoryModel.subcategories[subcategory] = true;
    });
  }

  onCategoryChange(category: HTMLInputElement) {
    console.log('category change', category);

    // TODO: make this toggle all the subcategories' values to be all true or all false at once

    // (ORIGINAL CODE BELOW)
  //   const subcategories = this.subcategoriesByCategory[category.value];
  //   const updateToFormModel = this.nestedCheckboxesGroupService.createCategoryAndSubcategoryUpdate(category.value, subcategories, category.checked);
  //   this.form.patchValue(updateToFormModel);
  }

  onSubcategoryChange(category: HTMLInputElement) {
    console.log('subcategory change:', category);

    // TODO: make this toggle the indeterminate state of the category checkbox as needed

    // (ORIGINAL CODE BELOW)
  //   const updateToFormModel = this.nestedCheckboxesGroupService.createCategoryUpdate(this.form, category.value, this.subcategoriesByCategory[category.value]);
  //   this.form.patchValue(updateToFormModel);
  }

}
