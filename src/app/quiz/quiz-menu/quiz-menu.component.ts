import { Component, OnInit } from '@angular/core';

import { QuizService, Quiz } from '../quiz.service';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit {
  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quiz = this.quizService.quiz;
  }
}
