import { Component } from '@angular/core';

import { SelectService } from '../select.service';
import { Region, CountryService } from 'src/app/country/country.service';
import { TreeProvider } from 'src/app/shared/new-nested-checkboxes/new-nested-checkboxes.component';

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
  treeProvider: TreeProvider<any> = {
    getChildItems: (place) => place.subregions || [], // TODO: revisit this later. see if we can enforce this in the treeprovier interface definition once it's no longer <any>
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
