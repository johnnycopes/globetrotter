import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { FixedSlideablePanelPosition } from 'src/app/shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { Quiz } from 'src/app/shared/model/quiz.class';
import { QuizType } from 'src/app/shared/model/quiz-type.enum';
import { AnimationTimes } from 'src/app/shared/model/animation-times.enum';
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
  position: FixedSlideablePanelPosition;
  private quiz$: Observable<Quiz>;
  private prompt$: Observable<string>;
  private promptDict: _.Dictionary<string> = {
    [QuizType.flagsCountries]: 'name',
    [QuizType.capitalsCountries]: 'name',
    [QuizType.countriesCapitals]: 'capital'
  };

  constructor(
    private quizService: QuizService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quiz$ = this.quizService.getQuiz();
    this.prompt$ = this.quiz$.pipe(
      map(quiz => {
        const currentCountry = _.head(quiz.countries);
        const key = this.promptDict[quiz.type];
        return _.get(currentCountry, key, '');
      }),
      distinctUntilChanged()
    );
    this.vm$ = combineLatest([
      this.quiz$,
      this.prompt$
    ]).pipe(
      map(([quiz, prompt]) => ({quiz, prompt})),
      tap(async ({ quiz }) => {
        if (quiz.isComplete) {
          this.position = 'offscreen';
          await this.utilityService.wait(AnimationTimes.cardsFadeInDelay);
          this.position = 'fullscreen';
        } else {
          this.position = 'header';
        }
      })
    );
  }

  onBack(): void {
    this.quizService.reset();
    this.router.navigate([RouteNames.learn]);
  }
}
