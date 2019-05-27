import { Region } from './region.interface';
import { Country } from './country.interface';
import { Subregion } from './subregion.interface';

export type Place = Region | Subregion | Country;
