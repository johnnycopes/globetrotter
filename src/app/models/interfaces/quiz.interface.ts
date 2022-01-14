import { EQuizType } from "@models/enums/quiz-type.enum";
import { ICountry } from "./country.interface";

export interface IQuiz {
  guess: number;
  accuracy: number;
  isComplete: boolean;
  totalCountries: number;
  correctGuesses: number;
  countries: ICountry[];
  type: EQuizType;
}
