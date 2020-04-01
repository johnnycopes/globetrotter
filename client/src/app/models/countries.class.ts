import { ICountry } from "./country.interface"
import { IRegion } from "./region.interface";

export class Countries {
  flatCountries: ICountry[] = [];
  countriesBySubregion: _.Dictionary<ICountry[]> = {};
  subregionsByRegion: _.Dictionary<string[]> = {};
  nestedCountries: IRegion[] = [];
}
