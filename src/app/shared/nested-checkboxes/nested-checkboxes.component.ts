import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Country } from 'src/app/model/country.interface';

// export interface Category {
//   name: string;
//   subcategories: Category[];
// }





// export interface CategoryModel {
//   name: string;
//   checkboxState: string;
//   subcategories: SubcategoryModel[]; // how can I make this CategoryModel[] when the model does need to transmit the array of countries at the bottom level of the model to the quiz component?
//   current: number;
//   total: number;
// }

// interface SubcategoryModel {
//   name: string;
//   checkboxState: string;
//   subcategories: Country[]; // why does this fail when I try to type it as Country[]?
//   total: number;
// }

// Extra state for each region/subregion object:
// * checkboxState
// * current
// * total

interface CheckboxUIState {
  checkboxState: string;
  current?: number;
  total: number;
}

type CheckboxUIStates = _.Dictionary<CheckboxUIState>;

interface Region {
  name: string;
  subcategories: Subregion[];
}

interface Subregion {
  name: string;
  subcategories: Country[];
}

@Component({
  selector: 'app-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss']
})
export class NestedCheckboxesComponent implements OnInit {
  @Input() region: Region; // The data used to populate the component create the model
  @Input() allChecked: boolean; // Sets all checkboxes to be selected or deselected from the start
  @Input() imagePath?: string; // The file path of an image to be displayed next to the checkboxes
  @Output() modelChanged= new EventEmitter<_.Dictionary<CheckboxUIState>>();
  public checkboxUIStates: _.Dictionary<CheckboxUIState> = {};

  constructor() { }

  ngOnInit() {
    this.initializeModel(this.allChecked);
  }

  initializeModel(allChecked: boolean) {
    const regionCheckboxUIState = this.checkboxUIStates[this.region.name] = {
      checkboxState: allChecked ? 'checked' : 'unchecked',
      current: 0,
      total: 0
    };
    _.forEach(this.region.subcategories, (subregion: Subregion) => {
      this.checkboxUIStates[subregion.name] = {
        checkboxState: allChecked ? 'checked' : 'unchecked',
        total: subregion.subcategories.length
      };
      regionCheckboxUIState.total += subregion.subcategories.length;
    });
    regionCheckboxUIState.current = allChecked ? regionCheckboxUIState.total : 0;

    // this.model = {
    //   name: this.category.name,
    //   checkboxState: allChecked ? 'checked' : 'unchecked',
    //   subcategories: [],
    //   current: 0,
    //   total: 0
    // };
    // _.forEach(this.category.subcategories, (subcategory) => {
    //   const subcategoryModel: SubcategoryModel = {
    //     name: subcategory.name,
    //     checkboxState: allChecked ? 'checked' : 'unchecked',
    //     subcategories: subcategory.subcategories,
    //     total: subcategory.subcategories.length
    //   };
    //   this.model.subcategories.push(subcategoryModel);
    //   this.model.total += subcategoryModel.subcategories.length;
    // });
    // this.model.current = allChecked ? this.model.total : 0;

    this.modelChanged.emit(this.checkboxUIStates);
  }

  onCategoryChange(newCheckboxState: string) {
    const checkboxUIState = this.checkboxUIStates[this.region.name];
    checkboxUIState.checkboxState = newCheckboxState;
    this.region.subcategories.forEach(subregion => {
      this.checkboxUIStates[subregion.name].checkboxState = newCheckboxState;
    });
    checkboxUIState.current = checkboxUIState.checkboxState === 'checked' ? checkboxUIState.total : 0;

    this.modelChanged.emit(this.checkboxUIStates);
  }

  onSubcategoryChange(newCheckboxState: string, subregion: Subregion) {
    const regionCheckboxUIState = this.checkboxUIStates[this.region.name];
    const subregionCheckboxUIState = this.checkboxUIStates[subregion.name];
    subregionCheckboxUIState.checkboxState = newCheckboxState;
    regionCheckboxUIState.current = _.reduce(this.region.subcategories, (accum, current) => {
      const subregionCheckboxUIState = this.checkboxUIStates[current.name];
      return subregionCheckboxUIState.checkboxState === 'checked' ? accum + subregionCheckboxUIState.total : accum;
    }, 0);

    if (regionCheckboxUIState.current === 0) {
      regionCheckboxUIState.checkboxState = 'unchecked';
    }
    else if (regionCheckboxUIState.current === regionCheckboxUIState.total) {
      regionCheckboxUIState.checkboxState = 'checked';
    }
    else {
      regionCheckboxUIState.checkboxState = 'indeterminate';
    }

    this.modelChanged.emit(this.checkboxUIStates);
  }

  lookup(place: Region | Subregion): CheckboxUIState {
    return this.checkboxUIStates[place.name];
  }
}
