import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Selection } from 'src/app/model/selection.interface';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { CheckboxStates } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';
import { StoreService } from '../store/store.service';
import { Store } from '../utility/store.class';


@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor(private storeService: StoreService) { }

  reset(): void {
    const emptySelection = {
      type: QuizTypes.flagsCountries,
      quantity: 0,
      countries: {},
    };
    this.storeService.set(['selection'], emptySelection);
  }

  getSelection(): Observable<Selection> {
    return this.storeService.get(['selection']);
  }

  updateType(type: QuizTypes): void {
    this.storeService.set(['selection', 'type'], type);
  }

  updateQuantity(quantity: number): void {
    this.storeService.set(['selection', 'quantity'], quantity);
  }

  updateCountries(countries: CheckboxStates): void {
    this.storeService.set(['selection', 'countries'], countries);
  }
}
