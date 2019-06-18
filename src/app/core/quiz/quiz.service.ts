import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { Store } from 'src/app/model/store.class';
import { CountryService } from 'src/app/core/country/country.service';
import { Country } from 'src/app/model/country.interface';
import { Selection } from 'src/app/model/selection.class';
import { Quiz } from 'src/app/model/quiz.class';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly store: Store;

  constructor(private countryService: CountryService) {
    this.store = new Store(new Quiz());
  }

  private get quiz() {
    return this.store.data;
  }

  reset(): void {
    this.store.set([], new Quiz());
  }

  getQuiz(): Observable<Quiz> {
    return this.store.get([]);
  }

  initializeQuiz(selection: Selection): void {
    const countries = this.countryService.getCountriesFromSelection(selection);
    const type = selection.type;
    this.store.set(['countries'], countries);
    this.store.set(['type'], type);
  }

  updateQuiz(correctGuess: boolean): void {
    this.store.transform([], (quiz: Quiz) => {
      const updatedQuiz = _.assign({}, quiz);
      if (correctGuess) {
        updatedQuiz.currentIndex = quiz.currentIndex + 1;
        if (updatedQuiz.currentIndex >= quiz.countries.length) {
          updatedQuiz.accuracy = this.calculateAccuracy(quiz);
          updatedQuiz.isComplete = true;
        }
      }
      if (!updatedQuiz.isComplete) {
        updatedQuiz.guess = quiz.guess + 1;
      }
      return updatedQuiz;
    });
  }

  evaluateGuess(guessedCountry: Country): boolean {
    const currentCountry = this.quiz.countries[this.quiz.currentIndex];
    return guessedCountry === currentCountry;
  }

  private calculateAccuracy(quiz: Quiz): number {
    return Math.round((quiz.countries.length / quiz.guess) * 100);
  }
}
