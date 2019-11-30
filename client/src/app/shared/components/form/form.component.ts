import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { FormInput } from '../../model/form-input.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() buttonText: string;
  @Input() inputs: FormInput[];
  @Input() validators: any;
  @Input() guidelines: string[];
  @Output() submitted = new EventEmitter<FormGroup>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const formControls = _.reduce(this.inputs, (accum, current) => {
      accum[current.name] = ['', current.validators || []];
      return accum;
    }, {});
    const validators = _.map(this.validators, validator => validator.validator) || [];
    this.form = this.formBuilder.group(formControls, { validators });
  }

  inputsHaveBeenTouched(inputNames: string[]) {
    return _.every(inputNames, inputName => this.form.get(inputName).touched);
  }

  onSubmit(): void {
    this.submitted.emit(this.form);
  }
}
