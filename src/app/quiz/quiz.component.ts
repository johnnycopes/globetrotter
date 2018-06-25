import { Component, OnInit, Input } from '@angular/core';

import { Country } from '../shared/model/country.interface';
import { FormModelObject } from '../selection/selection.service';
import { QuizService, Quiz } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() selection: FormModelObject;
  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.startQuiz();
  }

  startQuiz() {
    this.quizService.startQuiz(this.selection);
    this.quiz = this.quizService.quiz;
  }
}
