import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { CountryService } from './core/services/country/country.service';
import { Country } from './shared/model/country.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appLoadComplete$: Observable<Country[]>;
  quizComplete$: Observable<boolean>;

  constructor(
    private countryService: CountryService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.appLoadComplete$ = this.countryService.resolve();
    this.quizComplete$ = this.quizService.getQuiz().pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    );
  }

}
