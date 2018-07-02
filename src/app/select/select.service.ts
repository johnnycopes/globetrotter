import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

import { Country } from '../shared/model/country.interface';
import { CountryService } from '../shared/country/country.service';


export type SelectionTally = _.Dictionary<number>;

export type RegionModel = {
  checked: boolean | null;
  indeterminate: boolean;
}
export type SubregionModel = boolean;
export interface FormModelUpdate {
  [place: string]: RegionModel | SubregionModel;
}
export interface FormModelObject {
  [place: string]: FormGroup | boolean;
}

interface IndeterminateStatus {
  allSubregionsChecked: boolean;
  allSubregionsUnchecked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private countriesBySubregion: _.Dictionary<Country[]>;
  private subregionsByRegion: _.Dictionary<string[]>;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
  ) {
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
    this.subregionsByRegion = this.countryService.groupSubregionsByRegion();
  }

  countSelections(form: FormGroup): SelectionTally {
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

  createFormModel(regions: string[], subregions: string[], initValue: boolean): FormGroup {
    const formModelObject = this.createFormModelObject(regions, subregions, initValue);
    return this.fb.group(formModelObject);
  }

  createRegionUpdate(form: FormGroup, region: string): FormModelUpdate {
    const { allSubregionsChecked, allSubregionsUnchecked } = this.evaluateIndeterminate(form, region);
    const formModelUpdate = {[region]: {
      checked: undefined,
      indeterminate: undefined
    }};
    if (!allSubregionsChecked && !allSubregionsUnchecked) {
      formModelUpdate[region].checked = null;
      formModelUpdate[region].indeterminate = true
    }
    else if (allSubregionsChecked) {
      formModelUpdate[region].checked = true;
      formModelUpdate[region].indeterminate = false
    }
    else if (allSubregionsUnchecked) {
      formModelUpdate[region].checked = false;
      formModelUpdate[region].indeterminate = false
    }
    return formModelUpdate;
  }

  createRegionAndSubregionsUpdate(region: string, subregions: string[], isChecked: boolean): FormModelUpdate {
    const formModelUpdate = {};
    formModelUpdate[region] = { indeterminate: false };
    _.forEach(subregions, (subregion) => {
      formModelUpdate[subregion] = isChecked;
    });
    return formModelUpdate;
  }

  private createFormModelObject(regions: string[], subregions: string[], isChecked: boolean): FormModelObject {
    const formModelObject = {};
    _.forEach(regions, (region) => {
      formModelObject[region] = this.fb.group({
        checked: isChecked,
        indeterminate: false
      })
    });
    _.forEach(subregions, (subregion) => {
      formModelObject[subregion] = isChecked;
    });
    return formModelObject;
  }

  private evaluateIndeterminate(form: FormGroup, region: string): IndeterminateStatus {
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
