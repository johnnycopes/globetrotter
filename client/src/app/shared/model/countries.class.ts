import { Country } from "./country.interface"
import { Region } from "./region.interface";

export class Countries {
  countries: Country[] = [];
  countriesBySubregion: _.Dictionary<Country[]> = {};
  subregionsByRegion: _.Dictionary<string[]> = {};
  formattedData: Region[] = [];
}
