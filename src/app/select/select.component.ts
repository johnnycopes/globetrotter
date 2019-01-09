import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { CountryService, Region } from 'src/app/country/country.service';
import { CategoriesModel } from 'src/app/shared/nested-checkboxes-group/nested-checkboxes-group.component';
import { RadioButtonsOption } from 'src/app/shared/radio-buttons/radio-buttons.component';

export interface Selection {
  countries: CategoriesModel;
  quantity: number;
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
  quantities: RadioButtonsOption[];
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

  onQuantityChange(option: RadioButtonsOption) {
    if (typeof option.value === 'number' || typeof option.value === 'undefined') {
      this.selection.quantity = option.value;
    }
  }

  onSubmit() {
    this.selectionMade.emit(this.selection);
  }
}
