import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

import { COUNTRY_STATUSES } from 'src/app/shared/model/country-statuses.data';
import { Country } from 'src/app/shared/model/country.interface';
import { Region } from 'src/app/shared/model/region.interface';
import { Selection } from 'src/app/shared/model/selection.class';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries: Country[];
  private countriesBySubregion: _.Dictionary<Country[]>;
  private subregionsByRegion: _.Dictionary<string[]>;
  private formattedData: Region[];
  private readonly countriesApiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) {
    this.setCountryData();
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

  private setCountryData(): void {
    this.http.get<Country[]>(this.countriesApiUrl).subscribe(countries => {
      this.countries = _.filter(countries, country => COUNTRY_STATUSES[country.name]);
      this.countriesBySubregion = _.groupBy(this.countries, 'subregion');
      this.subregionsByRegion = this.groupSubregionsByRegion(this.countriesBySubregion);
      this.formattedData = this.createFormattedData();
    });
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
