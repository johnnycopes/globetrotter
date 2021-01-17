import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { State, IStateReadOnly } from '@boninger-works/state/library/core';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { groupBy, reduce, shuffle, map as _map } from "lodash-es";
import { Dictionary } from "lodash";

import { COUNTRY_STATUSES } from '@models/country-statuses.data';
import { COUNTRY_APP_NAMES, COUNTRY_SUMMARY_NAMES } from '@models/country-modifications.data';
import { ICountries } from '@models/countries.interface';
import { ICountry } from '@models/country.interface';
import { IRegion } from '@models/region.interface';
import { ISelection } from '@models/selection.interface';
import { ISummary } from '@models/summary.interface';
import { ErrorService } from '../error/error.service';

type CountriesBySubregion = Dictionary<ICountry[]>;
type SubregionsByRegion = Dictionary<string[]>;

@Injectable({
  providedIn: 'root'
})
export class CountryService implements Resolve<Observable<ICountry[]>> {
  private request: Observable<ICountry[]>;
  private readonly countriesApiUrl = 'https://restcountries.eu/rest/v2/all';
  private readonly wikipediaApiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  private readonly _countries = new State<ICountries>({
    flatCountries: [],
    countriesBySubregion: {},
    subregionsByRegion: {},
    nestedCountries: []
  });
  get countries(): IStateReadOnly<ICountries> {
    return this._countries;
  }

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
    this.initialize();
  }

  resolve(): Observable<ICountry[]> {
    return this.request;
  }

  getCountriesFromSelection(selection: ISelection): Observable<ICountry[]> {
    return this.countries
      .observe(lens => lens.to('countriesBySubregion'))
      .pipe(
        map(countriesBySubregion => {
          const quantity = selection.quantity || undefined;
          const countries = reduce(selection.countries, (accum, checkboxState, placeName) => {
            if (checkboxState === 'checked' && countriesBySubregion[placeName]) {
              const selectedCountries = countriesBySubregion[placeName];
              return accum.concat(selectedCountries);
            }
            return accum;
          }, [] as ICountry[]);
          return shuffle(countries).slice(0, quantity);
        })
      );
  }

  getSummary(countryName: string): Observable<string> {
    const searchTerm = COUNTRY_SUMMARY_NAMES[countryName] || countryName;
    return this.http.get<ISummary>(this.wikipediaApiUrl + searchTerm).pipe(
      map(result => result.extract),
      catchError(() => of("A summary of this country could not be found."))
    );
  }

  private initialize(): void {
    this.request = this.http.get<ICountry[]>(this.countriesApiUrl).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError((error: { message: string }) => {
        this.errorService.setGlobalError(error.message);
        return of([]);
      })
    );
    this.request.subscribe(allCountries => {
      const flatCountries = allCountries.filter(country => COUNTRY_STATUSES[country.name])
      flatCountries.forEach(country => country.name = COUNTRY_APP_NAMES[country.name] || country.name);
      const countriesBySubregion = groupBy(flatCountries, 'subregion');
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
    return reduce(countriesBySubregion, (accum, countries, subregion) => {
      const region = countries?.[0]?.region ?? "ERROR";
      if (!accum[region]) {
        return {
          ...accum,
          [region]: [subregion]
        };
      } else {
        const subregions = accum[region].slice();
        return {
          ...accum,
          [region]: [...subregions, subregion]
        };
      }
    }, {} as Dictionary<string[]>);
  }

  private createFormattedData(countriesBySubregion: CountriesBySubregion, subregionsByRegion: SubregionsByRegion): IRegion[] {
    return reduce(subregionsByRegion, (accum, subregions, region) => {
      const subregionsData = _map(subregions, subregion => {
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
