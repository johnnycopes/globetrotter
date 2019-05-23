import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Selection, SelectService } from './select/select.service';
import { QuizService } from './quiz/quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  selection: Selection;
  quizCompleted: boolean;
  quizCompletedSubscription: Subscription;

  constructor(
    private selectService: SelectService,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    this.quizCompletedSubscription = this.quizService.quizCompleted.subscribe(
      (quizCompleted) => this.quizCompleted = quizCompleted
    );
  }

  onSelectionMade(selection: Selection) {
    this.selection = {
      countries: selection.countries,
      quantity: selection.quantity
    };
    window.scrollTo(0, 0);
  }

  reset() {
    this.selection = undefined;
    this.quizService.reset();
    this.selectService.reset();
  }

  ngOnDestroy() {
    this.quizCompletedSubscription.unsubscribe();
  }
}
