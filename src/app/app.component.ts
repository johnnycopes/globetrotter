import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import * as _ from 'lodash';

import { QuizService } from 'src/app/core/quiz/quiz.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  quizCompleted$: Observable<boolean>;
  quizStartedSubscription = new Subscription();

  constructor(
    private router: Router,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizCompleted$ = this.quizService.getQuiz().pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    );
    this.quizStartedSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      )
      .subscribe(
        (event: NavigationStart) => {
          if (event.url === '/quiz') {
            window.scrollTo(0, 0);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.quizStartedSubscription.unsubscribe();
  }
}
