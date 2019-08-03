import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { Animation } from '../model/animation.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animation.screenTransition}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class HomeComponent {

  constructor(private router: Router) { }

  onClick(): void {
    this.router.navigate(['select']);
  }
}
