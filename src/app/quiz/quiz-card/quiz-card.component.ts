import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Country } from '../../shared/model/country.interface';
import { QuizService, Quiz } from '../quiz.service';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  animations: [
    trigger('flip', [
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class QuizCardComponent implements OnInit {
  @Input() country: Country;
  quiz: Quiz;
  guessState: string;
  flipState: string;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quiz = this.quizService.quiz;
    this.flipState = 'inactive';
  }

  flipCard() {
    if (this.flipState === 'active') {
      return;
    }
    this.flipState = this.flipState === 'inactive' ? 'active' : 'inactive';
    this.guessState = this.quizService.evaluateGuess(this.country);
    setTimeout(() => {
      this.flipState = 'inactive';
      this.guessState = '';
    }, 1500);
  }
}
