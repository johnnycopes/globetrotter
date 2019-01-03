import { Component, OnInit, Output, EventEmitter, AfterContentInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { CountryService, Region } from '../shared/country/country.service';
import { CategoriesModel } from './nested-checkboxes-group/nested-checkboxes-group.component';
import { OptionValue, Option } from './radio-buttons/radio-buttons.component';

export interface Selection {
  countries: CategoriesModel;
  quantity: OptionValue;
}

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
export class SelectComponent implements OnInit {
  allCountriesSelected = true;
  canStartQuiz: boolean;
  selection: Selection;
  countries: Region[];
  quantities: Option[];
  @Output() selectionMade: EventEmitter<Selection> = new EventEmitter<Selection>();

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.canStartQuiz = this.allCountriesSelected;
    this.countries = this.countryService.initializeData();
    this.quantities = [
      { display: '5', value: 5 },
      { display: '10', value: 10 },
      { display: '15', value: 15 },
      { display: '20', value: 20 },
      { display: 'All', value: undefined }
    ];
    this.selection = {
      countries: {
        current: 0,
        total: 0,
        categories: {}
      },
      quantity: 0
    };
  }

  onCountriesChange(model: CategoriesModel) {
    this.selection.countries = model;
    this.canStartQuiz = Boolean(model.current);
  }

  onQuantityChange(quantity: number | undefined) {
    this.selection.quantity = quantity;
  }

  onSubmit() {
    this.selectionMade.emit(this.selection);
  }
}
