import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { Store } from '@models/store.class';
import { ICountry } from '@models/country.interface';
import { Selection } from '@models/selection.class';
import { Quiz } from '@models/quiz.class';
import { CountryService } from '../country/country.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly store: Store;

  constructor(private countryService: CountryService) {
    this.store = new Store(new Quiz());
  }

  reset(): void {
    this.store.set([], new Quiz());
  }

  getQuiz(): Observable<Quiz> {
    return this.store.get([]);
  }

  initializeQuiz(selection: Selection): void {
    this.countryService.getCountriesFromSelection(selection).subscribe(
      countries => {
        const type = selection.type;
        this.store.set(['countries'], countries);
        this.store.set(['totalCountries'], countries.length);
        this.store.set(['type'], type);
      }
    );
  }

  updateQuiz(correctGuess: boolean): void {
    this.store.transform([], (quiz: Quiz) => {
      const updatedQuiz = _.assign({}, quiz);
      if (correctGuess) {
        updatedQuiz.countries = this.removeGuessedCountry(quiz.countries);
        updatedQuiz.countriesGuessed = quiz.countriesGuessed + 1;
        if (!updatedQuiz.countries.length) {
          updatedQuiz.accuracy = this.calculateAccuracy(quiz);
          updatedQuiz.isComplete = true;
        }
      }
      else {
        updatedQuiz.countries = this.moveGuessedCountryToEnd(quiz.countries);
      }

      if (!updatedQuiz.isComplete) {
        updatedQuiz.guess = quiz.guess + 1;
      }
      return updatedQuiz;
    });
  }

  private moveGuessedCountryToEnd(countries: ICountry[]): ICountry[] {
    const guessedCountry = countries[0];
    const updatedCountries = this.removeGuessedCountry(countries);
    updatedCountries.push(guessedCountry);
    return updatedCountries;
  }

  private removeGuessedCountry(countries: ICountry[]): ICountry[] {
    return _.slice(countries, 1);
  }

  private calculateAccuracy(quiz: Quiz): number {
    return Math.round((quiz.totalCountries / quiz.guess) * 100);
  }
}
