import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Breakpoints } from 'src/app/shared/model/breakpoints.enum';

export interface RadioButtonsOption<T> {
  display: string;
  value: T;
}

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonsComponent<T> implements OnInit {
  @Input() text: string;
  @Input() alwaysStackedVertically: boolean;
  @Input() options: RadioButtonsOption<T>[];
  @Input() model: RadioButtonsOption<T>;
  @Output() modelChanged = new EventEmitter<RadioButtonsOption<T>>();
  stackedVertically$: Observable<boolean>;

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.stackedVertically$ = this.breakpointObserver
      .observe([Breakpoints.tablet])
      .pipe(
        map(state => {
          if (this.alwaysStackedVertically) {
            return true;
          }
          return !state.matches;
        })
      );
  }

  onChange(model: RadioButtonsOption<T>): void {
    this.modelChanged.emit(model);
  }
}
