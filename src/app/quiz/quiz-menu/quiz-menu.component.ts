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
  position = 'header';
  countries: Country[];
  currentIndex: number;
  guess: number;
  accuracy: number;
  quizSubscription: Subscription;
  quizCompletedSubscription: Subscription;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizSubscription = this.quizService.quizUpdated.subscribe(
      (quiz) => {
        const { countries, currentIndex, guess, accuracy } = quiz;
        this.countries = countries;
        this.currentIndex = currentIndex;
        this.guess = guess;
        this.accuracy = accuracy;
      }
    );
    this.quizCompletedSubscription = this.quizService.quizCompleted.subscribe(
      (quizCompleted) => {
        if (quizCompleted) {
          this.position = 'fullscreen';
        }
      }
    );
  }

  ngOnDestroy() {
    this.quizSubscription.unsubscribe();
    this.quizCompletedSubscription.unsubscribe();
  }

}
