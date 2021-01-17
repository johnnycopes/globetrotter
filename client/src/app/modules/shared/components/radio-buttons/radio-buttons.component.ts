
import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';

export interface IRadioButtonsOption<T> {
  display: string;
  value: T;
}

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioButtonsComponent,
    multi: true
  }]
})
export class RadioButtonsComponent<T> implements ControlValueAccessor {
  @Input() options: IRadioButtonsOption<T>[];
  @Input() stacked: boolean;
  model: IRadioButtonsOption<T>;
  private onChangeFn: (model: IRadioButtonsOption<T>) => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver
  ) { }

  writeValue(obj: IRadioButtonsOption<T>): void {
    this.model = obj;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: () => void): void {
    this.onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  registerOnTouched(fn: () => void): void { }

  onChange(): void {
    this.onChangeFn(this.model);
  }
}
