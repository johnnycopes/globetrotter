import { Output, EventEmitter } from "@angular/core";
import { AnimationEvent } from '@angular/animations';

export abstract class AnimatedComponent {
  @Output() animationStarted = new EventEmitter<AnimationEvent>();
  @Output() animationFinished = new EventEmitter<AnimationEvent>();

  onAnimationStart(event: AnimationEvent): void {
    this.animationStarted.emit(event);
  }

  onAnimationFinish(event: AnimationEvent): void {
    this.animationFinished.emit(event);
  }
}
