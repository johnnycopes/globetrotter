import { Country } from "./country.interface";

export class Quiz {
  public currentIndex: number = 0;
  public guess: number = 1;
  public accuracy: number;

  constructor(
    public countries: Country[]
  ) { }

  calculateAccuracy(): void {
    this.accuracy = Math.round((this.countries.length / this.guess) * 100);
  }

  nextCountry(): void {
    this.currentIndex++;
  }

  nextGuess(): void {
    this.guess++;
  }

  checkIfComplete(): boolean {
    return this.currentIndex === this.countries.length;
  }

  getCurrentCountry(): Country {
    return this.countries[this.currentIndex];
  }
}
