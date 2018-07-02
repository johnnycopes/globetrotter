import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Country } from '../shared/model/country.interface';
import { SelectService, SelectionTally, FormModelObject } from './select.service';
import { CountryService } from '../shared/country/country.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  public form: FormGroup;
  public tally: SelectionTally;
  @Output() selectionMade = new EventEmitter<FormModelObject>();

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    this.selectionMade.emit(this.form.value);
  }

  private initializeForm() {
    this.form = this.selectService.createFormModel(true);
    this.tally = this.selectService.countSelections(this.form);
    this.form.valueChanges.subscribe(() => {
      this.updateTally();
    });
  }

  private updateTally(): void {
    this.tally = this.selectService.countSelections(this.form);
  }

}
