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

  createFormModel(regions: string[], subregions: string[], initValue: boolean) {
    const formModelObject = this.createFormModelObject(regions, subregions, initValue);
    return this.fb.group(formModelObject);
  }

  updateRegion(form: FormGroup, region: string) {
    const { allSubregionsChecked, allSubregionsUnchecked } = this.evaluateIndeterminate(form, region);
    const formModel = {[region]: {
      checked: undefined,
      indeterminate: undefined
    }};
    if (!allSubregionsChecked && !allSubregionsUnchecked) {
      formModel[region].checked = null;
      formModel[region].indeterminate = true
    }
    else if (allSubregionsChecked) {
      formModel[region].checked = true;
      formModel[region].indeterminate = false
    }
    else if (allSubregionsUnchecked) {
      formModel[region].checked = false;
      formModel[region].indeterminate = false
    }
    return formModel;
  }

  updateRegionAndSubregions(region: string, subregions: string[], isSelected: boolean) {
    const formModel = this.createFormModelObject([region], subregions, isSelected);
    formModel[region] = { indeterminate: false };
    return formModel;
  }

  private createFormModelObject(regions: string[], subregions: string[], initValue: boolean) {
    const formModel = {};
    _.forEach(regions, (value) => {
      formModel[value] = this.fb.group({
        checked: initValue,
        indeterminate: false
      })
    });
    _.forEach(subregions, (value) => {
      formModel[value] = initValue;
    });
    return formModel;
  }

  private evaluateIndeterminate(form: FormGroup, region: string) {
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
}
