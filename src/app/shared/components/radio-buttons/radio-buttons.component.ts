import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Breakpoints } from 'src/app/shared/model/breakpoints.enum';

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
export class RadioButtonsComponent<T> implements OnInit, ControlValueAccessor {
  @Input() options: RadioButtonsOption<T>[];
  @Input() text: string;
  @Input() alwaysStackedVertically: boolean;
  stackedVertically: boolean = true;
  model: RadioButtonsOption<T>;
  private onChangeFn: any;

  constructor(
    public breakpointObserver: BreakpointObserver
  ) { }

  writeValue(obj: any): void {
    this.model = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    this.setBreakpoint();
  }

  onChange(): void {
    this.onChangeFn(this.model);
  }

  private setBreakpoint() {
    if (this.alwaysStackedVertically) {
      return;
    }
    this.breakpointObserver
      .observe([Breakpoints.tablet])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.stackedVertically = false;
        }
        else {
          this.stackedVertically = true;
        }
      });
  }

}
