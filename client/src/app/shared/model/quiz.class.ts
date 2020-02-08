import { Country } from './country.interface';
import { QuizType } from './quiz-type.enum';

export class Quiz {
  countriesGuessed = 0;
  totalCountries: number;
  guess: number = 1;
  accuracy: number;
  type: QuizType;
  countries: Country[] = [];
  isComplete: boolean = false;
};
