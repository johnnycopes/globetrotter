import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Quiz } from 'src/app/shared/model/quiz.class';
import { EQuizType } from 'src/app/shared/model/quiz-type.enum';
import { FixedSlideablePanelPosition } from 'src/app/shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { EAnimationDuration } from 'src/app/shared/model/animation-duration.enum';
import { RouteNames } from 'src/app/shared/model/route-names.enum';
import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

interface ViewModel {
  quiz: Quiz,
  prompt: string;
}

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit {
  vm$: Observable<ViewModel>;
  private positionChanged = new BehaviorSubject<FixedSlideablePanelPosition>('header');
  private quiz$: Observable<Quiz>;
  private position$: Observable<FixedSlideablePanelPosition>;
  private prompt$: Observable<string>;
  private promptDict: _.Dictionary<string> = {
    [EQuizType.flagsCountries]: 'name',
    [EQuizType.capitalsCountries]: 'name',
    [EQuizType.countriesCapitals]: 'capital'
  };

  constructor(
    private quizService: QuizService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.quiz$,
      this.position$,
      this.prompt$
    ]).pipe(
      map(([quiz, position, prompt]) => ({quiz, position, prompt}))
    );
  }

  onBack(): void {
    this.quizService.reset();
    this.router.navigate([RouteNames.learn]);
  }

  private initializeStreams(): void {
    this.quiz$ = this.quizService.getQuiz().pipe(
      distinctUntilChanged(),
      tap(async (quiz) => {
        if (quiz.isComplete) {
          this.positionChanged.next('offscreen');
          await this.utilityService.wait(EAnimationDuration.cardsFadeInDelay);
          this.positionChanged.next('fullscreen');
        } else {
          this.positionChanged.next('header');
        }
      })
    );
    this.position$ = this.positionChanged.asObservable().pipe(
      distinctUntilChanged()
    );
    this.prompt$ = this.quiz$.pipe(
      map(quiz => {
        const currentCountry = _.head(quiz.countries);
        const key = this.promptDict[quiz.type];
        return _.get(currentCountry, key, '');
      }),
      distinctUntilChanged()
    );
  }
}
