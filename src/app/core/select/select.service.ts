import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

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

  mapSelectionToQueryParams(selection: Selection): _.Dictionary<string> {
    const type = _.toString(selection.type);
    const quantity = _.toString(selection.quantity);
    const countries = _(selection.countries)
      .pickBy(state => state === 'checked')
      .keys()
      .join(',');
    const queryParams: _.Dictionary<string> = {
      type,
      quantity,
      countries
    };
    return queryParams;
  }

  mapQueryParamsToSelection(queryParams: _.Dictionary<string>): Selection {
    const type = QuizTypes[_.camelCase(queryParams.type)];
    const quantity = _.toNumber(queryParams.quantity);
    const countries = _.reduce(queryParams.countries.split(','), (accum, current) => {
      accum[current] = 'checked';
      return accum;
    }, {});
    const selection: Selection = {
      type,
      quantity,
      countries,
      canStartQuiz: true
    };
    return selection;
  }
}
