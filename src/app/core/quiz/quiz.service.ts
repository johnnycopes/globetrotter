import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { StoreService } from '../store/store.service';
import { CountryService } from 'src/app/core/country/country.service';
import { Country } from 'src/app/model/country.interface';
import { Selection } from 'src/app/model/selection.interface';
import { Quiz } from 'src/app/model/quiz.interface';
import { QuizTypes } from 'src/app/model/quiz-types.enum';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private storeService: StoreService,
    private countryService: CountryService
  ) { }

  private get quiz(): Quiz {
    return this.storeService.data.quiz;
  }

  reset(): void {
    const newQuiz: Quiz = {
      type: QuizTypes.flagsCountries,
      currentIndex: 0,
      guess: 1,
      accuracy: 100,
      countries: [],
      isComplete: false
    };
    this.storeService.set(['quiz'], newQuiz);
  }

  getQuiz(): Observable<Quiz> {
    return this.storeService.get(['quiz']);
  }

  initializeQuiz(selection: Selection): void {
    const countries = this.countryService.getCountriesFromSelection(selection);
    const type = selection.type;
    const updatedQuiz = {
      ...this.quiz,
      countries,
      type
    };
    this.storeService.set(['quiz'], updatedQuiz);
  }

  updateQuiz(correctGuess: boolean): void {
    const updatedQuiz = _.assign({}, this.quiz);
    if (correctGuess) {
      updatedQuiz.currentIndex = this.quiz.currentIndex + 1;
      if (updatedQuiz.currentIndex >= updatedQuiz.countries.length) {
        updatedQuiz.accuracy = this.calculateAccuracy();
        updatedQuiz.isComplete = true;
      }
    }
    if (!this.quiz.isComplete) {
      updatedQuiz.guess = this.quiz.guess + 1;
    }
    this.storeService.set(['quiz'], updatedQuiz);
  }

  evaluateGuess(guessedCountry: Country): boolean {
    const currentCountry = this.quiz.countries[this.quiz.currentIndex];
    return guessedCountry === currentCountry;
  }

  private calculateAccuracy(): number {
    return Math.round((this.quiz.countries.length / this.quiz.guess) * 100);
  }
}
