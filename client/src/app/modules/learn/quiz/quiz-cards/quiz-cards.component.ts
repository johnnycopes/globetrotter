import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, first, distinctUntilChanged} from 'rxjs/operators';
import * as _ from 'lodash';

import { ICountry } from '@models/country.interface';
import { EQuizType } from '@models/quiz-type.enum';
import { QuizService } from '@services/quiz/quiz.service';
import { staggerAnimation, fadeInWithCardsFadeInDelayAnimation } from '@utility/animations';

interface ViewModel {
  quizType: EQuizType;
  countries: ICountry[];
}

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  animations: [
    staggerAnimation,
    fadeInWithCardsFadeInDelayAnimation
  ]
})
export class QuizCardsComponent implements OnInit {
  canFlipCards = true;
  vm$: Observable<ViewModel>;
  private quizType$: Observable<EQuizType>;
  private countries$: Observable<ICountry[]>;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.quizType$,
      this.countries$
    ]).pipe(
      map(([quizType, countries]) => ({quizType, countries}))
    );
  }

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }

  private initializeStreams(): void {
    const quiz$ = this.quizService.getQuiz();
    this.quizType$ = quiz$.pipe(
      map(quiz => quiz.type),
      distinctUntilChanged()
    );
    this.countries$ = quiz$.pipe(
      map(quiz => _.shuffle(quiz.countries)),
      first()
    );
  }
}
