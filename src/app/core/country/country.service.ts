import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { COUNTRIES } from 'src/app/model/countries.data';
import { Country } from 'src/app/model/country.interface';
import { Region } from 'src/app/model/region.interface';

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

  initializeData(): Region[] {
    const data = [];
    _.forEach(this._regions, region => {
      const regionData = {
        name: region,
        subregions: []
      };
      _.forEach(this._subregionsByRegion[region], subregion => {
        const subregionData = {
          name: subregion,
          countries: this._countriesBySubregion[subregion]
        };
        regionData.subregions.push(subregionData);
      });
      data.push(regionData);
    });
    return data;
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
