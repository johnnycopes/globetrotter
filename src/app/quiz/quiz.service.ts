import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Country } from '../shared/model/country.interface';
import { FormModelObject } from '../selection/selection.service';
import { CountryService } from '../shared/country/country.service';
import { QuizCardComponent } from './quiz-card/quiz-card.component';

export interface Quiz {
  countries: Country[];
  currentIndex: number;
  guess: number;
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
      guess: 1
    };
  }

  evaluateCard(card: QuizCardComponent): void {
    // create boolean to disallow this function from running if it's running
    if (!card.canFlip) {
      return;
    }
    card.flip();
    card.canFlip = false;

    const cardCountry = card.country.name;
    const currentCountry = this.quiz.countries[this.quiz.currentIndex].name;
    setTimeout(() => {
      if (cardCountry === currentCountry) {
        card.guessState = 'correct'
      }
      else {
        card.guessState = 'incorrect';
      }
    }, 300);
    setTimeout(() => card.flip(), 1500);
    setTimeout(() => {
      if (card.guessState === 'correct') {
        card.playState = 'disabled';
        setTimeout(() => {
          this.quiz.currentIndex++;
          this.quiz.guess++
        }, 300);
      }
      else if (card.guessState === 'incorrect') {
        card.canFlip = true;
        card.guessState = '';
        this.quiz.guess++
      }
    }, 1800);
  }

}
