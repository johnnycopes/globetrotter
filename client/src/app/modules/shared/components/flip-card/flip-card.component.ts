import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { flipAnimation, guessAnimation, disabledAnimation } from '@utility/animations';
import { AnimatedComponent } from '@models/animated-component.class';

export type TFlipCardSide = 'front' | 'back';
export type TFlipCardGuess = 'correct' | 'incorrect' | 'none';

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
  @Input() side: TFlipCardSide = 'front';
  @Input() guess: TFlipCardGuess = 'none';
  @Input() canFlip: boolean = true;
  @Input() disabled: boolean = false;
  @Output() flipped = new EventEmitter<TFlipCardSide>();

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
