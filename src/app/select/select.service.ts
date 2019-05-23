import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CheckboxStates } from '../shared/nested-checkboxes/nested-checkboxes.component';
import { Pages } from '../model/pages.enum';

export interface Selection {
  countries: CheckboxStates;
  quantity: number | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private screen: string;
  private selection: Selection;
  screenChanged: BehaviorSubject<string>;
  selectionChanged: BehaviorSubject<Selection>;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.screen = Pages.home;
    this.selection = {
      quantity: 0,
      countries: {},
    };
    this.screenChanged = new BehaviorSubject<string>(this.screen);
    this.selectionChanged = new BehaviorSubject<Selection>(this.selection);
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
    this.pushCurrentScreen();
  }

  updateQuantity(quantity: number): void {
    this.selection.quantity = quantity;
    this.pushCurrentSelection();
  }

  updateCountries(model: CheckboxStates): void {
    this.selection.countries = model;
    this.pushCurrentSelection();
  }

  private pushCurrentScreen(): void {
    this.screenChanged.next(this.screen);
  }

  private pushCurrentSelection(): void {
    this.selectionChanged.next(this.selection);
  }
}
