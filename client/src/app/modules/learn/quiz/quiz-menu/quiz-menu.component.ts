import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import * as _ from 'lodash';

import { Quiz } from '@models/quiz.class';
import { EQuizType } from '@models/quiz-type.enum';
import { ERoute } from '@models/route.enum';
import { TFixedSlideablePanelPosition } from '@shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { QuizService } from '@services/quiz/quiz.service';

interface IViewModel {
  quiz: Quiz,
  prompt: string;
  position: TFixedSlideablePanelPosition;
}

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit {
  vm$: Observable<IViewModel>;
  private positionChanged = new BehaviorSubject<TFixedSlideablePanelPosition>('header');
  private quiz$: Observable<Quiz>;
  private position$: Observable<TFixedSlideablePanelPosition>;
  private prompt$: Observable<string>;
  private promptDict: _.Dictionary<string> = {
    [EQuizType.flagsCountries]: 'name',
    [EQuizType.capitalsCountries]: 'name',
    [EQuizType.countriesCapitals]: 'capital'
  };

  constructor(
    private quizService: QuizService,
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
    this.router.navigate([ERoute.learn]);
  }

  async onMenuAnimationFinish(event: AnimationEvent): Promise<void> {
    if (event.toState === 'offscreen') {
      this.positionChanged.next('fullscreen');
    }
  }

  private initializeStreams(): void {
    this.quiz$ = this.quizService.getQuiz().pipe(
      distinctUntilChanged(),
      tap(async (quiz) => {
        if (quiz.isComplete) {
          this.positionChanged.next('offscreen');
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
