import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

import { ITreeProvider } from '../tree/tree.component';
import { TCheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';

type TCounts = _.Dictionary<number>;

/*
TOBES

1. general Traverse function
2. expose current and total count as observable or output for outer component to use
*/

export interface INestedCheckboxesCounts {
  selected: number;
  total: number;
}

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
  @Input() getLeafItemCount: (item: T) => number;
  @Output() countsChange: EventEmitter<INestedCheckboxesCounts> = new EventEmitter();
  states: TCheckboxStates = {};
  selectedCounts: TCounts = {};
  totalCounts: TCounts = {};
  private id: string;

  private _onChangeFn: (value: TCheckboxStates) => void = () => { };

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.item || !this.treeProvider) {
      throw new Error("Missing inputs: item, treeProvider, and getTotalCount must be passed to the nested-checkboxes-with-counts component");
    }
    this.id = this.treeProvider.getId(this.item);
    this.totalCounts = this.getTotalCounts(this.item);
  }

  public writeValue(value: TCheckboxStates): void {
    if (value) {
      this.states = value;
      this.selectedCounts = this.getSelectedCounts(this.item, this.getLeafItemCount);
      this.emitCounts();
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

    this.selectedCounts = this.getSelectedCounts(this.item, this.getLeafItemCount);
    this.emitCounts();
  }

  private emitCounts(): void {
    this.countsChange.emit({
      selected: this.selectedCounts[this.id],
      total: this.totalCounts[this.id]
    });
  }

  private getTotalCounts(item: T): TCounts {
    const id = this.treeProvider.getId(item);
    const children = this.treeProvider.getChildren(item);
    if (!children.length) {
      return { [id]: this.getLeafItemCount(item) };
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

  private getSelectedCounts(item: T, getLeafItemCount: (item: T) => number): TCounts {
    const id = this.treeProvider.getId(item);
    const children = this.treeProvider.getChildren(item);
    if (!children.length) {
      const count = this.states[id] === 'checked' ? getLeafItemCount(item) : 0;
      return { [id]: count };
    }
    const childrenTotals = _.reduce(children, (totalsDict, child) =>
      _.assign(totalsDict, this.getSelectedCounts(child, getLeafItemCount))
    , {} as TCounts);
    const grandTotal = _.reduce(childrenTotals, (total, value) => total + value, 0);
    return {
      ...childrenTotals,
      [id]: grandTotal
    };
  }
}
