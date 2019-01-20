import { Component, OnInit, OnDestroy } from '@angular/core';

import { Selection } from './select/select.service';
import { QuizService } from './quiz/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  started = false;
  selection: Selection;
  quizCompleted = false;
  quizCompletedSubscription: Subscription;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizCompletedSubscription = this.quizService.quizCompleted.subscribe(
      () => this.quizCompleted = true
    );
  }

  onStart() {
    this.started = true;
  }

  onSelectionMade(selection: Selection) {
    this.selection = {
      countries: selection.countries,
      quantity: selection.quantity
    };
    window.scrollTo(0, 0);
  }

  reset() {
    this.started = false;
    this.selection = null;
    this.quizCompleted = false;
  }

  ngOnDestroy() {
    this.quizCompletedSubscription.unsubscribe();
  }
}
