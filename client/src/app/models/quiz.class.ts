import { ICountry } from './country.interface';
import { EQuizType } from './quiz-type.enum';

export class Quiz {
  countriesGuessed = 0;
  guess: number = 1;
  accuracy: number = 100;
  isComplete: boolean = false;
  totalCountries: number;

  constructor(
    public countries: ICountry[],
    public type: EQuizType
  ) {
    this.totalCountries = this.countries.length;
  }
}
