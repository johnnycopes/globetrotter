import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
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
export class AppComponent implements OnInit {
  quizStarted$: Observable<boolean>;
  quizCompleted$: Observable<boolean>;

  constructor(
    private pageService: PageService,
    private selectService: SelectService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizCompleted$ = this.quizService.getQuiz().pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    );
    this.quizStarted$ = this.pageService.getPage().pipe(
      map(page => page === Pages.quiz),
      tap(quizStarted => {
        if (quizStarted) {
          window.scrollTo(0, 0);
        }
      })
    );
  }

  reset(): void {
    this.pageService.reset();
    this.quizService.reset();
    this.selectService.reset();
  }
}
