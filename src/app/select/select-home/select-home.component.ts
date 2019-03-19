import { Component } from '@angular/core';
import { SelectService } from '../select.service';
import { Region, CountryService } from 'src/app/country/country.service';

export interface CheckboxState {
  current: number;
  total: number;
  checkboxState: string;
}

@Component({
  selector: 'app-select-home',
  templateUrl: './select-home.component.html',
  styleUrls: ['./select-home.component.scss']
})
export class SelectHomeComponent {
  allCountriesSelected = true;
  canStartQuiz = this.allCountriesSelected;
  regions: Region[];
  treeProvider = {
    getChildItems: (place) => place.subregions,
    getItemDisplayName: (place) => place.name,
    getItemID: (place) => place.name
  };
  checkboxStates: _.Dictionary<CheckboxState> = {};

  constructor(
    private selectService: SelectService,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    this.regions = this.countryService.initializeData();
    console.log("REGIONS:", this.regions);
  }

  onClick() {
    this.selectService.nextScreen('home');
  }

}
