import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Region, Subregion } from 'src/app/country/country.service';

export interface RegionModel {
  name: string;
  checkboxState: string;
  current: number;
  total: number;
  subregions: _.Dictionary<SubregionModel>;
}

interface SubregionModel {
  name: string;
  checkboxState: string;
  total: number;
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
  @Output() modelChanged = new EventEmitter<RegionModel>();
  regionModel: RegionModel = {
    name: '',
    checkboxState: '',
    current: 0,
    total: 0,
    subregions: {}
  };

  constructor() { }

  ngOnInit() {
    this.initializeModel(this.allChecked);
  }

  initializeModel(allChecked: boolean) {
    const model = this.regionModel;
    model.name = this.region.name;
    model.checkboxState = allChecked ? 'checked' : 'unchecked';
    model.total = 0;
    _.forEach(this.region.subregions, (subregion: Subregion) => {
      model.subregions[subregion.name] = {
        name: subregion.name,
        checkboxState: allChecked ? 'checked' : 'unchecked',
        total: subregion.countries.length
      };
      model.total += subregion.countries.length;
    });
    model.current = allChecked ? model.total : 0;

    this.modelChanged.emit(model);
  }

  onRegionChange(newCheckboxState: string) {
    const model = this.regionModel;
    model.checkboxState = newCheckboxState;
    this.region.subregions.forEach(subregion => {
      model.subregions[subregion.name].checkboxState = newCheckboxState;
    });
    model.current = model.checkboxState === 'checked' ? model.total : 0;

    this.modelChanged.emit(model);
  }

  onSubregionChange(newCheckboxState: string, subregion: Subregion) {
    const model = this.regionModel;
    const childModel = model.subregions[subregion.name];
    childModel.checkboxState = newCheckboxState;
    model.current = _.reduce(this.region.subregions, (accum, current) => {
      const childModel = model.subregions[current.name];
      return childModel.checkboxState === 'checked' ? accum + childModel.total : accum;
    }, 0);

    if (model.current === 0) {
      model.checkboxState = 'unchecked';
    }
    else if (model.current === model.total) {
      model.checkboxState = 'checked';
    }
    else {
      model.checkboxState = 'indeterminate';
    }

    this.modelChanged.emit(model);
  }

  lookup(subregion: Subregion): SubregionModel {
    return this.regionModel.subregions[subregion.name];
  }
}
