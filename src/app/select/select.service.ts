import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheckboxStates } from '../shared/new-nested-checkboxes/new-nested-checkboxes.component';

export interface Selection {
  countries: CheckboxStates;
  quantity: number | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  screenChanged = new Subject<string>();
  selectionChanged = new Subject<Selection>();
  private selection: Selection = {
    quantity: 0,
    countries: {},
  };

  constructor() { }

  nextScreen(currentScreen: string) {
    if (currentScreen === 'home') {
      this.screenChanged.next('quantity');
    }
    else if (currentScreen === 'quantity') {
      this.screenChanged.next('countries');
    }
    else if (currentScreen === 'countries') {
      this.screenChanged.next('quiz');
    }
  }

  updateQuantity(quantity: number) {
    this.selection.quantity = quantity;
    this.selectionChanged.next(this.selection);
  }

  updateCountries(model: CheckboxStates) {
    this.selection.countries = model;
    this.selectionChanged.next(this.selection);
  }
}
