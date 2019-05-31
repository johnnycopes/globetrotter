import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, distinctUntilKeyChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { QuizService } from 'src/app/core/quiz/quiz.service';
import { SelectService } from './core/select/select.service';
import { PageService } from './core/page/page.service';
import { Pages } from './model/pages.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  quizStarted: boolean;
  private pagesSubscription: Subscription;
  public quizCompleted$: Observable<boolean>;

  constructor(
    private pageService: PageService,
    private selectService: SelectService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizCompleted$ = this.quizService.quiz$.pipe(
      distinctUntilKeyChanged('isComplete'),
      map(quiz => quiz.isComplete)
    );
    this.pagesSubscription = this.pageService.pages$.subscribe(
      page => {
        this.quizStarted = page === Pages.quiz;
        if (this.quizStarted) {
          this.onQuizStarted();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.pagesSubscription.unsubscribe();
  }

  reset(): void {
    this.pageService.reset();
    this.quizService.reset();
    this.selectService.reset();
  }

  private onQuizStarted(): void {
    window.scrollTo(0, 0);
  }
}
