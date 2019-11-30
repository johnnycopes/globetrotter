import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { FormInput } from '../../model/form-input.interface';
import { FormInputGroup } from '../../model/form-input-group.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() buttonText: string;
  @Input() inputs: (FormInput | FormInputGroup)[];
  @Output() submitted = new EventEmitter<FormGroup>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const formControls = _.reduce(this.inputs, (accum, current) => {
      if (this.isFormInput(current)) {
        accum[current.name] = ['', current.validators];
      } else if (this.isFormInputGroup(current)) {
        const group = _.reduce(current.inputs, (accum, current) => {
          accum[current.name] = ['', current.validators];
          return accum;
        }, {});
        accum[current.groupName] = this.formBuilder.group(group);
      }
      return accum;
    }, {});
    this.form = this.formBuilder.group(formControls);
  }

  onSubmit(): void {
    this.submitted.emit(this.form);
  }

  private isFormInput(item: FormInput | FormInputGroup): item is FormInput {
    return 'name' in item;
  }

  private isFormInputGroup(item: FormInput | FormInputGroup): item is FormInputGroup {
    return 'groupName' in item;
  }
}
