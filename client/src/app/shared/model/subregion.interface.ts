import { ICountry } from "./country.interface";

export interface ISubregion {
  name: string;
  countries: ICountry[];
}
