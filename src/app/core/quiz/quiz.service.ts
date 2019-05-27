import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { Country } from 'src/app/model/country.interface';
import { CountryService } from 'src/app/core/country/country.service';
import { Selection } from 'src/app/model/selection.interface';
import { Quiz } from 'src/app/model/quiz.class';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quiz: Quiz;
  private quizComplete: boolean;
  quizUpdated = new BehaviorSubject<Quiz>(this.quiz);
  quizCompleted = new BehaviorSubject<boolean>(this.quizComplete);

  constructor(private countryService: CountryService) {
    this.reset();
  }

  reset(): void {
    this.quizComplete = false;
    this.pushQuizCompleted();
  }

  initializeQuiz(selection: Selection): void {
    this.quiz = new Quiz(
      selection.type,
      this.getCountries(selection)
    );
    this.pushQuizUpdated();
  }

  evaluateGuess(guessedCountry: Country): boolean {
    return guessedCountry === this.quiz.currentCountry;
  }

  updateQuiz(correctGuess: boolean): void {
    if (correctGuess) {
      this.quiz.nextCountry();
      this.quizComplete = this.quiz.isComplete;
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

  private getCountries(selection: Selection): Country[] {
    return this.countryService.getCountriesFromSelection(selection);
  }

  private pushQuizUpdated(): void {
    this.quizUpdated.next(this.quiz);
  }

  private pushQuizCompleted(): void {
    this.quizCompleted.next(this.quizComplete);
  }
}
