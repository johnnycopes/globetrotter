import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { CountryService } from '../country/country.service';
import { Country } from '../data/country.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private countriesBySubregion: _.Dictionary<Country[]>;
  private subregionsByRegion: _.Dictionary<string[]>;

  constructor(private countryService: CountryService) {
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
    this.subregionsByRegion = this.countryService.groupSubregionsByRegion();
  }

  createFormModel(arr: string[], initValue: boolean) {
    const formObj = {};
    _.forEach(arr, (value) => {
      formObj[value] = initValue;
    });
    return formObj;
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
}
