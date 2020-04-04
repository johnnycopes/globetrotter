import { Component, OnInit, Input, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

import { ITreeProvider } from '../tree/tree.component';
import { TCheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';

type TCounts = _.Dictionary<number>;

/*
TOBES

1. general Traverse function
2. expose current and total count as observable or output for outer component to use
3. expose only the item and parent in the tree component
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
  @Input() getTotalCount: (item: T) => number;
  @Input() invertedRootCheckbox: boolean = true;
  states: TCheckboxStates = {};
  selectedCounts: TCounts = {};
  totalCounts: TCounts = {};

  private _onChangeFn: (value: TCheckboxStates) => void = () => { };

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.item || !this.treeProvider) {
      throw new Error("An item and a tree provider must be passed to the nested-checkboxes-with-counts component");
    }
    this.totalCounts = this.getTotalCounts(this.item);
  }

  public writeValue(value: TCheckboxStates): void {
    if (value) {
      this.states = value;
      this.selectedCounts = this.getSelectedCounts(this.item, this.getTotalCount);
    }
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: (value: TCheckboxStates) => void): void {
    this._onChangeFn = fn;
  }

  public registerOnTouched(_fn: (value: TCheckboxStates) => void): void { }

  public onChange(states: TCheckboxStates): void {
    this.states = states;
    this.selectedCounts = this.getSelectedCounts(this.item, this.getTotalCount);
    this._onChangeFn(this.states);
  }

  private getTotalCounts(item: T): TCounts {
    const id = this.treeProvider.getId(item);
    const children = this.treeProvider.getChildren(item);
    if (!children.length) {
      return { [id]: this.getTotalCount(item) };
    }
    const childrenTotals = _.reduce(children, (totalsDict, child) =>
      _.assign(totalsDict, this.getTotalCounts(child))
    , {} as TCounts);
    const grandTotal = _.reduce(childrenTotals, (total, value) => total + value, 0);
    return {
      ...childrenTotals,
      [id]: grandTotal
    };
  }

  private getSelectedCounts(item: T, getLeafNodeCount: (item: T) => number): TCounts {
    const id = this.treeProvider.getId(item);
    const children = this.treeProvider.getChildren(item);
    if (!children.length) {
      const count = this.states[id] === 'checked' ? getLeafNodeCount(item) : 0;
      return { [id]: count };
    }
    const childrenTotals = _.reduce(children, (totalsDict, child) =>
      _.assign(totalsDict, this.getSelectedCounts(child, getLeafNodeCount))
    , {} as TCounts);
    const grandTotal = _.reduce(childrenTotals, (total, value) => total + value, 0);
    return {
      ...childrenTotals,
      [id]: grandTotal
    };
  }
}
