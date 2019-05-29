import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, distinctUntilKeyChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { SelectService } from 'src/app/core/select/select.service';
import { QuizService } from 'src/app/core/quiz/quiz.service';
import { Pages } from './model/pages.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  quizStarted: boolean;
  private screenChangedSubscription: Subscription;
  public quizCompleted$: Observable<boolean>;

  constructor(
    private selectService: SelectService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizCompleted$ = this.quizService.quiz$.pipe(
      distinctUntilKeyChanged('isComplete'),
      map(quiz => _.get(quiz, 'isComplete', false))
    );
    this.screenChangedSubscription = this.selectService.screenChanged.subscribe(
      (screen) => {
        this.quizStarted = screen === Pages.quiz;
        if (this.quizStarted) {
          this.onQuizStarted();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.screenChangedSubscription.unsubscribe();
  }

  reset(): void {
    this.quizService.reset();
    this.selectService.reset();
  }

  private onQuizStarted(): void {
    window.scrollTo(0, 0);
  }
}
