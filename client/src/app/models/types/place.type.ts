import { IRegion } from '../interfaces/region.interface';
import { ICountry } from '../interfaces/country.interface';
import { ISubregion } from '../interfaces/subregion.interface';

export type Place = IRegion | ISubregion | ICountry;
