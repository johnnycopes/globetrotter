import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private countries: Country[];
  private quiz: Quiz;
  private quizComplete: boolean;
  quizUpdated = new BehaviorSubject<Quiz>(this.quiz);
  quizCompleted = new BehaviorSubject<boolean>(this.quizComplete);

  constructor(countryService: CountryService) {
    super(countryService);
    this.reset();
  }

  reset(): void {
    this.quizComplete = false;
    this.pushQuizCompleted();
  }

  createQuiz(selection: Selection): void {
    this.countries = this.selectCountries(selection);
    this.quiz = {
      countries: _.shuffle(this.countries),
      currentIndex: 0,
      guess: 1,
      accuracy: undefined
    };
    this.pushQuizUpdated();
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
        this.quizComplete = true;
        this.pushQuizCompleted();
      }
    }
    this.incrementGuessCount(addGuess);
    this.pushQuizUpdated();
  }

  private pushQuizUpdated(): void {
    this.quizUpdated.next(this.quiz);
  }

  private pushQuizCompleted(): void {
    this.quizCompleted.next(this.quizComplete);
  }

  private incrementGuessCount(shouldIncrement: boolean): void {
    if (shouldIncrement) {
      this.quiz.guess++;
    }
  }

  private selectCountries(selection: Selection): Country[] {
    const quantity = selection.quantity || undefined;
    const countries = _.reduce(selection.countries, (accum, value, placeName) => {
      if (value === 'checked' && this.countriesBySubregion[placeName]) {
        const countries = this.countriesBySubregion[placeName];
        _.forEach(countries, country => {
          accum.push(country);
        });
      }
      return accum;
    }, []);

    return _(countries)
      .shuffle()
      .slice(0, quantity)
      .value();
  }
}
