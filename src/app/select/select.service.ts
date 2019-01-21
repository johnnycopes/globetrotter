import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { RegionsModel } from '../shared/nested-checkboxes-group/nested-checkboxes-group.component';

export interface Selection {
  countries: RegionsModel;
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
    countries: {
      current: 0,
      total: 0,
      regions: {}
    },
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

  updateCountries(model: RegionsModel) {
    this.selection.countries = model;
    this.selectionChanged.next(this.selection);
  }
}
