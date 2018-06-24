import { Injectable } from '@angular/core';
import { COUNTRIES } from '../model/countries.model';
import { Country } from '../model/country.interface';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CountryService {z
  private countries: Country[] = COUNTRIES;
  private readonly validRegions = ['Asia', 'Africa', 'Americas', 'Europe', 'Oceania'];

  constructor() {
    this.standarizeCountries();
  }

  getTotalCountries() {
    return this.countries.length;
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

  private standarizeCountries() {
    _.forEach(this.countries, (country) => {
      if (!this.validRegions.includes(country.region)) {
        country.region = 'Miscellaneous';
        country.subregion = 'N/A';
      }
    });
  }
}
