import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SelectService } from './select/select.service';
import { QuizService } from './quiz/quiz.service';
import { Pages } from './model/pages.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  quizStarted: boolean;
  quizCompleted: boolean;
  private screenChangedSubscription: Subscription;
  private quizCompletedSubscription: Subscription;

  constructor(
    private selectService: SelectService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.screenChangedSubscription = this.selectService.screenChanged.subscribe(
      (screen) => {
        this.quizStarted = screen === Pages.quiz;
        if (this.quizStarted) {
          this.onQuizStarted();
        }
      }
    );
    this.quizCompletedSubscription = this.quizService.quizCompleted.subscribe(
      (quizCompleted) => this.quizCompleted = quizCompleted
    );
  }

  ngOnDestroy(): void {
    this.screenChangedSubscription.unsubscribe();
    this.quizCompletedSubscription.unsubscribe();
  }

  reset(): void {
    this.quizService.reset();
    this.selectService.reset();
  }

  private onQuizStarted(): void {
    window.scrollTo(0, 0);
  }
}
