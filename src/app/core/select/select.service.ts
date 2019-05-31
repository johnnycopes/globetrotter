import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Selection } from 'src/app/model/selection.interface';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { CheckboxStates } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';


@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private selectionSubject = new BehaviorSubject<Selection>({
    type: QuizTypes.flagsCountries,
    quantity: 0,
    countries: {},
  });
  public selection$ = this.selectionSubject.asObservable();

  private get selection(): Selection {
    return this.selectionSubject.value;
  }

  constructor() { }

  reset(): void {
    const emptySelection = {
      type: QuizTypes.flagsCountries,
      quantity: 0,
      countries: {},
    };
    this.selectionSubject.next(emptySelection);
  }

  updateType(type: QuizTypes): void {
    const updatedSelection = {
      ...this.selection,
      type
    };
    this.selectionSubject.next(updatedSelection);
  }

  updateQuantity(quantity: number): void {
    const updatedSelection = {
      ...this.selection,
      quantity
    };
    this.selectionSubject.next(updatedSelection);
  }

  updateCountries(countries: CheckboxStates): void {
    const updatedSelection = {
      ...this.selection,
      countries
    };
    this.selectionSubject.next(updatedSelection);
  }
}
