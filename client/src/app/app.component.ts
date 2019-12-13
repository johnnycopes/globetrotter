import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { CountryService } from './core/services/country/country.service';
import { Country } from './shared/model/country.interface';
import { RouteNames } from './shared/model/route-names.enum';
import { ErrorService } from './core/services/error/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  error$: Observable<string>;
  appLoadComplete$: Observable<Country[]>;
  quizComplete$: Observable<boolean>;
  showNavigation$: Observable<boolean>;

  constructor(
    private router: Router,
    private countryService: CountryService,
    private quizService: QuizService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.error$ = this.errorService.getError();
    this.appLoadComplete$ = this.countryService.resolve();
    this.quizComplete$ = this.quizService.getQuiz().pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    );
    this.showNavigation$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((navigationEnd: NavigationEnd) => {
        const routeUrl = navigationEnd.urlAfterRedirects.split('/')[1];
        return routeUrl !== RouteNames.learn;
      }),
      distinctUntilChanged()
    );
  }
}
