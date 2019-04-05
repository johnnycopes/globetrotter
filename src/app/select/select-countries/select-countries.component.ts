import { Component, OnInit, Input } from '@angular/core';

import { CountryService, Region } from 'src/app/country/country.service';
import { SelectService } from '../select.service';
import { RegionsModel } from 'src/app/shared/nested-checkboxes-group/nested-checkboxes-group.component';
import { TreeProvider } from 'src/app/shared/new-nested-checkboxes/new-nested-checkboxes.component';

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss']
})
export class SelectCountriesComponent implements OnInit {
  allCountriesSelected = true;
  // canStartQuiz = this.allCountriesSelected;
  regions: Region[];
  treeProvider: TreeProvider<any> = {
    getChildItems: (place) => place.subregions || [], // TODO: revisit this later. see if we can enforce this in the treeprovier interface definition once it's no longer <any>
    getItemDisplayName: (place) => place.name,
    getItemID: (place) => place.name
  };

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit() {
    this.regions = this.countryService.initializeData();
  }

  onCountriesChange(model: RegionsModel) {
    this.selectService.updateCountries(model);
    // this.canStartQuiz = Boolean(model.current);
  }

  onClick() {
    this.selectService.nextScreen('countries');
  }
}
