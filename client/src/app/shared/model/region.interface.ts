import { Subregion } from "./subregion.interface";

export interface Region {
  name: string;
  subregions: Subregion[];
}
