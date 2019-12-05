import { Component, Input } from '@angular/core';

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

  constructor() { }

}
