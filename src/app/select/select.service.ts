import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Selection } from '../model/selection.interface';
import { QuizTypes } from '../model/quiz-types.enum';
import { Pages } from '../model/pages.enum';
import { CheckboxStates } from '../shared/nested-checkboxes/nested-checkboxes.component';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private screen: Pages;
  private selection: Selection;
  screenChanged = new BehaviorSubject<Pages>(this.screen);
  selectionChanged = new BehaviorSubject<Selection>(this.selection);

  constructor() {
    this.reset();
  }

  reset(): void {
    this.screen = Pages.home;
    this.selection = {
      type: QuizTypes.flagsCountries,
      quantity: 0,
      countries: {},
    };
    this.pushScreen();
    this.pushSelection();
  }

  nextScreen(): void {
    if (this.screen === Pages.home) {
      this.screen = Pages.type;
    }
    else if (this.screen === Pages.type) {
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

  updateType(type: QuizTypes): void {
    this.selection.type = type;
    this.pushSelection();
  }

  updateQuantity(quantity: number): void {
    this.selection.quantity = quantity;
    this.pushSelection();
  }

  updateCountries(countries: CheckboxStates): void {
    this.selection.countries = countries;
    this.pushSelection();
  }

  private pushScreen(): void {
    this.screenChanged.next(this.screen);
  }

  private pushSelection(): void {
    this.selectionChanged.next(this.selection);
  }
}
