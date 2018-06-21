import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Country } from '../model/country.interface';
import { CountryService } from '../country/country.service';
import { SelectionService, SelectionTally } from './selection.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  public countriesByRegion: _.Dictionary<Country[]>;
  public countriesBySubregion: _.Dictionary<Country[]>;
  public countriesByName: _.Dictionary<Country>;
  public subregionsByRegion: _.Dictionary<string[]>;
  public regions: string[];
  public subregions: string[];
  public countries: string[];
  public selectionTally: SelectionTally;
  public selectionForm: FormGroup;

  constructor(
    private countryService: CountryService,
    private selectionService: SelectionService
  ) { }

  ngOnInit() {
    this.countriesByRegion = this.countryService.groupCountriesByProperty('region');
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
    this.countriesByName = this.countryService.keyCountriesByProperty('name');
    this.subregionsByRegion = this.countryService.groupSubregionsByRegion();
    this.regions = Object.keys(this.subregionsByRegion);
    this.subregions = Object.keys(this.countriesBySubregion);
    this.countries = Object.keys(this.countriesByName);
    this.initializeForm();
    this.updateSelectionTally();
  }

  onSubmit() {
    console.log(`Let's go!`);
    console.log(this.selectionForm);
  }

  onSelectAll() {
    const updatedFormModel = this.selectionService.createFormModel(this.regions, this.subregions, true);
    this.selectionForm.setValue(updatedFormModel.value);
  }

  onClearAll() {
    const updatedFormModel = this.selectionService.createFormModel(this.regions, this.subregions, false);
    this.selectionForm.setValue(updatedFormModel.value);
  }

  onRegionChange(region: HTMLInputElement) {
    const subregions = this.subregionsByRegion[region.value];
    const updateToFormModel = this.selectionService.createRegionAndSubregionsUpdate(region.value, subregions, region.checked);
    this.selectionForm.patchValue(updateToFormModel);
  }

  onSubregionChange(region: HTMLInputElement) {
    const updateToFormModel = this.selectionService.createRegionUpdate(this.selectionForm, region.value);
    this.selectionForm.patchValue(updateToFormModel);
  }

  private initializeForm() {
    this.selectionForm = this.selectionService.createFormModel(this.regions, this.subregions, true);
    this.selectionForm.valueChanges.subscribe(() => {
      this.updateSelectionTally();
    });
  }

  private updateSelectionTally() {
    this.selectionTally = this.selectionService.countSelections(this.selectionForm);
  }
}
