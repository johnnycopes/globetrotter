import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

import { Country } from 'src/app/model/country.interface';
import { Selection } from '../select/select.service';
import { CountryClass } from 'src/app/country/country.class';
import { CountryService } from 'src/app/country/country.service';

export interface Quiz {
  countries: Country[];
  currentIndex: number;
  guess: number;
  accuracy: number | undefined
}

@Injectable({
  providedIn: 'root'
})
export class QuizService extends CountryClass {
  quizUpdated = new Subject<void>();
  quizCompleted = new Subject<void>();
  private countries: Country[];
  private quiz: Quiz;

  constructor(countryService: CountryService) {
    super(countryService)
  }

  createQuiz(selection: Selection): void {
    this.countries = this.selectCountries(selection);
    this.quiz = {
      countries: _.shuffle(this.countries),
      currentIndex: 0,
      guess: 1,
      accuracy: undefined
    };
  }

  getQuiz(): Quiz {
    const quiz: Quiz = {
      countries: this.quiz.countries,
      currentIndex: this.quiz.currentIndex,
      guess: this.quiz.guess,
      accuracy: this.quiz.accuracy
    };
    return quiz;
  }

  getCountries(): Country[] {
    return this.countries.slice();
  }

  evaluateGuess(country: Country): boolean {
    const guessedCountry = country;
    const currentCountry = this.quiz.countries[this.quiz.currentIndex];
    return guessedCountry === currentCountry;
  }

  updateQuiz(correctGuess: boolean): void {
    let addGuess = true;
    if (correctGuess) {
      this.quiz.currentIndex++;
      if (this.quiz.currentIndex === this.quiz.countries.length) {
        // if all cards have been guessed, calculate the user's score and display it. do not increment the guess counter
        addGuess = false;
        this.quiz.accuracy = Math.round((this.quiz.countries.length / this.quiz.guess) * 100);
        this.quizCompleted.next();
      }
    }
    this.incrementGuessCount(addGuess);
    this.quizUpdated.next();
  }

  private incrementGuessCount(shouldIncrement: boolean): void {
    if (shouldIncrement) {
      this.quiz.guess++;
    }
  }

  private selectCountries(selection: Selection): Country[] {
    const countries = [];
    const quantity = selection.quantity;
    _.forEach(selection.countries.regions, region => {
      if (region.checkboxState !== 'unchecked') {
        _.forEach(region.subregions, subregion => {
          if (subregion.checkboxState === 'checked') {
            countries.push(this.countriesBySubregion[subregion.name]);
          }
        });
      }
    });
    return _(countries)
      .flatMap()
      .shuffle()
      .slice(0, quantity)
      .value();
  }
}
