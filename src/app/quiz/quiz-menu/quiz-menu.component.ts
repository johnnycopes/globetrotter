import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilKeyChanged } from 'rxjs/operators';

import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { Country } from 'src/app/model/country.interface';
import { FixedSlideablePanelPosition } from 'src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component';
import { QuizService } from 'src/app/core/quiz/quiz.service';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit {
  currentIndex$: Observable<number>;
  guess$: Observable<number>;
  currentCountry$: Observable<Country>;
  totalCountries$: Observable<number>;
  accuracy$: Observable<number>;
  quizCompleted$: Observable<boolean>;
  menuPosition$: Observable<FixedSlideablePanelPosition>;
  promptTemplate$: Observable<TemplateRef<any>>;
  @ViewChild('countryTemplate') countryTemplate: TemplateRef<any>;
  @ViewChild('capitalTemplate') capitalTemplate: TemplateRef<any>;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.currentIndex$ = this.quizService.quiz$.pipe(
      map(quiz => quiz.currentIndex)
    );
    this.guess$ = this.quizService.quiz$.pipe(
      map(quiz => quiz.guess)
    );
    this.accuracy$ = this.quizService.quiz$.pipe(
      distinctUntilKeyChanged('accuracy'),
      map(quiz => quiz.accuracy)
    );
    this.currentCountry$ = this.quizService.quiz$.pipe(
      // distinctUntilKeyChanged('currentCountry'), // TODO: figure out why this won't work
      map(quiz => quiz.currentCountry)
    );
    this.totalCountries$ = this.quizService.quiz$.pipe(
      distinctUntilKeyChanged('countries'),
      map(quiz => quiz.countries.length)
    );
    this.quizCompleted$ = this.quizService.quiz$.pipe(
      // distinctUntilKeyChanged('isComplete'), // TODO: figure out why this won't work
      map(quiz => quiz.isComplete)
    );
    this.menuPosition$ = this.quizService.quiz$.pipe(
      // distinctUntilKeyChanged('isComplete'), // TODO: figure out why this won't work
      map(quiz => quiz.isComplete ? 'fullscreen' : 'header')
    );
    this.promptTemplate$ = this.quizService.quiz$.pipe(
      distinctUntilKeyChanged('type'),
      map(quiz => this.setPromptTemplate(quiz.type))
    );
  }

  private setPromptTemplate(quizType: QuizTypes): TemplateRef<any> {
    if (quizType === QuizTypes.countriesCapitals) {
      return this.capitalTemplate;
    }
    else {
      return this.countryTemplate;
    }
  }
}
