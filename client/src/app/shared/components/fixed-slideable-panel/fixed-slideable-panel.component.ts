import { Component, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  state,
  transition
} from '@angular/animations';

import { AnimationTimes } from 'src/app/shared/model/animation-times.enum';

export type FixedSlideablePanelPosition = 'offscreen' | 'header' | 'fullscreen';

@Component({
  selector: 'app-fixed-slideable-panel',
  templateUrl: './fixed-slideable-panel.component.html',
  styleUrls: ['./fixed-slideable-panel.component.scss'],
  animations: [
    trigger('position', [
      state('offscreen', style({
        transform: 'translateY(-100vh)'
      })),
      state('header', style({
        transform: 'translateY(calc(-100vh + 96px))' // this value must kept in sync with the header height in SCSS
      })),
      state('fullscreen', style({
        transform: 'translateY(0)'
      })),
      transition('* => *', animate(`${AnimationTimes.fixedSlideablePanel}ms ease-in-out`))
    ])
  ]
})
export class FixedSlideablePanelComponent {
  @Input() position: FixedSlideablePanelPosition;

  constructor() { }

}
