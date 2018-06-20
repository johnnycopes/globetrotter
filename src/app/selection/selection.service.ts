import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

import { CountryService } from '../country/country.service';
import { Country } from '../data/country.interface';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private countriesBySubregion: _.Dictionary<Country[]>;
  private subregionsByRegion: _.Dictionary<string[]>;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) {
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
    this.subregionsByRegion = this.countryService.groupSubregionsByRegion();
  }

  countSelections(form: FormGroup) {
    const formModel = form.value;
    const selectionTally = { total: 0 };
    _.forEach(this.subregionsByRegion, (subregions, region) => {
      selectionTally[region] = 0;
      _.forEach(subregions, (subregion) => {
        if (formModel[subregion]) {
          const numberOfCountries = this.countriesBySubregion[subregion].length;
          selectionTally[region] += numberOfCountries;
          selectionTally.total += numberOfCountries;
        }
      });
    })
    return selectionTally;
  }

  evaluateIndeterminate(form: FormGroup, region: string) {
    const formModel = form.value;
    const subregions = this.subregionsByRegion[region];
    const allSubregionsChecked = subregions.every((subregion) => {
      return formModel[subregion] === true;
    });
    const allSubregionsUnchecked = subregions.every((subregion) => {
      return formModel[subregion] === false;
    });
    return {
      allSubregionsChecked,
      allSubregionsUnchecked
    };
  }

  createFormModel(regions: string[], subregions: string[], initValue: boolean) {
    const formModelObject = this.createFormModelObject(regions, subregions, initValue);
    return this.fb.group(formModelObject);
  }

  createFormModelUpdate(regions: string[], subregions: string[], initValue: boolean) {
    const formModelObject = this.createFormModelObject(regions, subregions, initValue);
    return formModelObject;
  }

  private createFormModelObject(regions: string[], subregions: string[], initValue: boolean) {
    const formModel = {};
    if (regions) {
      _.forEach(regions, (value) => {
        formModel[value] = this.fb.group({
          checked: initValue,
          indeterminate: false
        })
      });
    }
    _.forEach(subregions, (value) => {
      formModel[value] = initValue;
    });
    return formModel;
  }
}
