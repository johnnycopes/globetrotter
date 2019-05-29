import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { Country } from 'src/app/model/country.interface';
import { CountryService } from 'src/app/core/country/country.service';
import { Selection } from 'src/app/model/selection.interface';
import { Quiz } from 'src/app/model/quiz.class';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizSubject = new BehaviorSubject<Quiz>(new Quiz());
  public quiz$ = this.quizSubject.asObservable();

  constructor(private countryService: CountryService) { }

  private get quiz(): Quiz {
    return this.quizSubject.value;
  }

  reset(): void {
    const emptyQuiz = new Quiz([])
    this.quizSubject.next(emptyQuiz);
  }

  initializeQuiz(selection: Selection): void {
    const countries = this.countryService.getCountriesFromSelection(selection);
    const newQuiz = new Quiz(selection.type, countries);
    this.quizSubject.next(newQuiz);
  }

  updateQuiz(correctGuess: boolean): void {
    this.quiz.handleGuess(correctGuess);
    this.quizSubject.next(this.quiz);
  }

  evaluateGuess(guessedCountry: Country): boolean {
    return guessedCountry === this.quiz.currentCountry;
  }
}
