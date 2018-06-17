import { Injectable } from '@angular/core';
import { COUNTRIES } from './country-data';
import { Country } from '../data/country.interface';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries: Country[] = COUNTRIES;

  constructor() { }

  keyCountriesByProperty(property: string): _.Dictionary<Country> {
    return _.keyBy(this.countries, property);
  }

  groupCountriesByProperty(property: string): _.Dictionary<Country[]> {
    return _.groupBy(this.countries, property);
  }

  groupSubregionsByRegion(): _.Dictionary<string[]> {
    return _.reduce(this.countries, (accum, value) => {
      const region = value.region;
      const subregion = value.subregion;
      if (!accum[region]) {
        accum[region] = [];
      }
      if (!accum[region].includes(subregion)) {
        accum[region].push(subregion);
      }
      return accum;
    }, {});
  }

}
