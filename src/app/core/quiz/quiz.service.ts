import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { CountryService } from 'src/app/core/country/country.service';
import { Country } from 'src/app/model/country.interface';
import { Selection } from 'src/app/model/selection.class';
import { Quiz } from 'src/app/model/quiz.class';
import { Store } from '../utility/store.class';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly store: Store;

  constructor(private countryService: CountryService) {
    this.store = new Store({ quiz: new Quiz() });
  }

  private get quiz(): Quiz {
    return this.store.data.quiz;
  }

  reset(): void {
    this.store.set(['quiz'], new Quiz());
  }

  getQuiz(): Observable<Quiz> {
    return this.store.get(['quiz']);
  }

  initializeQuiz(selection: Selection): void {
    const countries = this.countryService.getCountriesFromSelection(selection);
    const type = selection.type;
    const updatedQuiz = {
      ...this.quiz,
      countries,
      type
    };
    this.store.set(['quiz'], updatedQuiz);
  }

  updateQuiz(correctGuess: boolean): void {
    const updatedQuiz = _.assign({}, this.quiz);
    if (correctGuess) {
      updatedQuiz.currentIndex = this.quiz.currentIndex + 1;
      if (updatedQuiz.currentIndex >= this.quiz.countries.length) {
        updatedQuiz.accuracy = this.calculateAccuracy();
        updatedQuiz.isComplete = true;
      }
    }
    if (!updatedQuiz.isComplete) {
      updatedQuiz.guess = this.quiz.guess + 1;
    }
    this.store.set(['quiz'], updatedQuiz);
  }

  evaluateGuess(guessedCountry: Country): boolean {
    const currentCountry = this.quiz.countries[this.quiz.currentIndex];
    return guessedCountry === currentCountry;
  }

  private calculateAccuracy(): number {
    return Math.round((this.quiz.countries.length / this.quiz.guess) * 100);
  }
}
