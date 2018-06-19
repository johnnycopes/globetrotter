import { Injectable } from '@angular/core';
import { COUNTRIES } from './country-data';
import { Country } from '../data/country.interface';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries: Country[] = COUNTRIES;
  private readonly validRegions = ['Asia', 'Africa', 'Americas', 'Europe', 'Oceania'];

  constructor() {
    this.sanitizeCountries();
  }

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

  private sanitizeCountries() {
    _.forEach(this.countries, (country) => {
      if (!this.validRegions.includes(country.region)) {
        country.region = 'Miscellaneous';
        country.subregion = 'N/A';
      }
    });
  }
}
