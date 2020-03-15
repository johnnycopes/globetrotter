import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type TCheckboxState = 'checked' | 'unchecked' | 'indeterminate';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() bold: boolean;
  @Input() invertColors: boolean;
  state: TCheckboxState = 'unchecked';
  private onChangeFn: (value: TCheckboxState) => void;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  writeValue(value: TCheckboxState): void {
    this.state = value;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: TCheckboxState) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: (value: TCheckboxState) => void): void { }

  onChange(): void {
    this.state = this.state !== 'checked' ? 'checked' : 'unchecked';
    this.onChangeFn(this.state);
  }
}
