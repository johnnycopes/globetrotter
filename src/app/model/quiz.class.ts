import { Country } from './country.interface';
import { QuizTypes } from './quiz-types.enum';

class Quiz {
  private _currentIndex: number = 0;
  private _guess: number = 1;
  private _accuracy: number;
  private keyDict: _.Dictionary<string> = {
    [QuizTypes.flagsCountries]: 'name',
    [QuizTypes.capitalsCountries]: 'name',
    [QuizTypes.countriesCapitals]: 'capital'
  };


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

  get prompt(): string {
    const key = this.keyDict[this._type];
    return this.currentCountry[key];
  }

  get isInProgress(): boolean {
    return this._countries.length > 0;
  }

  get isComplete(): boolean {
    return (this.isInProgress && this._currentIndex === this._countries.length);
  }

  handleGuess(correctGuess: boolean): Quiz {
    const newQuiz = new Quiz(this.type, this.countries);

    newQuiz._currentIndex = this._currentIndex;
    newQuiz._accuracy = this._accuracy;
    newQuiz._guess = this._guess;

    if (correctGuess) {
      newQuiz.nextCountry();
    }
    if (newQuiz.isComplete) {
      newQuiz.calculateAccuracy();
    }
    else {
      newQuiz.nextGuess();
    }
    return newQuiz;

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
