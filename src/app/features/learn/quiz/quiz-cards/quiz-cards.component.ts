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
import { Observable } from 'rxjs';
import { map, first, distinctUntilChanged} from 'rxjs/operators';
import * as _ from 'lodash';

import { Country } from 'src/app/shared/model/country.interface';
import { Animation } from 'src/app/shared/model/animation.enum';
import { QuizType } from 'src/app/shared/model/quiz-type.enum';
import { QuizService } from 'src/app/core/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  animations: [
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger(`${Animation.cardsStagger}ms`, [animateChild()]))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animation.cardsFadeIn}ms ${Animation.cardsFadeInDelay}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class QuizCardsComponent implements OnInit {
  canFlipCards = true;
  quiz$ = this.quizService.getQuiz();
  quizType$: Observable<QuizType>;
  countries$: Observable<Country[]>;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizType$ = this.quiz$.pipe(
      map(quiz => quiz.type),
      distinctUntilChanged()
    );
    this.countries$ = this.quiz$.pipe(
      map(quiz => _.shuffle(quiz.countries)),
      first()
    );
  }

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }
}
