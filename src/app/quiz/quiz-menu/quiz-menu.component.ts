import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuizService } from '../quiz.service';
import { Country } from 'src/app/model/country.interface';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit, OnDestroy {
  quizSubscription: Subscription;
  position = 'header';
  countries: Country[];
  currentIndex: number;
  guess: number;
  accuracy: number;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.getQuiz();
    this.quizSubscription = this.quizService.quizUpdated.subscribe(
      () => this.getQuiz()
    );
  }

  ngOnDestroy() {
    this.quizSubscription.unsubscribe();
  }

  private getQuiz() {
    const { countries, currentIndex, guess, accuracy } = this.quizService.getQuiz();
    this.countries = countries;
    this.currentIndex = currentIndex;
    this.guess = guess;
    this.accuracy = accuracy;

    if (this.accuracy) {
      this.position = 'fullscreen';
    }
  }

}
