import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SelectService } from '../core/select/select.service';
import { QuizService } from '../core/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  private selectionSubscription: Subscription;

  constructor(
    private selectService: SelectService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.selectionSubscription = this.selectService.getSelection().subscribe(
      selection => this.quizService.initializeQuiz(selection)
    );
  }

  ngOnDestroy(): void {
    this.selectionSubscription.unsubscribe();
  }
}
