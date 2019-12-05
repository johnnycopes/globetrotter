import { Component, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { AnimationTimes } from 'src/app/shared/model/animation-times.enum';
import { fadeIn } from 'src/app/shared/utility/animations';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
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
export class TabComponent {
  @Input() name: string;
  @Input() selected: boolean;

  constructor() { }

}
