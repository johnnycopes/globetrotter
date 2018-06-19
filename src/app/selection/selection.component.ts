import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Country } from '../data/country.interface';
import { CountryService } from '../country/country.service';
import { SelectionService } from './selection.service';

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
  public selectionTally: _.Dictionary<number>;
  public selectionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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

  selectAll() {
    const regionsAndSubregions = [...this.regions, ...this.subregions];
    const updatedFormModel = this.selectionService.createFormModel(regionsAndSubregions, true);
    this.selectionForm.setValue(updatedFormModel);
  }

  clearAll() {
    const regionsAndSubregions = [...this.regions, ...this.subregions];
    const updatedFormModel = this.selectionService.createFormModel(regionsAndSubregions, false);
    this.selectionForm.setValue(updatedFormModel);
  }

  onRegionChange(region: HTMLInputElement) {
    const subregions = this.subregionsByRegion[region.value];
    const updatedFormModel = this.selectionService.createFormModel(subregions, region.checked);
    this.selectionForm.patchValue(updatedFormModel);
  }

  onSubregionChange(region: HTMLInputElement) {
    const { allSubregionsChecked, allSubregionsUnchecked } = this.selectionService.evaluateIndeterminate(this.selectionForm, region.value);
    if (!allSubregionsChecked && !allSubregionsUnchecked) {
      region.indeterminate = true;
    }
    else if (allSubregionsChecked) {
      region.indeterminate = false;
      this.selectionForm.patchValue({ [region.value]: true });
    }
    else if (allSubregionsUnchecked) {
      region.indeterminate = false;
      this.selectionForm.patchValue({ [region.value]: false });
    }
  }

  private initializeForm() {
    const regionsAndSubregions = [...this.regions, ...this.subregions];
    const formModel = this.selectionService.createFormModel(regionsAndSubregions, true);
    this.selectionForm = this.fb.group(formModel);
    this.selectionForm.valueChanges.subscribe(() => {
      this.updateSelectionTally();
    });
  }

  private updateSelectionTally() {
    this.selectionTally = this.selectionService.countSelections(this.selectionForm);
  }
}
