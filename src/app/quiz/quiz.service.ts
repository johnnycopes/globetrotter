import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Country } from '../model/country.interface';
import { CountryService } from '../country/country.service';
import { FormModelObject } from '../selection/selection.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public countriesByName: _.Dictionary<Country>;
  public countriesByRegion: _.Dictionary<Country[]>;
  public countriesBySubregion: _.Dictionary<Country[]>;

  constructor(private countryService: CountryService) {
    this.countriesByName = this.countryService.keyCountriesByProperty('name');
    this.countriesByRegion = this.countryService.groupCountriesByProperty('region');
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
  }

  createCountriesList(selection: FormModelObject): Country[] {
    const list = _(selection)
      .pickBy((value, key) => {
        if (value && _.isBoolean(value)) {
          return key;
        }
      })
      .flatMap((value, key) => {
        return this.countriesBySubregion[key];
      })
      .value();
    return list;
  }
}
