import { ISubregion } from "./subregion.interface";

export interface IRegion {
  name: string;
  subregions: ISubregion[];
}
