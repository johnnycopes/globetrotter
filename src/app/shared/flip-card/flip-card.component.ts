import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Animations } from 'src/app/model/animations.enum';

export type FlipCardSide = 'front' | 'back';
export type FlipCardGuess = 'correct' | 'incorrect' | 'none';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
  animations: [
    trigger('flip', [
      state('front', style({
        transform: 'rotateY(0)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front => back', animate(`${Animations.flipCard}ms ease-in`)),
      transition('back => front', animate(`${Animations.flipCard}ms ease-out`))
    ]),
    trigger('disabled', [
      state('disabled', style({
        filter: 'grayscale(100%)',
        cursor: 'not-allowed'
      })),
      transition('* => disabled', animate(`${Animations.flipCard}ms ease-in`))
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
      transition('* => *', animate(`${Animations.flipCard}ms ease-in`))
    ])
  ]
})
export class FlipCardComponent {
  @Input() side: FlipCardSide = 'front';
  @Input() guess: FlipCardGuess;
  @Input() canFlip: boolean = true;
  @Input() disabled: boolean;
  @Output() flipped = new EventEmitter<FlipCardSide>();

  constructor() { }

  onClick(): void {
    if (this.canFlip && !this.disabled) {
      this.flip();
      this.flipped.emit(this.side);
    }
  }

  flip(): void {
    this.side = this.side === 'front' ? 'back' : 'front';
  }
}
