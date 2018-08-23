import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { Country } from '../shared/model/country.interface';
import { CountryService } from '../shared/country/country.service';
import { Selection, Option } from '../shared/model/select.interface';

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
  @Output() selectionMade = new EventEmitter<Selection>();
  public selection: Selection = {
    countries: {},
    quantity: 0
  };
  public countries: Country[];
  public quantities: Option[];

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.countries = this.countryService.countries;
    this.quantities = [
      { display: '5', value: 5 },
      { display: '10', value: 10 },
      { display: '15', value: 15 },
      { display: '20', value: 20 },
      { display: 'All', value: undefined }
    ];
  }

  onCountriesChange(model) {
    this.selection.countries = model;
  }

  onQuantityChange(quantity: number | undefined) {
    this.selection.quantity = quantity;
  }

  onSubmit(): void {
    this.selectionMade.emit(this.selection);
  }
}
