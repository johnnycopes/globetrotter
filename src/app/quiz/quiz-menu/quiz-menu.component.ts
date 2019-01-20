import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import {
  trigger,
  style,
  animate,
  state,
  transition
} from '@angular/animations';
import * as _ from 'lodash';

import { Country } from 'src/app/model/country.interface';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss'],
  animations: [
    trigger('position', [
      state('offscreen', style({
        opacity: 0,
        transform: 'translateY(-100vh)'
      })),
      state('header', style({
        opacity: 1,
        transform: 'translateY(calc(-100vh + 128px))' // TODO: set the header height dynamically using HostListener
      })),
      state('fullscreen', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('* => *', animate('500ms ease-in-out'))
    ])
  ]
})
export class QuizMenuComponent implements OnChanges {
  @Input() countries: Country[];
  @Input() currentIndex: number;
  @Input() guess: number;
  @Input() accuracy: number;
  position: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (_.get(changes, 'countries.firstChange')) {
      this.position = 'header';
    }
    else if (_.get(changes, 'accuracy.currentValue')) {
      this.position = 'fullscreen';
    }
  }

}
