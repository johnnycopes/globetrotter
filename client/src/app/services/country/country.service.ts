import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { State, IStateReadOnly } from '@boninger-works/state/library/core';
import { map, shareReplay, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

import { COUNTRY_STATUSES } from '@models/country-statuses.data';
import { WIKIPEDIA_COUNTRIES } from '@models/wikipedia-country-names.data';
import { Countries } from '@models/countries.class';
import { ICountry } from '@models/country.interface';
import { IRegion } from '@models/region.interface';
import { Selection } from '@models/selection.class';
import { ISummary } from '@models/summary.interface';
import { ErrorService } from '../error/error.service';

type CountriesBySubregion = _.Dictionary<ICountry[]>;
type SubregionsByRegion = _.Dictionary<string[]>;

@Injectable({
  providedIn: 'root'
})
export class CountryService implements Resolve<Observable<ICountry[]>> {
  private request: Observable<ICountry[]>;
  private readonly countriesApiUrl = 'https://restcountries.eu/rest/v2/all';
  private readonly wikipediaApiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  private readonly _countries: State<Countries>;
  get countries(): IStateReadOnly<Countries> {
    return this._countries;
  }

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
    this._countries = new State(new Countries());
    this.initialize();
  }

  resolve(): Observable<ICountry[]> {
    return this.request;
  }

  getCountriesFromSelection(selection: Selection): Observable<ICountry[]> {
    return this.countries
      .observe(lens => lens.to('countriesBySubregion'))
      .pipe(
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

  getSummary(countryName: string): Observable<string> {
    const searchTerm = WIKIPEDIA_COUNTRIES[countryName] || countryName;
    return this.http.get<ISummary>(this.wikipediaApiUrl + searchTerm).pipe(
      map(result => result.extract),
      catchError(() => of("A summary of this country could not be found."))
    );
  }

  private initialize(): void {
    this.request = this.http.get<ICountry[]>(this.countriesApiUrl).pipe(
      shareReplay(),
      catchError(error => {
        this.errorService.setGlobalError(error.message);
        return of([]);
      })
    );
    this.request.subscribe(allCountries => {
      const flatCountries = _.filter(allCountries, country => COUNTRY_STATUSES[country.name]);
      const countriesBySubregion = _.groupBy(flatCountries, 'subregion');
      const subregionsByRegion = this.groupSubregionsByRegion(countriesBySubregion);
      const nestedCountries = this.createFormattedData(countriesBySubregion, subregionsByRegion);
      this._countries.setRoot({
        flatCountries,
        countriesBySubregion,
        subregionsByRegion,
        nestedCountries
      });
    });
  }

  private groupSubregionsByRegion(countriesBySubregion: _.Dictionary<ICountry[]>): _.Dictionary<string[]> {
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
    }, {} as _.Dictionary<string[]>);
  }

  private createFormattedData(countriesBySubregion: CountriesBySubregion, subregionsByRegion: SubregionsByRegion): IRegion[] {
    return _.reduce(subregionsByRegion, (accum, subregions, region) => {
      const subregionsData = _.map(subregions, subregion => {
        return {
          name: subregion,
          region: region,
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
