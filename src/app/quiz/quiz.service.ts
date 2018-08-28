import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Country } from '../shared/model/country.interface';
import { Quiz } from '../shared/model/quiz.interface';
import { Selection } from 'src/app/select/select.component';
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
    const countries = [];
    const quantity = selection.quantity;
    _.forEach(selection.countries.categories, category => {
      if (category.checkboxState !== 'unchecked') {
        _.forEach(category.subcategories, subcategory => {
          if (subcategory.isChecked) {
            countries.push(subcategory.subcategories);
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
