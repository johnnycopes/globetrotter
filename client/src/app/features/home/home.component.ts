import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';

import { AnimationTimes } from 'src/app/shared/model/animation-times.enum';
import { RouteNames } from 'src/app/shared/model/route-names.enum';
import { fadeIn } from 'src/app/shared/utility/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent {

  constructor(private router: Router) { }

  onClick(): void {
    this.router.navigate([RouteNames.learn]);
  }
}
