import { IRegion } from './region.interface';
import { ICountry } from './country.interface';
import { ISubregion } from './subregion.interface';

export type TPlace = IRegion | ISubregion | ICountry;
