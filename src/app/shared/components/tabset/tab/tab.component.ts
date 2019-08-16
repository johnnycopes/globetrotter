import { Component, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { Animation } from 'src/app/shared/model/animation.enum';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animation.screenTransition}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class TabComponent {
  @Input() name: string;
  @Input() selected: boolean;

  constructor() { }

}
