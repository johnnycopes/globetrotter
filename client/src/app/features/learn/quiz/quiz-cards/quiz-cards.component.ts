import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first, distinctUntilChanged} from 'rxjs/operators';
import * as _ from 'lodash';

import { Country } from 'src/app/shared/model/country.interface';
import { QuizType } from 'src/app/shared/model/quiz-type.enum';
import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { staggerAnimation, fadeInWithCardsFadeInDelayAnimation } from 'src/app/shared/utility/animations';

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
