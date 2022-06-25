import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { filter, first, map } from "rxjs/operators";

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
  private readonly _quiz: BehaviorSubject<IQuiz | undefined> = new BehaviorSubject(undefined);
  get quiz(): BehaviorSubject<IQuiz | undefined> {
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
        () => this._quiz.next(undefined)
      );
  }

  public initializeQuiz(selection: ISelection): void {
    this._countryService.getCountriesFromSelection(selection).subscribe(
      countries => {
        this._quiz.next({
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
    this._quiz.pipe(
      first(),

      map(quiz => {
        if (!quiz) {
          return undefined;
        }

        const updatedQuiz = { ...quiz };
        if (correctGuess) {
          updatedQuiz.countries.shift();
          updatedQuiz.correctGuesses++;
          // End the game if there are no remaining countries left to guess
          if (!updatedQuiz.countries.length) {
            updatedQuiz.accuracy = this._calculateAccuracy(updatedQuiz);
            updatedQuiz.isComplete = true;
          }
        } else {
          updatedQuiz.countries = this._moveGuessedCountryToEnd(updatedQuiz.countries);
        }

        // Increment the guess counter if the game isn't over, regardless of whether the guess was right or wrong
        if (!updatedQuiz.isComplete) {
          updatedQuiz.guess++;
        }

        console.log(updatedQuiz.countries);
        return updatedQuiz;
      })
    ).subscribe(quiz => this._quiz.next(quiz));
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
