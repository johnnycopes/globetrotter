import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { CountryService, Region } from 'src/app/country/country.service';
import { SelectService } from '../select.service';
import { CheckboxStates, TreeProvider } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';
import { Place, PlacesTreeProvider } from 'src/app/model/places-tree-provider.class';

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss']
})
export class SelectCountriesComponent implements OnInit {
  regions: Region[];
  canStartQuiz: boolean;
  treeProvider: TreeProvider<Place> = new PlacesTreeProvider();
  private selectedCountries: CheckboxStates;

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit() {
    this.regions = this.countryService.initializeData();
    console.log(this.regions);
  }

  onCountriesChange(model: CheckboxStates) {
    this.selectedCountries = model;
    this.canStartQuiz = _.some(model, checkboxState => checkboxState === 'checked');
  }

  onClick() {
    this.selectService.updateCountries(this.selectedCountries);
    this.selectService.nextScreen('countries');
  }
}
