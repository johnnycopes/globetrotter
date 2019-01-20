import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { NestedCheckboxesComponent, RegionModel } from '../nested-checkboxes/nested-checkboxes.component';
import { Region } from 'src/app/country/country.service';

export interface RegionsModel {
  current: number;
  total: number;
  regions: _.Dictionary<RegionModel>;
}

@Component({
  selector: 'app-nested-checkboxes-group',
  templateUrl: './nested-checkboxes-group.component.html',
  styleUrls: ['./nested-checkboxes-group.component.scss']
})
export class NestedCheckboxesGroupComponent {
  @Input() regions: Region[]; // The data to be iterated over and passed into the individual nested-checkboxes components, which each control their own model
  @Input() allChecked?: boolean = true; // Sets all checkboxes to be selected or deselected from the start
  @Input() imagePath?: string; // The file path of an image to be displayed next to the nested-checkboxes component up until the name of the file itself (e.g. `assets/icons`)
  @Input() imageType?: string; // The extension that gets concatenated onto the end of the file path (e.g. `svg`)
  @Output() modelChanged = new EventEmitter<RegionsModel>();
  @ViewChildren(NestedCheckboxesComponent) nestedCheckboxesComponents: QueryList<NestedCheckboxesComponent>
  model: RegionsModel = {
    current: 0,
    total: 0,
    regions: {}
  };

  constructor() { }

  onSelectAll() {
    this.model.regions = {};
    this.nestedCheckboxesComponents.forEach(instance => instance.initializeModel(true));
  }

  onClearAll() {
    this.model.regions = {};
    this.nestedCheckboxesComponents.forEach(instance => instance.initializeModel(false));
  }

  onModelChange(model: RegionModel) {
    this.model.regions[model.name] = model;

    // once all models have been sent up from the children components, calculate the tally of currently-selected and total options and emit the completed model a single time
    if (Object.keys(this.model.regions).length === this.regions.length) {
      const tally = _.reduce(this.model.regions, (accum, current) => {
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
