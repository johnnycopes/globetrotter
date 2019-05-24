import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  @Input() invertColors: boolean; // If true, swaps the colors used for the checkmark and the checkbox fill
  public state: 'checked' | 'unchecked' | 'indeterminate' = 'unchecked';
  private onChangeFn: any;

  constructor() { }

  writeValue(obj: any): void {
    this.state = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {

  }

  onChange() {
    this.state = this.state !== 'checked' ? 'checked' : 'unchecked';
    this.onChangeFn(this.state);
  }
}
