import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, first, distinctUntilChanged} from 'rxjs/operators';
import * as _ from 'lodash';

import { Country } from 'src/app/shared/model/country.interface';
import { Quiz } from 'src/app/shared/model/quiz.class';
import { QuizType } from 'src/app/shared/model/quiz-type.enum';
import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { staggerAnimation, fadeInWithCardsFadeInDelayAnimation } from 'src/app/shared/utility/animations';

interface ViewModel {
  quizType: QuizType;
  countries: Country[];
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
  private quizType$: Observable<QuizType>;
  private countries$: Observable<Country[]>;

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
