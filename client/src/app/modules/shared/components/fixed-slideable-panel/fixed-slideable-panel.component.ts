import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { positionAnimation } from '@utility/animations';
import { AnimatedComponent } from '@models/animated-component.class';

export type TFixedSlideablePanelPosition = 'offscreen' | 'header' | 'fullscreen';

@Component({
  selector: 'app-fixed-slideable-panel',
  templateUrl: './fixed-slideable-panel.component.html',
  styleUrls: ['./fixed-slideable-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [positionAnimation]
})
export class FixedSlideablePanelComponent extends AnimatedComponent {
  @Input() position: TFixedSlideablePanelPosition;
}
