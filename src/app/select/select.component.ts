import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Country } from '../shared/model/country.interface';
import { CountryService } from '../shared/country/country.service';
import { SelectService, SelectionTally, FormModelObject } from './select.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  public totalCountries: number;
  public countriesByRegion: _.Dictionary<Country[]>;
  public countriesBySubregion: _.Dictionary<Country[]>;
  public subregionsByRegion: _.Dictionary<string[]>;
  public regions: string[];
  public subregions: string[];
  public selectionTally: SelectionTally;
  public selectionForm: FormGroup;
  @Output() selectionMade = new EventEmitter<FormModelObject>();

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit() {
    this.totalCountries = this.countryService.getTotalCountries();
    this.countriesByRegion = this.countryService.groupCountriesByProperty('region');
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
    this.subregionsByRegion = this.countryService.groupSubregionsByRegion();
    this.regions = Object.keys(this.subregionsByRegion);
    this.subregions = Object.keys(this.countriesBySubregion);
    this.initializeForm();
    this.updateSelectionTally();
  }

  onSubmit() {
    this.selectionMade.emit(this.selectionForm.value);
    console.log(this.selectionForm);
  }

  onSelectAll() {
    const updatedFormModel = this.selectService.createFormModel(this.regions, this.subregions, true);
    this.selectionForm.setValue(updatedFormModel.value);
  }

  onClearAll() {
    const updatedFormModel = this.selectService.createFormModel(this.regions, this.subregions, false);
    this.selectionForm.setValue(updatedFormModel.value);
  }

  onRegionChange(region: HTMLInputElement) {
    const subregions = this.subregionsByRegion[region.value];
    const updateToFormModel = this.selectService.createRegionAndSubregionsUpdate(region.value, subregions, region.checked);
    this.selectionForm.patchValue(updateToFormModel);
  }

  onSubregionChange(region: HTMLInputElement) {
    const updateToFormModel = this.selectService.createRegionUpdate(this.selectionForm, region.value);
    this.selectionForm.patchValue(updateToFormModel);
  }

  private initializeForm() {
    this.selectionForm = this.selectService.createFormModel(this.regions, this.subregions, true);
    this.selectionForm.valueChanges.subscribe(() => {
      this.updateSelectionTally();
    });
  }

  private updateSelectionTally() {
    this.selectionTally = this.selectService.countSelections(this.selectionForm);
  }
}
