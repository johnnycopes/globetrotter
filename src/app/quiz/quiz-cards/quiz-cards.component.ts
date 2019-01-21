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

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  animations: [
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger('100ms', [animateChild()]))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('400ms 600ms ease-in-out', style({ opacity: '1' }))
      ])
    ])
  ]
})
export class QuizCardsComponent implements OnInit {
  countries: Country[];
  canFlipCards = true;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.countries = this.quizService.getCountries();
  }

  onFlip(cardFlipped: boolean) {
    this.canFlipCards = !cardFlipped;
  }
}
