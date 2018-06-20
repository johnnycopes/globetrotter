import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    const updatedFormModel = this.selectionService.createFormModel(this.regions, this.subregions, true);
    this.selectionForm.setValue(updatedFormModel.value);
  }

  clearAll() {
    const updatedFormModel = this.selectionService.createFormModel(this.regions, this.subregions, false);
    this.selectionForm.setValue(updatedFormModel.value);
  }

  onRegionChange(region: HTMLInputElement) {
    const subregions = this.subregionsByRegion[region.value];
    const formModelUpdate = this.selectionService.createFormModelUpdate([region.value], subregions, region.checked);
    formModelUpdate[region.value] = { indeterminate: false };
    this.selectionForm.patchValue(formModelUpdate);
  }

  onSubregionChange(region: HTMLInputElement) {
    const { allSubregionsChecked, allSubregionsUnchecked } = this.selectionService.evaluateIndeterminate(this.selectionForm, region.value);
    if (!allSubregionsChecked && !allSubregionsUnchecked) {
      this.selectionForm.patchValue({
        [region.value]: {
          checked: null,
          indeterminate: true
        }
      });
    }
    else if (allSubregionsChecked) {
      this.selectionForm.patchValue({
        [region.value]: {
          checked: true,
          indeterminate: false
        }
      });
    }
    else if (allSubregionsUnchecked) {
      this.selectionForm.patchValue({
        [region.value]: {
          checked: false,
          indeterminate: false
        }
      });
    }
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
