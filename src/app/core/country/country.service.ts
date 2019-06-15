import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { COUNTRIES } from 'src/app/model/countries.data';
import { COUNTRY_STATUSES } from 'src/app/model/country-statuses.data';
import { Country } from 'src/app/model/country.interface';
import { Region } from 'src/app/model/region.interface';
import { Selection } from 'src/app/model/selection.class';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries: Country[];
  private countriesBySubregion: _.Dictionary<Country[]>;
  private subregionsByRegion: _.Dictionary<string[]>;
  private formattedData: Region[];

  constructor() {
    this.countries = _.filter(COUNTRIES, country => COUNTRY_STATUSES[country.name]);
    this.countriesBySubregion = _.groupBy(this.countries, 'subregion');
    this.subregionsByRegion = this.groupSubregionsByRegion(this.countriesBySubregion);
    this.formattedData = this.createFormattedData();
  }

  get data(): Region[] {
    return this.formattedData;
  }

  getCountriesFromSelection(selection: Selection): Country[] {
    const quantity = selection.quantity || undefined;
    const countries = _.reduce(selection.countries, (accum, checkboxState, placeName) => {
      if (checkboxState === 'checked' && this.countriesBySubregion[placeName]) {
        const selectedCountries = this.countriesBySubregion[placeName];
        return _.concat(accum, selectedCountries);
      }
      return accum;
    }, []);
    return _(countries)
      .shuffle()
      .slice(0, quantity)
      .value();
  }

  private groupSubregionsByRegion(countriesBySubregion: _.Dictionary<Country[]>): _.Dictionary<string[]> {
    return _.reduce(countriesBySubregion, (accum, countries, subregion) => {
      const region = _.get(countries, '[0].region', 'ERROR');
      if (!accum[region]) {
        return {
          ...accum,
          [region]: [subregion]
        };
      }
      else {
        const subregions = accum[region].slice();
        return {
          ...accum,
          [region]: [...subregions, subregion]
        };
      }
    }, {});
  }

  private createFormattedData(): Region[] {
    return _.reduce(this.subregionsByRegion, (accum, subregions, region) => {
      const subregionsData = _.map(subregions, subregion => {
        return {
          name: subregion,
          countries: this.countriesBySubregion[subregion]
        };
      });
      const regionData = {
        name: region,
        subregions: subregionsData
      };
      const regions = accum.slice();
      return [...regions, regionData];
    }, []);
  }
}
