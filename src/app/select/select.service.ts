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
  selectionChanged = new Subject<Selection>();
  countriesChanged = new Subject<boolean>();
  private selection: Selection = {
    quantity: 0,
    countries: {
      current: 0,
      total: 0,
      regions: {}
    },
  };

  constructor() { }

  updateQuantity(quantity: number) {
    this.selection.quantity = quantity;
    this.selectionChanged.next(this.selection);
  }

  updateCountries(model: RegionsModel) {
    this.selection.countries = model;
    this.selectionChanged.next(this.selection);
    this.countriesChanged.next(Boolean(model.current));
  }
}
