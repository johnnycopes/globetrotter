import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild
} from '@angular/animations';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';

import { Country } from 'src/app/model/country.interface';
import { Animations } from 'src/app/model/animations.enum';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { QuizService } from 'src/app/core/quiz/quiz.service';

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  animations: [
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger(`${Animations.cardsStagger}ms`, [animateChild()]))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animations.cardsFadeIn}ms ${Animations.cardsFadeInDelay}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class QuizCardsComponent implements OnInit {
  canFlipCards = true;
  quizType$: Observable<QuizTypes>;
  countries$: Observable<Country[]>;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizType$ = this.quizService.quiz$.pipe(
      distinctUntilKeyChanged('type'),
      map(quiz => quiz.type)
    );
    this.countries$ = this.quizService.quiz$.pipe(
      distinctUntilKeyChanged('countries'),
      map(quiz => quiz.countries)
    );
  }

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }
}
