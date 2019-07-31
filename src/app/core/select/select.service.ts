import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from 'src/app/model/store.class';
import { Selection } from 'src/app/model/selection.class';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { CheckboxStates } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private readonly store: Store;

  constructor() {
    this.store = new Store(new Selection());
  }

  reset(): void {
    this.store.set([], new Selection());
  }

  getSelection(): Observable<Selection> {
    return this.store.get([]);
  }

  updateType(type: QuizTypes): void {
    this.store.set(['type'], type);
  }

  updateQuantity(quantity: number): void {
    this.store.set(['quantity'], quantity);
  }

  updateCountries(countries: CheckboxStates): void {
    this.store.set(['countries'], countries);
  }

  updateCanStartQuiz(canStartQuiz: boolean): void {
    this.store.set(['canStartQuiz'], canStartQuiz);
  }
}
