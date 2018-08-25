import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() selectionMade: EventEmitter<Selection> = new EventEmitter<Selection>();
  public selection: Selection;
  public countries: Region[];
  public quantities: Option[];

  constructor(private countryService: CountryService) {
    /**
     * TODO:
     * - ask about the constructor vs onInit placement -- where things should go, and if the code below is ok
     * - restructure this.selection so that the `countries` key only sends over the actual countries, not the tally
     * - address problem in select view (need to use a different lifecycle hook to avoid error? afterViewInit?)
     */
    this.selection = {
      countries: {
        current: 0,
        total: 0,
        categories: {}
      },
      quantity: 0
    };
    this.countries = this.countryService.initializeData();
    this.quantities = [
      { display: '5', value: 5 },
      { display: '10', value: 10 },
      { display: '15', value: 15 },
      { display: '20', value: 20 },
      { display: 'All', value: undefined }
    ];
  }

  ngOnInit() {
    // console.log(this.selection); // this shows up as empty at first (what's set in the constructor)...
  }

  onCountriesChange(model: CategoriesModel) {
    this.selection.countries = model;
    // console.log(this.selection); // ...and then immediately after, this.selection is correctly populated. Is this OK?
  }

  onQuantityChange(quantity: number | undefined) {
    this.selection.quantity = quantity;
  }

  onSubmit() {
    this.selectionMade.emit(this.selection);
  }
}
