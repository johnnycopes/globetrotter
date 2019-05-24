import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CheckboxStates } from '../shared/nested-checkboxes/nested-checkboxes.component';
import { Pages } from '../model/pages.enum';

export interface Selection {
  countries: CheckboxStates;
  quantity: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private screen: string;
  private selection: Selection;
  screenChanged = new BehaviorSubject<string>(this.screen);
  selectionChanged = new BehaviorSubject<Selection>(this.selection);

  constructor() {
    this.reset();
  }

  reset(): void {
    this.screen = Pages.home;
    this.selection = {
      quantity: 0,
      countries: {},
    };
    this.pushScreen();
    this.pushSelection();
  }

  nextScreen(): void {
    if (this.screen === Pages.home) {
      this.screen = Pages.quantity;
    }
    else if (this.screen === Pages.quantity) {
      this.screen = Pages.countries;
    }
    else if (this.screen === Pages.countries) {
      this.screen = Pages.quiz;
    }
    this.pushScreen();
  }

  updateQuantity(quantity: number): void {
    this.selection.quantity = quantity;
    this.pushSelection();
  }

  updateCountries(model: CheckboxStates): void {
    this.selection.countries = model;
    this.pushSelection();
  }

  private pushScreen(): void {
    this.screenChanged.next(this.screen);
  }

  private pushSelection(): void {
    this.selectionChanged.next(this.selection);
  }
}
