import { Country } from "./country.interface";
import { QuizTypes } from "./quiz-types.enum";

export class Quiz {
  countriesGuessed = 0;
  totalCountries: number;
  guess: number = 1;
  accuracy: number;
  type: QuizTypes;
  countries: Country[] = [];
  isComplete: boolean = false;
};
