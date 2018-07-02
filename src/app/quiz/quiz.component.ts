import { Component, OnInit, Input } from '@angular/core';

import { Country } from '../shared/model/country.interface';
import { FormModelObject } from '../select/select.service';
import { QuizService, Quiz } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() selection: FormModelObject;
  countries: Country[];
  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.createQuiz(this.selection);
    this.countries = this.quizService.createCountriesList(this.selection);
    this.quiz = this.quizService.quiz;
  }

}
