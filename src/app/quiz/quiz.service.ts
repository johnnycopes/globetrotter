import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Country } from 'src/app/model/country.interface';
import { Quiz } from 'src/app/model/quiz.interface';
import { Selection } from 'src/app/select/select.component';
import { CountryClass } from 'src/app/country/country.class';
import { CountryService } from 'src/app/country/country.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends CountryClass {
  public quiz: Quiz;

  constructor(countryService: CountryService) {
    super(countryService)
  }

  createCountriesList(selection: Selection): Country[] {
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
      canFlip: true,
      accuracy: null
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
