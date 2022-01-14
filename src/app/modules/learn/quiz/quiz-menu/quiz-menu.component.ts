import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { map, tap, distinctUntilChanged } from "rxjs/operators";
import { Router } from "@angular/router";
import { AnimationEvent } from "@angular/animations";

import { IQuiz } from "@models/interfaces/quiz.interface";
import { EQuizType } from "@models/enums/quiz-type.enum";
import { ERoute } from "@models/enums/route.enum";
import { FixedSlideablePanelPosition } from "@shared/components/fixed-slideable-panel/fixed-slideable-panel.component";
import { QuizService } from "@services/quiz.service";
import { ICountry } from "@models/interfaces/country.interface";

interface IViewModel {
  quiz: IQuiz,
  prompt: string;
  position: FixedSlideablePanelPosition;
}

@Component({
  selector: "app-quiz-menu",
  templateUrl: "./quiz-menu.component.html",
  styleUrls: ["./quiz-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizMenuComponent implements OnInit {
  @Output() menuReady = new EventEmitter<true>();
  public vm$: Observable<IViewModel>;
  private _positionSubject$ = new BehaviorSubject<FixedSlideablePanelPosition>("header");
  private _quiz$: Observable<IQuiz>;
  private _position$: Observable<FixedSlideablePanelPosition>;
  private _prompt$: Observable<string>;
  private _promptDict: Record<EQuizType, (country: ICountry) => string> = {
    [EQuizType.flagsCountries]: country => country.name,
    [EQuizType.capitalsCountries]: country => country.name,
    [EQuizType.countriesCapitals]: country => country.capital
  };

  constructor(
    private _quizService: QuizService,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    this._initializeStreams();
    this.vm$ = combineLatest([
      this._quiz$,
      this._position$,
      this._prompt$
    ]).pipe(
      map(([quiz, position, prompt]) => ({
        quiz,
        position,
        prompt
      }))
    );
  }

  public async onBack(): Promise<void> {
    await this._router.navigate([ERoute.learn]);
  }

  public onMenuAnimationFinish(event: AnimationEvent): void {
    if (event.toState === "header") {
      this.menuReady.emit(true);
    } else if (event.toState === "offscreen") {
      this._positionSubject$.next("fullscreen");
    }
  }

  private _initializeStreams(): void {
    const quiz$ = this._quizService.quiz.observe(lens => lens.exists());
    this._quiz$ = quiz$.pipe(
      tap(quiz => {
        if (quiz.isComplete) {
          this._positionSubject$.next("offscreen");
        }
      })
    );
    this._prompt$ = quiz$.pipe(
      map(quiz => {
        const currentCountry = quiz.countries[0];
        return currentCountry ? this._promptDict[quiz.type](currentCountry) : "";
      })
    );
    this._position$ = this._positionSubject$.asObservable().pipe(
      distinctUntilChanged()
    );
  }
}
