import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild
} from '@angular/animations';

import { Country } from 'src/app/model/country.interface';
import { Selection } from 'src/app/select/select.component';
import { Quiz } from 'src/app/model/quiz.interface';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger('100ms', [animateChild()]))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-in', style({ opacity: '1' }))
      ])
    ])
  ]
})
export class QuizComponent implements OnInit {
  @Input() selection: Selection;
  countries: Country[];
  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.initializeCountries();
    this.initializeQuiz();
  }

  private initializeCountries() {
    this.countries = this.quizService.createCountriesList(this.selection);
  }

  private initializeQuiz() {
    this.quizService.createQuiz(this.countries);
    this.quiz = this.quizService.quiz;
  }

}
