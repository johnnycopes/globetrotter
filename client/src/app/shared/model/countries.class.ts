import { ICountry } from "./country.interface"
import { IRegion } from "./region.interface";

export class Countries {
  countries: ICountry[] = [];
  countriesBySubregion: _.Dictionary<ICountry[]> = {};
  subregionsByRegion: _.Dictionary<string[]> = {};
  formattedData: IRegion[] = [];
}
