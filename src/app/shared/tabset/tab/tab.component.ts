import { Component, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { Animations } from 'src/app/model/animations.enum';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animations.screenTransition}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class TabComponent {
  @Input() name: string;
  @Input() selected: boolean;

  constructor() { }

}
