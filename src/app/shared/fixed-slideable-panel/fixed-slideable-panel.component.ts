import { Component, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  state,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-fixed-slideable-panel',
  templateUrl: './fixed-slideable-panel.component.html',
  styleUrls: ['./fixed-slideable-panel.component.scss'],
  animations: [
    trigger('position', [
      state('offscreen', style({
        opacity: 0,
        transform: 'translateY(-100vh)'
      })),
      state('header', style({
        opacity: 1,
        transform: 'translateY(calc(-100vh + 128px))' // this value must kept in sync with the header height in SCSS
      })),
      state('fullscreen', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('* => *', animate('500ms ease-in-out'))
    ])
  ]
})
export class FixedSlideablePanelComponent {
  @Input() position: string;

  constructor() { }

}
