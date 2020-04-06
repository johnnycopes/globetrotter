import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { State, IStateReadOnly } from '@boninger-works/state/library/core';
import { assign } from '@boninger-works/state/library/transforms/object';
import { shift } from '@boninger-works/state/library/transforms/array';
import { increment } from '@boninger-works/state/library/transforms/numeric';
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
  private readonly _quiz: State<Quiz | undefined>;
  get quiz(): IStateReadOnly<Quiz | undefined> {
    return this._quiz;
  }

  constructor(
    private countryService: CountryService,
    private routerService: RouterService
  ) {
    this._quiz = new State(undefined);
    this.routerService.state
      .observe(lens => lens.to('currentRoute'))
      .pipe(
        filter(route => route.includes(ERoute.select))
      ).subscribe(
        _ => this._quiz.setRoot(undefined)
      );
  }

  initializeQuiz(selection: Selection): void {
    this.countryService.getCountriesFromSelection(selection).subscribe(
      countries => {
        this._quiz.setRoot(new Quiz(
          countries,
          selection.type
        ));
      }
    );
  }

  updateQuiz(correctGuess: boolean): void {
    this._quiz.setBatch(batch => {
      if (correctGuess) {
        batch.set(lens => lens.to('countries').transform(shift()));
        batch.set(lens => lens.to('countriesGuessed').transform(increment()));
        const quiz = this._quiz.get() as Quiz;
        if (!quiz.countries.length) {
          batch.set(lens => lens.to('accuracy').value(this.calculateAccuracy(quiz)));
          batch.set(lens => lens.to('isComplete').value(true));
        }
      }
      else {
        batch.set(lens => lens.to('countries').transform(countries => this.moveGuessedCountryToEnd(countries)));
      }
      if (!(this._quiz.get() as Quiz).isComplete) {
        batch.set(lens => lens.to('guess').transform(increment()));
      }
    });
  }

  private moveGuessedCountryToEnd(countries: ICountry[]): ICountry[] {
    const guessedCountry = countries[0];
    const updatedCountries = _.slice(countries, 1);
    updatedCountries.push(guessedCountry);
    return updatedCountries;
  }

  private calculateAccuracy(quiz: Quiz): number {
    return Math.round((quiz.totalCountries / quiz.guess) * 100);
  }
}
