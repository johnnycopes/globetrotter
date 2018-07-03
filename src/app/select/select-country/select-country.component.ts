import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Country } from '../../shared/model/country.interface';
import { CountryTally } from '../../shared/model/select.interface';
import { CountryService } from '../../shared/country/country.service';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() tally: CountryTally;
  public totalCountries: number;
  public countriesByRegion: _.Dictionary<Country[]>;
  public countriesBySubregion: _.Dictionary<Country[]>;
  public subregionsByRegion: _.Dictionary<string[]>;
  public regions: string[];
  public subregions: string[];

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit() {
    this.totalCountries = this.countryService.totalCountries;
    this.countriesByRegion = this.countryService.countriesByRegion;
    this.countriesBySubregion = this.countryService.countriesBySubregion;
    this.subregionsByRegion = this.countryService.subregionsByRegion;
    this.regions = this.countryService.regions;
    this.subregions = this.countryService.subregions;
  }

  onSelectAll() {
    const updatedFormModel = this.selectService.createCountryForm(true);
    this.form.setValue(updatedFormModel.value);
  }

  onClearAll() {
    const updatedFormModel = this.selectService.createCountryForm(false);
    this.form.setValue(updatedFormModel.value);
  }

  onRegionChange(region: HTMLInputElement) {
    const subregions = this.subregionsByRegion[region.value];
    const updateToFormModel = this.selectService.createRegionAndSubregionsUpdate(region.value, subregions, region.checked);
    this.form.patchValue(updateToFormModel);
  }

  onSubregionChange(region: HTMLInputElement) {
    const updateToFormModel = this.selectService.createRegionUpdate(this.form, region.value);
    this.form.patchValue(updateToFormModel);
  }

}
