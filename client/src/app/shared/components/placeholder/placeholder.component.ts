import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { AnimationTimes } from 'src/app/shared/model/animation-times.enum';
import { fadeIn } from '../../utility/animations';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: { timing: AnimationTimes.screenTransition }
        })
      ])
    ])
  ]
})
export class PlaceholderComponent {

  constructor() { }

}
