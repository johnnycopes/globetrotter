import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Selection } from 'src/app/model/selection.class';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { CheckboxStates } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';
import { StoreService } from '../store/store.service';
import { Store } from '../utility/store.class';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private readonly store: Store;

  constructor() {
    this.store = new Store({ selection: new Selection() });
  }

  reset(): void {
    this.store.set(['selection'], new Selection());
  }

  getSelection(): Observable<Selection> {
    return this.store.get(['selection']);
  }

  updateType(type: QuizTypes): void {
    this.store.set(['selection', 'type'], type);
  }

  updateQuantity(quantity: number): void {
    this.store.set(['selection', 'quantity'], quantity);
  }

  updateCountries(countries: CheckboxStates): void {
    this.store.set(['selection', 'countries'], countries);
  }
}
