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

type CountriesBySubregion = Dictionary<ICountry[]>;
type SubregionsByRegion = Dictionary<string[]>;

interface ICountryState {
  flatCountries: ICountry[];
  countriesBySubregion: Dictionary<ICountry[]>;
  subregionsByRegion: Dictionary<string[]>;
  nestedCountries: IRegion[];
}

@Injectable({
  providedIn: "root"
})
export class CountryService implements Resolve<Observable<ICountry[]>> {
  private request: Observable<ICountry[]>;
  private readonly _countries = new State<ICountryState>({
    flatCountries: [],
    countriesBySubregion: {},
    subregionsByRegion: {},
    nestedCountries: []
  });
  get countries(): IStateReadOnly<ICountryState> {
    return this._countries;
  }

  constructor(private _apiService: ApiService) {
    this._initialize();
  }

  resolve(): Observable<ICountry[]> {
    return this.request;
  }

  getCountriesFromSelection(selection: ISelection): Observable<ICountry[]> {
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

  getSummary(countryName: string): Observable<string> {
    const searchTerm = COUNTRY_SUMMARY_NAMES[countryName] || countryName;
    return this._apiService.fetchSummary(searchTerm);
  }

  private _initialize(): void {
    this._apiService.fetchCountries().subscribe(allCountries => {
      const flatCountries = allCountries.filter(country => COUNTRY_STATUSES[country.name])
      flatCountries.forEach(country => country.name = COUNTRY_APP_NAMES[country.name] || country.name);
      const countriesBySubregion = groupBy(flatCountries, "subregion");
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
