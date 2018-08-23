import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import * as _ from 'lodash';

import { NestedCheckboxesGroupService } from './nested-checkboxes-group.service';
import { CategoryModel, NestedCheckboxesComponent } from './nested-checkboxes/nested-checkboxes.component';

interface CategoriesModel {
  current: number;
  total: number;
  categories: _.Dictionary<CategoryModel>;
}

@Component({
  selector: 'app-nested-checkboxes-group',
  templateUrl: './nested-checkboxes-group.component.html',
  styleUrls: ['./nested-checkboxes-group.component.scss']
})
export class NestedCheckboxesGroupComponent implements OnInit {
  @Input() readonly data: any[];
  @Input() readonly category: string;
  @Input() readonly subcategory: string;
  @Output() modelChanged: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren(NestedCheckboxesComponent) nestedCheckboxesComponents: QueryList<NestedCheckboxesComponent>
  public dataByCategory: _.Dictionary<any[]>;
  public dataBySubcategory: _.Dictionary<any[]>;
  public subcategoriesByCategory: _.Dictionary<string[]>;
  public categories: string[];
  public subcategories: string[];

  // new! keep this
  public newDataByCategory: any; // TODO: rename this
  public model: CategoriesModel;
  public entireFormSelected: boolean;

  constructor(private nestedCheckboxesGroupService: NestedCheckboxesGroupService) {
    this.initializeModel();
    this.entireFormSelected = true;
  }

  ngOnInit() {
    /**
     * TODO:
     * - build the data object (newDataByCategory) outside of this component and pass it in. move all associated
     * logic outside of this component as well
     * - remove dependency on nested-checkboxes-group service
     * - figure out the error of the current count in the select template
     */
    // organize data
    this.dataByCategory = this.nestedCheckboxesGroupService.groupDataByProperty(this.data, this.category);
    this.dataBySubcategory = this.nestedCheckboxesGroupService.groupDataByProperty(this.data, this.subcategory);
    this.subcategoriesByCategory = this.nestedCheckboxesGroupService.groupSubcategoriesByCategory(this.data, this.category, this.subcategory);
    this.categories = Object.keys(this.dataByCategory);
    this.subcategories = Object.keys(this.dataBySubcategory);

    this.initializeData();
  }

  onSelectAll() {
    this.initializeModel();
    this.nestedCheckboxesComponents.forEach(instance => instance.initializeModel(true));
  }

  onClearAll() {
    this.initializeModel();
    this.nestedCheckboxesComponents.forEach(instance => instance.initializeModel(false));
  }

  onModelChange(model: CategoryModel) {
    this.model.categories[model.name] = model;

    if (Object.keys(this.model.categories).length === this.newDataByCategory.length) {
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

  private initializeModel() {
    this.model = {
      current: 0,
      total: 0,
      categories: {}
    };
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
