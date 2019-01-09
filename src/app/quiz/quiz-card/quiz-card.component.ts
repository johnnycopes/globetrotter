import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Country } from 'src/app/model/country.interface';
import { QuizService } from '../quiz.service';

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
      state('none', style({
        border: 'none',
        padding: '20px'
      })),
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
  @Input() canFlip: boolean;
  public playState: string;
  public guessState: string;
  public flipState: string;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.flipState = 'front';
  }

  onClick() {
    if (this.canFlip && this.playState !== 'disabled') {
      this.flip();
      this.quizService.evaluateCard(this);
    }
  }

  flip() {
    this.flipState = this.flipState === 'front' ? 'back' : 'front';
  }

  guess(guess: string) {
    this.guessState = guess;
  }

  handleGuess() {
    if (this.guessState === 'correct') {
      this.playState = 'disabled';
    }
    this.guess('none');
  }

}
