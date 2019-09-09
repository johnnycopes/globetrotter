import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import * as _ from 'lodash';

import { COUNTRY_STATUSES } from 'src/app/shared/model/country-statuses.data';
import { Country } from 'src/app/shared/model/country.interface';
import { Region } from 'src/app/shared/model/region.interface';
import { Selection } from 'src/app/shared/model/selection.class';
import { Store } from 'src/app/shared/model/store.class';
import { LoaderService } from '../loader/loader.service';

type CountriesBySubregion = _.Dictionary<Country[]>;
type SubregionsByRegion = _.Dictionary<string[]>;

interface CountryStoreState {
  countries: Country[];
  countriesBySubregion: CountriesBySubregion;
  subregionsByRegion: SubregionsByRegion;
  formattedData: Region[];
}

@Injectable({
  providedIn: 'root'
})
export class CountryService implements Resolve<Observable<Country[]>> {
  private request: Observable<Country[]>;
  private readonly store: Store;
  private readonly countriesApiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) {
    this.store = new Store({
      countries: [],
      countriesBySubregion: {},
      subregionsByRegion: {},
      formattedData: []
    });
    this.initialize();
  }

  resolve(): Observable<Country[]> {
    this.loaderService.show();
    return this.request;
  }

  initialize(): void {
    this.request = this.http.get<Country[]>(this.countriesApiUrl).pipe(
      delay(1000) // prevent the loader from flashing on the screen too quickly
    );
    this.request.subscribe(allCountries => {
      const countries = _.filter(allCountries, country => COUNTRY_STATUSES[country.name]);
      const countriesBySubregion = _.groupBy(countries, 'subregion');
      const subregionsByRegion = this.groupSubregionsByRegion(countriesBySubregion);
      const formattedData = this.createFormattedData(countriesBySubregion, subregionsByRegion);
      this.store.set(['countries'], countries);
      this.store.set(['countriesBySubregion'], countriesBySubregion);
      this.store.set(['subregionsByRegion'], subregionsByRegion);
      this.store.set(['formattedData'], formattedData);
      this.loaderService.hide();
    });
  }

  getData(): Observable<Region[]> {
    return this.store.get(['formattedData']);
  }

  getCountriesFromSelection(selection: Selection): Observable<Country[]> {
    return this.store.get(['countriesBySubregion']).pipe(
      map(countriesBySubregion => {
        const quantity = selection.quantity || undefined;
        const countries = _.reduce(selection.countries, (accum, checkboxState, placeName) => {
          if (checkboxState === 'checked' && countriesBySubregion[placeName]) {
            const selectedCountries = countriesBySubregion[placeName];
            return _.concat(accum, selectedCountries);
          }
          return accum;
        }, []);
        return _(countries)
          .shuffle()
          .slice(0, quantity)
          .value();
      })
    );
  }

  // private setCountryData(): void {
  //   this.http.get<Country[]>(this.countriesApiUrl).subscribe(allCountries => {
  //     const countries = _.filter(allCountries, country => COUNTRY_STATUSES[country.name]);
  //     const countriesBySubregion = _.groupBy(countries, 'subregion');
  //     const subregionsByRegion = this.groupSubregionsByRegion(countriesBySubregion);
  //     const formattedData = this.createFormattedData(countriesBySubregion, subregionsByRegion);
  //     this.store.set(['countries'], countries);
  //     this.store.set(['countriesBySubregion'], countriesBySubregion);
  //     this.store.set(['subregionsByRegion'], subregionsByRegion);
  //     this.store.set(['formattedData'], formattedData);
  //   });
  // }

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

  private createFormattedData(countriesBySubregion: CountriesBySubregion, subregionsByRegion: SubregionsByRegion): Region[] {
    return _.reduce(subregionsByRegion, (accum, subregions, region) => {
      const subregionsData = _.map(subregions, subregion => {
        return {
          name: subregion,
          countries: countriesBySubregion[subregion]
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
