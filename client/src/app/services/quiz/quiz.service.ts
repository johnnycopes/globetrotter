import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { State, IStateReadOnly } from '@boninger-works/state';
import * as _ from 'lodash';

import { ERoute } from '@models/route.enum';
import { ICountry } from '@models/country.interface';
import { Selection } from '@models/selection.class';
import { Quiz } from '@models/quiz.class';
import { CountryService } from '@services/country/country.service';
import { RouterService } from '@services/router/router.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly _quiz: State<Quiz>;
  get quiz(): IStateReadOnly<Quiz> {
    return this._quiz;
  }

  constructor(
    private countryService: CountryService,
    private routerService: RouterService
  ) {
    this._quiz = new State(new Quiz());
    this.routerService.state
      .observe(lens => lens.to('currentRoute'))
      .pipe(
        filter(route => route.includes(ERoute.select))
      ).subscribe(
        _ => this.reset()
      );
  }

  reset(): void {
    this._quiz.set(new Quiz());
  }

  getQuiz(): Observable<Quiz> {
    return this.quiz.observe();
  }

  initializeQuiz(selection: Selection): void {
    this.countryService.getCountriesFromSelection(selection).subscribe(
      countries => {
        const quiz = {
          ...this.quiz.get(),
          countries,
          totalCountries: countries.length,
          type: selection.type
        };
        this._quiz.set(quiz);
      }
    );
  }

  updateQuiz(correctGuess: boolean): void {
    const quiz = this._quiz.get();
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
    this._quiz.set(updatedQuiz);
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
