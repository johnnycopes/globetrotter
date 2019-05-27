import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

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
export class QuizCardsComponent implements OnInit, OnDestroy {
  countries: Country[];
  quizType: QuizTypes;
  canFlipCards = true;
  private quizSubscription: Subscription;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizSubscription = this.quizService.quizUpdated
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(
        quiz => {
          this.quizType = quiz.type;
          this.countries = _.shuffle(quiz.countries);
        }
    );
  }

  ngOnDestroy(): void {
    this.quizSubscription.unsubscribe();
  }

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }
}
