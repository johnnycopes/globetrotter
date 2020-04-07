import { ICountry } from "./country.interface"
import { IRegion } from "./region.interface";
import * as _ from 'lodash';

export interface ICountries {
  flatCountries: ICountry[];
  countriesBySubregion: _.Dictionary<ICountry[]>;
  subregionsByRegion: _.Dictionary<string[]>;
  nestedCountries: IRegion[];
}
