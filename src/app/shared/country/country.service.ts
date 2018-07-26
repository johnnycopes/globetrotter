import { Injectable } from '@angular/core';
import { COUNTRIES } from '../model/countries.model';
import { Country } from '../model/country.interface';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _countries: Country[] = COUNTRIES;
  private _totalCountries: number;
  private _countriesByRegion: _.Dictionary<Country[]>;
  private _countriesBySubregion: _.Dictionary<Country[]>;
  private _subregionsByRegion: _.Dictionary<string[]>;
  private _regions: string[];
  private _subregions: string[];
  private readonly validRegions = ['Asia', 'Africa', 'Americas', 'Europe', 'Oceania'];

  constructor() {
    this.standarizeCountries();
    this._totalCountries = this.countries.length;
    this._countriesByRegion = _.groupBy(this.countries, 'region');
    this._countriesBySubregion = _.groupBy(this.countries, 'subregion');
    this._subregionsByRegion = this.groupSubregionsByRegion();
    this._regions = Object.keys(this._subregionsByRegion);
    this._subregions = Object.keys(this._countriesBySubregion);
  }

  get countries(): Country[] {
    return this._countries;
  }

  get totalCountries(): number {
    return this._totalCountries;
  }

  get countriesByRegion(): _.Dictionary<Country[]> {
    return this._countriesByRegion;
  }

  get countriesBySubregion(): _.Dictionary<Country[]> {
    return this._countriesBySubregion;
  }

  get subregionsByRegion(): _.Dictionary<string[]> {
    return this._subregionsByRegion;
  }

  get regions(): string[] {
    return this._regions;
  }

  get subregions(): string[] {
    return this._subregions;
  }

  private groupSubregionsByRegion(): _.Dictionary<string[]> {
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
    _.forEach(this._countries, (country) => {
      if (!this.validRegions.includes(country.region)) {
        country.region = 'Miscellaneous';
        country.subregion = 'N/A';
      }
    });
  }
}
