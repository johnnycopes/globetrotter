import { Component, Input, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioButtonsOption<T> {
  display: string;
  value: T;
}

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioButtonsComponent,
    multi: true
  }]
})
export class RadioButtonsComponent<T> implements ControlValueAccessor {
  @Input() options: RadioButtonsOption<T>[];
  @Input() text: string;
  @Input() stackedVertically: boolean;
  public model: RadioButtonsOption<T>;
  private onChangeFn: any;

  constructor() { }

  writeValue(obj: any): void {
    this.model = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {

  }

  onChange(): void {
    this.onChangeFn(this.model);
  }

}
