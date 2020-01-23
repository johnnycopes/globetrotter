import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { AngularFormStatuses } from '../../model/angular-form-statuses.enum';

interface ViewModel {
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
  vm$: Observable<ViewModel>;
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
      startWith(this.formGroup.valid ? AngularFormStatuses.valid : AngularFormStatuses.invalid),
      map((status: AngularFormStatuses) => status === 'VALID'),
      distinctUntilChanged()
    );
  }
}
