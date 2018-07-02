import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Country } from '../shared/model/country.interface';
import { FormModelObject } from '../select/select.service';
import { CountryService } from '../shared/country/country.service';
import { QuizCardComponent } from './quiz-card/quiz-card.component';

export interface Quiz {
  countries: Country[];
  currentIndex: number;
  guess: number;
  canFlip: boolean;
  accuracy: number | undefined
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public countriesByName: _.Dictionary<Country>;
  public countriesByRegion: _.Dictionary<Country[]>;
  public countriesBySubregion: _.Dictionary<Country[]>;
  public quiz: Quiz;

  constructor(private countryService: CountryService) {
    this.countriesByName = this.countryService.keyCountriesByProperty('name');
    this.countriesByRegion = this.countryService.groupCountriesByProperty('region');
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
  }

  createCountriesList(selection: FormModelObject): Country[] {
    const list = _(selection)
      .pickBy((value, key) => {
        if (value && _.isBoolean(value)) {
          return key;
        }
      })
      .flatMap((value, key) => {
        return this.countriesBySubregion[key];
      })
      .shuffle()
      .value();
    return list;
  }

  createQuiz(selection: FormModelObject): void {
    this.quiz = {
      countries: this.createCountriesList(selection),
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

  updateQuiz(guess?: string): void {
    this.incrementGuesses();
    this.quiz.currentIndex++;
    if (this.quiz.currentIndex === this.quiz.countries.length) {
      // if all cards have been guessed, calculate the user's score and display it
      this.quiz.accuracy = Math.round((this.quiz.countries.length / this.quiz.guess) * 100);
    }
  }

  private incrementGuesses(): void {
    this.quiz.guess++
    this.quiz.canFlip = true;
  }

}
