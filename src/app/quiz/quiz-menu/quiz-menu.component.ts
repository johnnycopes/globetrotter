import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import {
  trigger,
  style,
  animate,
  state,
  transition
} from '@angular/animations';

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
        transform: 'translateY(-90vh)'
      })),
      state('fullscreen', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('* => *', animate('400ms ease-in'))
    ])
  ]
})
export class QuizMenuComponent implements OnInit, OnChanges {
  @Input() countries: Country[];
  @Input() currentIndex: number;
  @Input() guess: number;
  @Input() accuracy: number;
  public positionState: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // TODO: improve/reconsider these animations
    if (changes.countries && changes.countries.firstChange) {
      this.positionState = 'header';
    }
    else if (changes.accuracy && typeof changes.accuracy.currentValue === 'number') {
      this.positionState = 'fullscreen';
    }
  }

}
