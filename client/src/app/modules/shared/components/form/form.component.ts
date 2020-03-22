import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { EAngularFormStatus } from '@models/angular-form-status.enum';

interface IViewModel {
  valid: boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() guidelines: string[];
  @Input() error: string;
  @Input() buttonText: string;
  @Output() submitted = new EventEmitter<FormGroup>();
  vm$: Observable<IViewModel>;
  private valid$: Observable<boolean>;

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = this.valid$.pipe(
      map(valid => ({ valid }))
    );
  }

  onSubmit(): void {
    this.submitted.emit(this.formGroup);
  }

  private initializeStreams(): void {
    this.valid$ = this.formGroup.statusChanges.pipe(
      startWith(this.formGroup.valid ? EAngularFormStatus.valid : EAngularFormStatus.invalid),
      map((status: EAngularFormStatus) => status === 'VALID'),
      distinctUntilChanged()
    );
  }
}
