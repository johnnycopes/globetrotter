import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { flipAnimation, guessAnimation, disabledAnimation } from '@utility/animations';
import { AnimatedComponent } from '@models/animated-component.class';

export type FlipCardSide = 'front' | 'back';
export type FlipCardGuess = 'correct' | 'incorrect' | 'none';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    flipAnimation,
    guessAnimation,
    disabledAnimation
  ]
})
export class FlipCardComponent extends AnimatedComponent {
  @Input() side: FlipCardSide = 'front';
  @Input() guess: FlipCardGuess;
  @Input() canFlip: boolean = true;
  @Input() disabled: boolean;
  @Output() flipped = new EventEmitter<FlipCardSide>();

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
