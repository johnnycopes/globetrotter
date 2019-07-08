import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() invertColors: boolean;
  state: CheckboxState = 'unchecked';
  private onChangeFn: (value: CheckboxState) => void;

  constructor() { }

  writeValue(value: CheckboxState): void {
    this.state = value;
  }

  registerOnChange(fn: (value: CheckboxState) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: (value: CheckboxState) => void): void { }

  onChange(): void {
    this.state = this.state !== 'checked' ? 'checked' : 'unchecked';
    this.onChangeFn(this.state);
  }
}
