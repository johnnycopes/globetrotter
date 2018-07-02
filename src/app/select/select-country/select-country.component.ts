import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Country } from '../../shared/model/country.interface';
import { SelectService, SelectionTally } from '../select.service';
import { CountryService } from '../../shared/country/country.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() tally: SelectionTally;
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
    /*
      TODO: reconsider how to distribute the different country data structures between components
      -- maybe define them all in the country service and then reference those in onInit()?
    */
    this.totalCountries = this.countryService.getTotalCountries();
    this.countriesByRegion = this.countryService.groupCountriesByProperty('region');
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
    this.subregionsByRegion = this.countryService.groupSubregionsByRegion();
    this.regions = Object.keys(this.subregionsByRegion);
    this.subregions = Object.keys(this.countriesBySubregion);
  }

  onSelectAll() {
    const updatedFormModel = this.selectService.createFormModel(true);
    this.form.setValue(updatedFormModel.value);
  }

  onClearAll() {
    const updatedFormModel = this.selectService.createFormModel(false);
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
