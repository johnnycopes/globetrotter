
import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
  private onChangeFn: any;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver
  ) { }

  writeValue(obj: any): void {
    this.model = obj;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void { }

  onChange(): void {
    this.onChangeFn(this.model);
  }
}
