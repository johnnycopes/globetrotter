import { Component, OnInit, Input } from '@angular/core';

import { Selection } from '../select/select.service';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() selection: Selection;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.createQuiz(this.selection);
  }

}
