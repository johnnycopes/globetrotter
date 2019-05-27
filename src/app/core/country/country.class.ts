import { Country } from 'src/app/model/country.interface';
import { CountryService } from './country.service';

export abstract class CountryClass {

  get totalCountries(): number {
    return this.countryService.totalCountries;
  }

  get countriesByRegion(): _.Dictionary<Country[]> {
    return this.countryService.countriesByRegion;
  }

  get countriesBySubregion(): _.Dictionary<Country[]> {
    return this.countryService.countriesBySubregion;
  }

  get subregionsByRegion(): _.Dictionary<string[]> {
    return this.countryService.subregionsByRegion;
  }

  get regions(): string[] {
    return this.countryService.regions;
  }

  get subregions(): string[] {
    return this.countryService.subregions;
  }

  constructor(protected countryService: CountryService) { }
}
