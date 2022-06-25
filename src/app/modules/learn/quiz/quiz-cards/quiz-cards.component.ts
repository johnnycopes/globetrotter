import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { map, first } from "rxjs/operators";

import { ICountry } from "@models/interfaces/country.interface";
import { EQuizType } from "@models/enums/quiz-type.enum";
import { QuizService } from "@services/quiz.service";
import { staggerAnimation, fadeInAnimation } from "@utility/animations";
import { shuffle } from "lodash-es";

interface IViewModel {
  quizType: EQuizType;
  countries: ICountry[];
  currentCountry: ICountry | undefined;
}

@Component({
  selector: "app-quiz-cards",
  templateUrl: "./quiz-cards.component.html",
  styleUrls: ["./quiz-cards.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInAnimation,
    staggerAnimation
  ]
})
export class QuizCardsComponent implements OnInit {
  public canFlipCards = true;
  public vm$: Observable<IViewModel>;
  private _quizType$: Observable<EQuizType>;
  private _countries$: Observable<ICountry[]>;
  private _currentCountry$: Observable<ICountry | undefined>;

  constructor(private quizService: QuizService) { }

  public ngOnInit(): void {
    this._initializeStreams();
    this.vm$ = combineLatest([
      this._quizType$,
      this._countries$,
      this._currentCountry$
    ]).pipe(
      map(([quizType, countries, currentCountry]) => ({ quizType, countries, currentCountry }))
    );
  }

  public onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }

  private _initializeStreams(): void {
    this._quizType$ = this.quizService.quiz.pipe(
      map(quiz => quiz?.type ?? EQuizType.flagsCountries)
    );
    this._countries$ = this.quizService.quiz.pipe(
      first(),
      map(quiz => shuffle(quiz?.countries ?? [])),
    );
    this._currentCountry$ = this.quizService.quiz.pipe(
      map(quiz => quiz?.countries[0] ?? undefined)
    );
  }
}
