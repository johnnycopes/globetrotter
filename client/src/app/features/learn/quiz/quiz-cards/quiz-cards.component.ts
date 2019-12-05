import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, stagger, animateChild, useAnimation } from '@angular/animations';
import { Observable } from 'rxjs';
import { map, first, distinctUntilChanged} from 'rxjs/operators';
import * as _ from 'lodash';

import { Country } from 'src/app/shared/model/country.interface';
import { QuizType } from 'src/app/shared/model/quiz-type.enum';
import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { AnimationTimes } from 'src/app/shared/model/animation-times.enum';
import { fadeIn } from 'src/app/shared/utility/animations';

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  animations: [
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger(`${AnimationTimes.cardsStagger}ms`, [animateChild()]))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: { timing: AnimationTimes.screenTransition }
        })
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
