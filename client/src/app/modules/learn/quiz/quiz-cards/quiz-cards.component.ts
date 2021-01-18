import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { ICountry } from '@models/interfaces/country.interface';
import { EQuizType } from '@models/enums/quiz-type.enum';
import { QuizService } from '@services/quiz.service';
import { staggerAnimation, fadeInAnimation } from '@utility/animations';
import { shuffle } from "lodash-es";

interface IViewModel {
  quizType: EQuizType;
  countries: ICountry[];
  currentCountry: ICountry;
}

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInAnimation,
    staggerAnimation
  ]
})
export class QuizCardsComponent implements OnInit {
  canFlipCards = true;
  vm$: Observable<IViewModel>;
  private quizType$: Observable<EQuizType>;
  private countries$: Observable<ICountry[]>;
  private currentCountry$: Observable<ICountry>;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.quizType$,
      this.countries$,
      this.currentCountry$
    ]).pipe(
      map(([quizType, countries, currentCountry]) => ({ quizType, countries, currentCountry }))
    );
  }

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }

  private initializeStreams(): void {
    this.quizType$ = this.quizService.quiz.observe(lens => lens.to('type'));
    this.countries$ = this.quizService.quiz.observe(lens => lens.to('countries')).pipe(
      map(countries => shuffle(countries)),
      first()
    );
    this.currentCountry$ = this.quizService.quiz
      .observe(lens => lens.to('countries').to(0));
  }
}
