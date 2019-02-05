import { Component, OnInit, Input } from '@angular/core';

import { CountryService, Region } from 'src/app/country/country.service';
import { SelectService } from '../select.service';
import { RegionsModel } from 'src/app/shared/nested-checkboxes-group/nested-checkboxes-group.component';

export interface CheckboxState {
  current: number;
  total: number;
  checkboxState: string;
}

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss']
})
export class SelectCountriesComponent implements OnInit {
  allCountriesSelected = true;
  canStartQuiz = this.allCountriesSelected;
  regions: Region[];
  treeProvider = {
    getChildItems: (place) => place.subregions,
    getItemDisplayName: (place) => place.name
  };
  checkboxStates: _.Dictionary<CheckboxState> = {};

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit() {
    this.regions = this.countryService.initializeData();
  }

  onCountriesChange(model: RegionsModel) {
    this.selectService.updateCountries(model);
    this.canStartQuiz = Boolean(model.current);
  }

  onClick() {
    this.selectService.nextScreen('countries');
  }

}
