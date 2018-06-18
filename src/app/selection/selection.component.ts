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
  public subregionsByRegion: _.Dictionary<String[]>;
  public regions: string[];
  public subregions: string[];
  public selectionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private selectionService: SelectionService
  ) { }

  ngOnInit() {
    this.countriesByRegion = this.countryService.groupCountriesByProperty('region');
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
    this.subregionsByRegion = this.countryService.groupSubregionsByRegion();
    this.regions = Object.keys(this.subregionsByRegion);
    this.subregions = Object.keys(this.countriesBySubregion);
    this.createForm();
  }

  createForm() {
    const subregionsFormModel = this.selectionService.createFormModel(this.subregions, true);
    this.selectionForm = this.fb.group(subregionsFormModel);
  }

}
