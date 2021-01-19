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
  currentCountry: ICountry;
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
  private _currentCountry$: Observable<ICountry>;

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
    this._quizType$ = this.quizService.quiz.observe(lens => lens.to("type"));
    this._countries$ = this.quizService.quiz.observe(lens => lens.to("countries")).pipe(
      map(countries => shuffle(countries)),
      first()
    );
    this._currentCountry$ = this.quizService.quiz
      .observe(lens => lens.to("countries").to(0));
  }
}
