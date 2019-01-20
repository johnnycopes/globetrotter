import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import * as _ from 'lodash';

import { SelectService, Selection } from './select.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-in', style({ opacity: '1' }))
      ])
    ])
  ]
})
export class SelectComponent implements OnInit, OnDestroy {
  @Output() selectionMade = new EventEmitter<Selection>();
  selection: Selection;
  selectionSubscription: Subscription;
  countriesChangedSubscription: Subscription;
  allCountriesSelected = true;
  canStartQuiz: boolean;
  current = 'quantity';

  constructor(private selectService: SelectService) { }

  ngOnInit() {
    this.canStartQuiz = this.allCountriesSelected;
    this.selectionSubscription = this.selectService.selectionChanged.subscribe(
      (selection) => this.selection = selection
    );
    this.countriesChangedSubscription = this.selectService.countriesChanged.subscribe(
      (anyCountrySelected) => this.canStartQuiz = anyCountrySelected
    );
  }

  onSubmitQuantity() {
    this.current = 'countries';
  }

  onSubmitCountries() {
    this.selectionMade.emit(this.selection);
  }

  ngOnDestroy() {
    this.selectionSubscription.unsubscribe();
    this.countriesChangedSubscription.unsubscribe();
  }
}
