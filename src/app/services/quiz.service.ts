import { Injectable } from "@angular/core";
import { filter, map } from "rxjs/operators";
import { State, IStateReadOnly } from "@boninger-works/state/library/core";
import { shift } from "@boninger-works/state/library/transforms/array";
import { increment } from "@boninger-works/state/library/transforms/numeric";

import { ERoute } from "@models/enums/route.enum";
import { ICountry } from "@models/interfaces/country.interface";
import { ISelection } from "@models/interfaces/selection.interface";
import { IQuiz } from "@models/interfaces/quiz.interface";
import { CountryService } from "@services/country.service";
import { RouterService } from "@services/router.service";

@Injectable({
  providedIn: "root"
})
export class QuizService {
  private readonly _quiz: State<IQuiz | undefined> = new State(undefined);
  get quiz(): IStateReadOnly<IQuiz | undefined> {
    return this._quiz;
  }

  constructor(
    private _countryService: CountryService,
    private _routerService: RouterService
  ) {
    this._routerService.state
      .pipe(
        map(({ currentRoute }) => currentRoute),
        filter(route => route.includes(ERoute.select))
      ).subscribe(
        () => this._quiz.setRoot(undefined)
      );
  }

  public initializeQuiz(selection: ISelection): void {
    this._countryService.getCountriesFromSelection(selection).subscribe(
      countries => {
        this._quiz.setRoot({
          guess: 1,
          correctGuesses: 0,
          type: selection.type,
          countries: countries,
          totalCountries: countries.length,
          accuracy: 100,
          isComplete: false,
        });
      }
    );
  }

  public updateQuiz(correctGuess: boolean): void {
    this._quiz.setBatch(batch => {
      if (correctGuess) {
        batch.set(lens => lens.to("countries").transform(shift()));
        batch.set(lens => lens.to("correctGuesses").transform(increment()));
        const quiz = this._quiz.get() as IQuiz;
        // End the game if there are no remaining countries left to guess
        if (!quiz.countries.length) {
          batch.set(lens => lens.to("accuracy").value(this._calculateAccuracy(quiz)));
          batch.set(lens => lens.to("isComplete").value(true));
        }
      } else {
        batch.set(lens => lens.to("countries").transform(countries => this._moveGuessedCountryToEnd(countries)));
      }
      // Increment the guess counter if the game isn't over, regardless of whether the guess was right or wrong
      if (!(this._quiz.get() as IQuiz).isComplete) {
        batch.set(lens => lens.to("guess").transform(increment()));
      }
    });
  }

  private _moveGuessedCountryToEnd(countries: ICountry[]): ICountry[] {
    const guessedCountry = countries[0];
    const updatedCountries = countries.slice(1);
    updatedCountries.push(guessedCountry);
    return updatedCountries;
  }

  private _calculateAccuracy(quiz: IQuiz): number {
    return Math.round((quiz.totalCountries / quiz.guess) * 100);
  }
}
