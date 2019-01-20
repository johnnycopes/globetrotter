import { Component, OnInit, Input } from '@angular/core';

import { CountryService, Region } from 'src/app/country/country.service';
import { SelectService } from '../select.service';
import { RegionsModel } from 'src/app/shared/nested-checkboxes-group/nested-checkboxes-group.component';

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss']
})
export class SelectCountriesComponent implements OnInit {
  @Input() allCountriesSelected: boolean;
  regions: Region[];

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit() {
    this.regions = this.countryService.initializeData();
  }

  onCountriesChange(model: RegionsModel) {
    this.selectService.updateCountries(model);
  }

}
