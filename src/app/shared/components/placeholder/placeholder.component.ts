import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { Animation } from 'src/app/shared/model/animation.enum';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animation.screenTransition}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class PlaceholderComponent {

  constructor() { }

}
