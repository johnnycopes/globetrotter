import { ICountry } from './country.interface';
import { EQuizType } from './quiz-type.enum';

export class Quiz {
  countriesGuessed = 0;
  totalCountries: number;
  guess: number = 1;
  accuracy: number;
  type: EQuizType;
  countries: ICountry[] = [];
  isComplete: boolean = false;
};
