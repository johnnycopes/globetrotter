import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../model/country.interface';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {
  @Input() country: Country;

  constructor() { }

  ngOnInit() {
  }

}
