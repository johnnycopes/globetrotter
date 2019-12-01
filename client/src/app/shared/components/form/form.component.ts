import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() formGroup: FormGroup;
  @Input() guidelines: string[];
  @Input() buttonText: string;
  @Output() submitted = new EventEmitter<FormGroup>();

  constructor() { }

  onSubmit(): void {
    this.submitted.emit(this.formGroup);
  }
}
