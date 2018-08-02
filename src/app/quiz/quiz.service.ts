import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Country } from '../shared/model/country.interface';
import { Quiz } from '../shared/model/quiz.interface';
import { Selection } from '../shared/model/select.interface';
import { CountryClass } from '../shared/country/country.class';
import { CountryService } from '../shared/country/country.service';
import { QuizCardComponent } from './quiz-card/quiz-card.component';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends CountryClass {
  public quiz: Quiz;

  constructor(countryService: CountryService) {
    super(countryService)
  }

  createCountriesList(selection: Selection): Country[] {
    const countries = selection.countriesForm;
    const quantity = selection.quantity;
    return _(countries)
      .pickBy((value, key) => {
        if (value && _.isBoolean(value)) {
          return key;
        }
      })
      .flatMap((value, key) => {
        return this.countriesBySubregion[key];
      })
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

  evaluateCard(card: QuizCardComponent): void {
    this.quiz.canFlip = false;
    const cardCountry = card.country.name;
    const currentCountry = this.quiz.countries[this.quiz.currentIndex].name;
    const guess = cardCountry === currentCountry ? 'correct' : 'incorrect';
    setTimeout(() => card.guess(guess), 300);
    setTimeout(() => card.flip(), 1500);
    setTimeout(() => {
      card.handleGuess();
      if (guess === 'correct') {
        setTimeout(() => this.updateQuiz(), 300);
      }
      else if (guess === 'incorrect') {
        this.incrementGuesses();
      }
    }, 1800);
  }

  updateQuiz(): void {
    this.quiz.currentIndex++;
    if (this.quiz.currentIndex === this.quiz.countries.length) {
      // if all cards have been guessed, calculate the user's score and display it
      this.quiz.accuracy = Math.round((this.quiz.countries.length / this.quiz.guess) * 100);
    }
    else {
      this.incrementGuesses();
    }
  }

  private incrementGuesses(): void {
    this.quiz.guess++
    this.quiz.canFlip = true;
  }

}
