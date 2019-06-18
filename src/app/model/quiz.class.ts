import { Country } from "./country.interface";
import { QuizTypes } from "./quiz-types.enum";

export class Quiz {
  currentIndex: number = 0;
  guess: number = 1;
  accuracy: number;
  type: QuizTypes;
  countries: Country[] = [];
  isComplete: boolean = false;
};
