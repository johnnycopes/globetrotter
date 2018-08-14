import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Tally } from '../../../shared/model/select.interface';
import { NestedCheckboxesGroupService } from '../nested-checkboxes-group.service';

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

  constructor(private nestedCheckboxesGroupService: NestedCheckboxesGroupService) { }

  ngOnInit() {
    console.log(`${this.category}:`);
    console.log('data by category:', this.dataByCategory);
    console.log('data by subcategory:', this.subcategories);
    console.log('tally:', this.tally);
  }

  onCategoryChange(category: HTMLInputElement) {
    console.log('category change', category);
  //   const subcategories = this.subcategoriesByCategory[category.value];
  //   const updateToFormModel = this.nestedCheckboxesGroupService.createCategoryAndSubcategoryUpdate(category.value, subcategories, category.checked);
  //   this.form.patchValue(updateToFormModel);
  }

  onSubcategoryChange(subcategory: HTMLInputElement) {
    console.log('subcategory change:', subcategory)
  //   const updateToFormModel = this.nestedCheckboxesGroupService.createCategoryUpdate(this.form, category.value, this.subcategoriesByCategory[category.value]);
  //   this.form.patchValue(updateToFormModel);
  }

}
