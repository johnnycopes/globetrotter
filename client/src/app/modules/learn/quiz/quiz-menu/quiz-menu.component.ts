import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AnimationEvent } from '@angular/animations';

import { Quiz } from '@models/quiz.class';
import { EQuizType } from '@models/quiz-type.enum';
import { ERoute } from '@models/route.enum';
import { TFixedSlideablePanelPosition } from '@shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { QuizService } from '@services/quiz/quiz.service';
import { ICountry } from '@models/country.interface';

interface IViewModel {
  quiz: Quiz,
  prompt: string;
  position: TFixedSlideablePanelPosition;
}

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizMenuComponent implements OnInit {
  @Output() menuReady = new EventEmitter<true>();
  vm$: Observable<IViewModel>;
  private positionChanged = new BehaviorSubject<TFixedSlideablePanelPosition>('header');
  private quiz$: Observable<Quiz>;
  private position$: Observable<TFixedSlideablePanelPosition>;
  private prompt$: Observable<string>;
  private promptDict: _.Dictionary<(country: ICountry) => string> = {
    [EQuizType.flagsCountries]: country => country.name,
    [EQuizType.capitalsCountries]: country => country.name,
    [EQuizType.countriesCapitals]: country => country.capital
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

  async onBack(): Promise<void> {
    await this.router.navigate([ERoute.learn]);
  }

  onMenuAnimationFinish(event: AnimationEvent): void {
    if (event.toState === 'header') {
      this.menuReady.emit(true);
    } else if (event.toState === 'offscreen') {
      this.positionChanged.next('fullscreen');
    }
  }

  private initializeStreams(): void {
    const quiz$ = this.quizService.quiz.observe(lens => lens.exists());
    this.quiz$ = quiz$.pipe(
      tap(quiz => {
        if (quiz.isComplete) {
          this.positionChanged.next('offscreen');
        }
      })
    );
    this.prompt$ = quiz$.pipe(
      map(quiz => {
        const currentCountry = quiz.countries[0];
        return currentCountry ? this.promptDict[quiz.type](currentCountry) : '';
      })
    );
    this.position$ = this.positionChanged.asObservable().pipe(
      distinctUntilChanged()
    );
  }
}
