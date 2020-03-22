import { Component, OnInit, Input, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

import { ITreeProvider } from '../tree/tree.component';
import { TCheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';

type TCounts = _.Dictionary<number>;

/*
TOBES

1. Tree provider doesn't expose the countries level as children because I don't want to render them in the UI
2. Unsure how to expose these variables in a template since a template is already being passed into nested-checkboxes
*/

@Component({
  selector: 'app-nested-checkboxes-with-counts',
  templateUrl: './nested-checkboxes-with-counts.component.html',
  styleUrls: ['./nested-checkboxes-with-counts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NestedCheckboxesWithCountsComponent),
    multi: true
  }]
})
export class NestedCheckboxesWithCountsComponent<T> implements ControlValueAccessor, OnInit {
  @Input() item: T;
  @Input() treeProvider: ITreeProvider<T>;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() invertedRootCheckbox: boolean = true;
  totals: TCounts = {};
  states: TCheckboxStates = {};

  private _onChangeFn: (value: TCheckboxStates) => void = () => { };

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.item || !this.treeProvider) {
      throw new Error("An item and a tree provider must be passed to the nested-checkboxes-with-counts component");
    }
    const items = [this.item];
    while (items.length) {
      const currentItem = items.shift();
      if (currentItem) {
        const currentItemId = this.treeProvider.getId(currentItem);
        const currentItemChildren = this.treeProvider.getChildren(currentItem);
        this.totals[currentItemId] = currentItemChildren.length;
        if (currentItemChildren.length) {
          currentItemChildren.forEach(child => {
            items.push(child);
          });
        }
      }
    }
  }

  public writeValue(value: TCheckboxStates): void {
    if (value) {
      this.states = value;
    }
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: (value: TCheckboxStates) => void): void {
    this._onChangeFn = fn;
  }

  public registerOnTouched(_fn: (value: TCheckboxStates) => void): void { }

  public onChange(states: TCheckboxStates): void {
    this.states = states;
    this._onChangeFn(this.states);
  }
}
