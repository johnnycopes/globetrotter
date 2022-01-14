import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { State, IStateReadOnly } from "@boninger-works/state/library/core";
import { map } from "rxjs/operators";
import { groupBy, reduce, shuffle, map as _map } from "lodash-es";
import { Dictionary } from "lodash";

import { COUNTRY_STATUSES } from "@models/data/country-statuses";
import { COUNTRY_APP_NAMES, COUNTRY_SUMMARY_NAMES } from "@models/data/country-modifications";
import { ICountry } from "@models/interfaces/country.interface";
import { IRegion } from "@models/interfaces/region.interface";
import { ISelection } from "@models/interfaces/selection.interface";
import { ApiService } from "./api.service";

interface ICountryState {
  flatCountries: ICountry[];
  countriesBySubregion: Dictionary<ICountry[]>;
  nestedCountries: IRegion[];
}

@Injectable({
  providedIn: "root"
})
export class CountryService implements Resolve<Observable<ICountry[]>> {
  private _request: Observable<ICountry[]>;
  private readonly _countries = new State<ICountryState>({
    flatCountries: [],
    countriesBySubregion: {},
    nestedCountries: []
  });
  get countries(): IStateReadOnly<ICountryState> {
    return this._countries;
  }

  constructor(private _apiService: ApiService) {
    this._apiService.fetchCountries().subscribe(countriesData => {
      const flatCountries = this._sanitizeRawData(countriesData);
      const countriesBySubregion = groupBy(flatCountries, "subregion");
      const subregionsByRegion = this._groupSubregionsByRegion(countriesBySubregion);
      const nestedCountries = this._formatNestedCountries(countriesBySubregion, subregionsByRegion);
      this._countries.setRoot({
        flatCountries,
        countriesBySubregion,
        nestedCountries
      });
    });
  }

  public resolve(): Observable<ICountry[]> {
    return this._request;
  }

  public getCountriesFromSelection(selection: ISelection): Observable<ICountry[]> {
    return this.countries
      .observe(lens => lens.to("countriesBySubregion"))
      .pipe(
        map(countriesBySubregion => {
          const quantity = selection.quantity || undefined;
          const countries = reduce(selection.countries, (accum, checkboxState, placeName) => {
            if (checkboxState === "checked" && countriesBySubregion[placeName]) {
              const selectedCountries = countriesBySubregion[placeName];
              return accum.concat(selectedCountries);
            }
            return accum;
          }, [] as ICountry[]);
          return shuffle(countries).slice(0, quantity);
        })
      );
  }

  public getSummary(countryName: string): Observable<string> {
    const searchTerm = COUNTRY_SUMMARY_NAMES[countryName] || countryName;
    return this._apiService.fetchSummary(searchTerm);
  }

  private _sanitizeRawData(countries: ICountry[]): ICountry[] {
    const sanitizedCountries: ICountry[] = [];
    for (const country of countries) {
      if (COUNTRY_STATUSES[country.name]) {
        country.name = COUNTRY_APP_NAMES[country.name] || country.name;
        sanitizedCountries.push(country);
      }
    }
    return sanitizedCountries;
  }

  private _groupSubregionsByRegion(countriesBySubregion: Dictionary<ICountry[]>): Dictionary<string[]> {
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

  private _formatNestedCountries(
    countriesBySubregion: Dictionary<ICountry[]>,
    subregionsByRegion: Dictionary<string[]>
  ): IRegion[] {
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
    }, [] as IRegion[]);
  }
}
