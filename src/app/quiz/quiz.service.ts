import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Country } from '../shared/model/country.interface';
import { FormModelObject } from '../selection/selection.service';
import { CountryService } from '../shared/country/country.service';

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

  evaluateGuess(guess: Country): string {
    let result = '';
    const currentCountry = this.quiz.countries[this.quiz.currentIndex];
    if (guess.name === currentCountry.name) {
      this.quiz.currentIndex++;
      result = 'correct'
    }
    else {
      result = 'incorrect';
    }
    this.quiz.guess++;
    return result;
  }
}
