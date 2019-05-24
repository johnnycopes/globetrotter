import { Country } from "./country.interface";

export class Quiz {
  private _currentIndex: number = 0;
  private _guess: number = 1;
  private _accuracy: number;

  constructor(
    private _countries: Country[]
  ) { }

  get currentIndex() {
    return this._currentIndex;
  }

  get guess() {
    return this._guess;
  }

  get accuracy() {
    return this._accuracy;
  }

  get countries() {
    return this._countries;
  }

  calculateAccuracy(): void {
    this._accuracy = Math.round((this._countries.length / this._guess) * 100);
  }

  nextCountry(): void {
    this._currentIndex++;
  }

  nextGuess(): void {
    this._guess++;
  }

  checkIfComplete(): boolean {
    return this._currentIndex === this._countries.length;
  }

  getCurrentCountry(): Country {
    return this._countries[this._currentIndex];
  }
}
