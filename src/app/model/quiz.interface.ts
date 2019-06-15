import { Country } from "./country.interface";
import { QuizTypes } from "./quiz-types.enum";

export interface Quiz {
  currentIndex: number;
  guess: number;
  accuracy: number;
  type: QuizTypes;
  countries: Country[];
  isComplete: boolean;
};
