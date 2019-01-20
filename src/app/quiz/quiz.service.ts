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
  quiz: Quiz;
  quizCompleted = new Subject<void>();

  constructor(countryService: CountryService) {
    super(countryService)
  }

  selectCountries(selection: Selection): Country[] {
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

  createQuiz(countries: Country[]): void {
    this.quiz = {
      countries: _.shuffle(countries),
      currentIndex: 0,
      guess: 1,
      accuracy: undefined
    };
  }

  evaluateGuess(country: Country) {
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
  }

  private incrementGuessCount(shouldIncrement: boolean) {
    if (shouldIncrement) {
      this.quiz.guess++;
    }
  }
}
