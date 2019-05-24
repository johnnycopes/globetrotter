import { Region, Subregion } from "../country/country.service";
import { Country } from "./country.interface";

export type Place = Region | Subregion | Country;
