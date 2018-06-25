import { Component, OnInit, Input } from '@angular/core';

import { Country } from '../../shared/model/country.interface';
import { QuizService, Quiz } from '../quiz.service';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit {
  countries: Country[];
  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quiz = this.quizService.quiz;
    this.countries = this.quiz.countries;
  }
}
