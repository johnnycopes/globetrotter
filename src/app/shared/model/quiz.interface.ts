import { Country } from "./country.interface";

export interface Quiz {
  countries: Country[];
  currentIndex: number;
  guess: number;
  canFlip: boolean;
  accuracy: number | undefined
}
