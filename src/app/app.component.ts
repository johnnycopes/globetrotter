import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { QuizService } from 'src/app/core/quiz/quiz.service';
import { LoaderService } from './core/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appLoading$ = this.loaderService.getLoader();
  quizCompleted$: Observable<boolean>;

  constructor(
    private loaderService: LoaderService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizCompleted$ = this.quizService.getQuiz().pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    );
  }

}
