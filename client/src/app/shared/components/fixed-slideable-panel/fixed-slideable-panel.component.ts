import { Component, Input, Output, EventEmitter } from '@angular/core';

import { positionAnimation } from '../../utility/animations';

export type FixedSlideablePanelPosition = 'offscreen' | 'header' | 'fullscreen';

@Component({
  selector: 'app-fixed-slideable-panel',
  templateUrl: './fixed-slideable-panel.component.html',
  styleUrls: ['./fixed-slideable-panel.component.scss'],
  animations: [positionAnimation]
})
export class FixedSlideablePanelComponent {
  @Input() position: FixedSlideablePanelPosition;
  @Output() animationStarted = new EventEmitter<AnimationEvent>();
  @Output() animationFinished = new EventEmitter<AnimationEvent>();

  onAnimationStart(event: AnimationEvent): void {
    this.animationStarted.emit(event);
  }

  onAnimationFinish(event: AnimationEvent): void {
    this.animationFinished.emit(event);
  }
}
