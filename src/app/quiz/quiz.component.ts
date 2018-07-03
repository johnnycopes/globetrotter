import { Component, OnInit, Input } from '@angular/core';

import { Country } from '../shared/model/country.interface';
import { Quiz } from '../shared/model/quiz.interface';
import { Selection } from '../shared/model/select.interface';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
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
