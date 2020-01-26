import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { positionAnimation } from '../../utility/animations';
import { AnimatedComponent } from '../../model/animated-component.class';

export type FixedSlideablePanelPosition = 'offscreen' | 'header' | 'fullscreen';

@Component({
  selector: 'app-fixed-slideable-panel',
  templateUrl: './fixed-slideable-panel.component.html',
  styleUrls: ['./fixed-slideable-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [positionAnimation]
})
export class FixedSlideablePanelComponent extends AnimatedComponent {
  @Input() position: FixedSlideablePanelPosition;
}
