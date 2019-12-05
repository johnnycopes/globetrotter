import { Component, Input, Output, EventEmitter } from '@angular/core';

import { flipAnimation, guessAnimation, disabledAnimation } from '../../utility/animations';

export type FlipCardSide = 'front' | 'back';
export type FlipCardGuess = 'correct' | 'incorrect' | 'none';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
  animations: [
    flipAnimation,
    guessAnimation,
    disabledAnimation
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
