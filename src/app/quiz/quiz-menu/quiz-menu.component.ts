import { Component, OnInit, Input } from '@angular/core';

import { Country } from '../../shared/model/country.interface';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit {
  @Input() countries: Country[];
  @Input() currentIndex: number;
  @Input() guess: number;

  constructor() { }

  ngOnInit() {
  }

}
