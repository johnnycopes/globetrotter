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
      state('front', style({
        transform: 'rotateY(0)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front => back', animate('300ms ease-in')),
      transition('back => front', animate('300ms ease-out'))
    ]),
    trigger('play', [
      state('disabled', style({
        filter: 'grayscale(100%)'
      })),
      transition('* => disabled', animate('300ms ease-in'))
    ]),
    trigger('guess', [
      state('correct', style({
        border: '20px solid limegreen',
        padding: '0'
      })),
      state('incorrect', style({
        border: '20px solid crimson',
        padding: '0'
      })),
      transition('* => *', animate('300ms ease-in'))
    ])
  ]
})
export class QuizCardComponent implements OnInit {
  @Input() country: Country;
  quiz: Quiz;
  flipState: string;
  playState: string;
  guessState: string;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quiz = this.quizService.quiz;
    this.flipState = 'front';
  }

  flipCard() {
    if (this.flipState === 'back' || this.playState === 'disabled') {
      return;
    }
    this.flipState = this.flipState === 'front' ? 'back' : 'front';
    setTimeout(() => this.guessState = this.quizService.evaluateGuess(this.country), 300);
    setTimeout(() => this.flipState = 'front', 1500);
    setTimeout(() => {
      if (this.guessState === 'correct') {
        this.playState = 'disabled';
      }
      this.guessState = '';
    }, 1800);
  }
}
