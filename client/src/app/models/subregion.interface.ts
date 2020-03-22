import { ICountry } from "./country.interface";

export interface ISubregion {
  name: string;
  region: string;
  countries: ICountry[];
}
