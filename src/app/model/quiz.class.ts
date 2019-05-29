import { Country } from './country.interface';
import { QuizTypes } from './quiz-types.enum';

export class Quiz {
  private _currentIndex: number = 0;
  private _guess: number = 1;
  private _accuracy: number;

  constructor(
    private _type: QuizTypes = QuizTypes.flagsCountries,
    private _countries: Country[] = []
  ) { }

  get currentIndex(): number {
    return this._currentIndex;
  }

  get guess(): number {
    return this._guess;
  }

  get accuracy(): number {
    return this._accuracy;
  }

  get type(): QuizTypes {
    return this._type;
  }

  get countries(): Country[] {
    return this._countries;
  }

  get currentCountry(): Country {
    return this._countries[this._currentIndex];
  }

  get isComplete(): boolean {
    return (this._currentIndex > 0 && this._currentIndex === this._countries.length);
  }

  handleGuess(correctGuess: boolean): void {
    if (correctGuess) {
      this.nextCountry();
    }
    if (this.isComplete) {
      this.calculateAccuracy();
    }
    else {
      this.nextGuess();
    }
  }

  private calculateAccuracy(): void {
    this._accuracy = Math.round((this._countries.length / this._guess) * 100);
  }

  private nextCountry(): void {
    this._currentIndex++;
  }

  private nextGuess(): void {
    this._guess++;
  }
}
