import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { Country } from '../shared/model/country.interface';
import { CountryService } from '../shared/country/country.service';
import { Selection, Option } from '../shared/model/select.interface';
import { SelectService } from './select.service';

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
  public countries: Country[];
  public quantities: Option[];


  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

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

  onSubmit(): void {
    // TODO: build selection object to send to quiz
    // const selection: Selection = {
    //   countryForm: this.countryForm.value,
    //   quantity: this.quantityModel.quantity
    // };
    // this.selectionMade.emit(selection);
  }

}
