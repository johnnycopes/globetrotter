import { Component, OnInit, Input, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

import { ITreeProvider } from '../tree/tree.component';
import { TCheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';

type TCounts = _.Dictionary<number>;

/*
TOBES

1. We've gotten total. How to get current?
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
  @Input() getCount: (item: T) => number;
  @Input() invertedRootCheckbox: boolean = true;
  totals: TCounts;
  states: TCheckboxStates = {};

  private _onChangeFn: (value: TCheckboxStates) => void = () => { };

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.item || !this.treeProvider) {
      throw new Error("An item and a tree provider must be passed to the nested-checkboxes-with-counts component");
    }
    this.totals = this.getCountsForItem(this.item);
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

  private getCountsForItem(item: T): TCounts {
    const id = this.treeProvider.getId(item);
    const children = this.treeProvider.getChildren(item);
    if (!children.length) {
      return { [id]: this.getCount(item) };
    }
    const childrenTotals = _.reduce(children, (totalsDict, child) =>
      _.assign(totalsDict, this.getCountsForItem(child))
    , {} as TCounts);
    const grandTotal = _.reduce(childrenTotals, (total, value) => total + value, 0);
    return {
      ...childrenTotals,
      [id]: grandTotal
    };
  }
}
