import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { Country } from 'src/app/model/country.interface';
import { Selection } from '../select/select.service';
import { CountryClass } from 'src/app/country/country.class';
import { CountryService } from 'src/app/country/country.service';
import { Quiz } from '../model/quiz.class';
import { QuizTypes } from '../model/quiz-types.enum';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends CountryClass {
  private countries: Country[];
  private quizType: QuizTypes;
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

  initializeQuiz(selection: Selection): void {
    this.quizType = selection.type;
    this.countries = this.selectCountries(selection);
    this.quiz = new Quiz(_.shuffle(this.countries));
    this.pushQuizUpdated();
  }

  getCountries(): Country[] {
    return this.countries;
  }

  getQuizType(): QuizTypes {
    return this.quizType;
  }

  evaluateGuess(country: Country): boolean {
    const guessedCountry = country;
    const currentCountry = this.quiz.getCurrentCountry();
    return guessedCountry === currentCountry;
  }

  updateQuiz(correctGuess: boolean): void {
    if (correctGuess) {
      this.quiz.nextCountry();
      this.quizComplete = this.quiz.checkIfComplete();
      if (this.quizComplete) {
        this.quiz.calculateAccuracy();
        this.pushQuizCompleted();
      }
    }
    if (!this.quizComplete) {
      this.quiz.nextGuess();
    }
    this.pushQuizUpdated();
  }

  private pushQuizUpdated(): void {
    this.quizUpdated.next(this.quiz);
  }

  private pushQuizCompleted(): void {
    this.quizCompleted.next(this.quizComplete);
  }

  private selectCountries(selection: Selection): Country[] {
    const quantity = selection.quantity || undefined;
    const countries = _.reduce(selection.countries, (accum, value, placeName) => {
      if (value === 'checked' && this.countriesBySubregion[placeName]) {
        const selectedCountries = this.countriesBySubregion[placeName];
        return _.concat(accum, selectedCountries);
      }
      return accum;
    }, []);

    return _(countries)
      .shuffle()
      .slice(0, quantity)
      .value();
  }
}
