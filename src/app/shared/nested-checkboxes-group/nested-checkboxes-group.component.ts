import { Component, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import * as _ from 'lodash';

import { Category, CategoryModel, NestedCheckboxesComponent } from '../nested-checkboxes/nested-checkboxes.component';

export interface CategoriesModel {
  current: number;
  total: number;
  categories: _.Dictionary<CategoryModel>;
}

@Component({
  selector: 'app-nested-checkboxes-group',
  templateUrl: './nested-checkboxes-group.component.html',
  styleUrls: ['./nested-checkboxes-group.component.scss']
})
export class NestedCheckboxesGroupComponent {
  @Input() categories: Category[]; // The data to be iterated over and passed into the individual nested-checkboxes components, which each control their own model
  @Input() allChecked?: boolean = true; // Sets all checkboxes to be selected or deselected from the start
  @Input() imagePath?: string; // The file path of an image to be displayed next to the nested-checkboxes component up until the name of the file itself (e.g. `assets/icons`)
  @Input() imageType?: string; // The extension that gets concatenated onto the end of the file path (e.g. `svg`)
  @Output() modelChanged: EventEmitter<CategoriesModel> = new EventEmitter<CategoriesModel>();
  @ViewChildren(NestedCheckboxesComponent) nestedCheckboxesComponents: QueryList<NestedCheckboxesComponent>
  model: CategoriesModel = {
    current: 0,
    total: 0,
    categories: {}
  };

  constructor() { }

  onSelectAll() {
    this.nestedCheckboxesComponents.forEach(instance => instance.initializeModel(true));
  }

  onClearAll() {
    this.nestedCheckboxesComponents.forEach(instance => instance.initializeModel(false));
  }

  onModelChange(model: CategoryModel) {
    this.model.categories[model.name] = model;

    // once all models have been sent up from the children components, calculate the tally of currently-selected and total options
    if (Object.keys(this.model.categories).length === this.categories.length) {
      const tally = _.reduce(this.model.categories, (accum, current) => {
        accum.current += current.current;
        accum.total += current.total;
        return accum;
      }, {current: 0, total: 0});
      this.model.current = tally.current;
      this.model.total = tally.total;

      this.modelChanged.emit(this.model);
    }
  }
}
