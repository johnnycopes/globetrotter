import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Country } from '../../shared/model/country.interface';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  animations: [
    trigger('flip', [
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class QuizCardComponent implements OnInit {
  @Input() country: Country;
  flag: string;
  flipState: string;

  constructor() { }

  ngOnInit() {
    this.flipState = 'inactive';
  }

  flipCard() {
    this.flipState = this.flipState === 'inactive' ? 'active' : 'inactive';
  }
}
