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

import { Country } from 'src/app/model/country.interface';
import { QuizService } from '../quiz.service';
import { Animations } from 'src/app/model/animations.enum';

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
  countries: Country[];
  canFlipCards = true;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.countries = this.quizService.getCountries();
  }

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }
}
