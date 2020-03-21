
import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { EBreakpoint } from '@models/breakpoint.enum';

export interface RadioButtonsOption<T> {
  display: string;
  value: T | null;
}

interface ViewModel {
  stackedVertically: boolean;
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
export class RadioButtonsComponent<T> implements OnInit, ControlValueAccessor {
  @Input() options: RadioButtonsOption<T>[];
  @Input() text: string;
  @Input() alwaysStackedVertically: boolean;
  model: RadioButtonsOption<T>;
  vm$: Observable<ViewModel>;
  private stackedVertically$: Observable<boolean>;
  private onChangeFn: any;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.intializeStreams();
    this.vm$ = this.stackedVertically$.pipe(
      map(stackedVertically => ({ stackedVertically }))
    );
  }

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

  private intializeStreams(): void {
    this.stackedVertically$ = this.breakpointObserver
      .observe([EBreakpoint.tablet])
      .pipe(
        map(state => {
          if (this.alwaysStackedVertically) {
            return true;
          }
          return !state.matches;
        }),
        distinctUntilChanged()
      );
  }
}
