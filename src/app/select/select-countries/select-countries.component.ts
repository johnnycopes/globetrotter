import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { CountryService, Region } from 'src/app/country/country.service';
import { SelectService } from '../select.service';
import { TreeProvider, CheckboxStates } from 'src/app/shared/new-nested-checkboxes/new-nested-checkboxes.component';

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss']
})
export class SelectCountriesComponent implements OnInit {
  allCountriesSelected = true;
  canStartQuiz = this.allCountriesSelected;
  regions: Region[];
  treeProvider: TreeProvider<any> = {
    getChildItems: (place) => place.subregions || [], // TODO: revisit this later. see if we can enforce this in the TreeProvider interface definition once it's no longer <any>
    getItemDisplayName: (place) => place.name,
    getItemID: (place) => place.name
  };
  private selectedCountries: CheckboxStates;

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit() {
    this.regions = this.countryService.initializeData();
  }

  onCountriesChange(model: CheckboxStates) {
    this.selectedCountries = model;
    this.canStartQuiz = _(model)
      .values()
      .some(checkboxState => checkboxState === 'checked');
  }

  onClick() {
    this.selectService.updateCountries(this.selectedCountries);
    this.selectService.nextScreen('countries');
  }
}
