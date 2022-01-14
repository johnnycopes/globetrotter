import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dictionary } from "lodash";
import { reduce } from "lodash-es";

import { ITreeProvider } from '../tree/tree.component';
import { CheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';

type Counts = Dictionary<number>;

/*
TOBES
1. review ncwc.component and selected-countries logic (ask about switchmap vs mergemap)
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
  @Input() itemTemplate: TemplateRef<unknown>;
  @Input() invertedRootCheckbox: boolean = true;
  @Input() getLeafItemCount: (item: T) => number;
  @Output() selectedChange = new EventEmitter<number>();
  @Output() totalChange = new EventEmitter<number>();
  states: CheckboxStates = {};
  selectedCounts: Counts = {};
  totalCounts: Counts = {};
  private id: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChangeFn: (value: CheckboxStates) => void = () => { };

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.item || !this.treeProvider) {
      throw new Error('Missing input(s): item, treeProvider, and getTotalCount must be passed to the nested-checkboxes-with-counts component');
    }
    this.id = this.treeProvider.getId(this.item);
  }

  public writeValue(value: CheckboxStates): void {
    if (value) {
      this.states = value;
      this.selectedCounts = this.getSelectedCounts(this.item);
      this.selectedChange.emit(this.selectedCounts[this.id]);
      this.totalCounts = this.getTotalCounts(this.item);
      this.totalChange.emit(this.totalCounts[this.id]);
    }
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: (value: CheckboxStates) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public registerOnTouched(fn: (value: CheckboxStates) => void): void { }

  public onChange(states: CheckboxStates): void {
    this.states = states;
    this._onChangeFn(this.states);

    this.selectedCounts = this.getSelectedCounts(this.item);
    this.selectedChange.emit(this.selectedCounts[this.id]);
  }

  private getTotalCounts(item: T): Counts {
    return this.getCounts(item, this.getLeafItemCount);
  }

  private getSelectedCounts(item: T): Counts {
    const leafNodeCount = (leafItem: T): number => {
      const leafItemId = this.treeProvider.getId(leafItem);
      return this.states[leafItemId] === 'checked' ? this.getLeafItemCount(leafItem) : 0
    };
    return this.getCounts(item, leafNodeCount);
  }

  private getCounts(item: T, getLeafItemCount: (item: T) => number): Counts {
    const id = this.treeProvider.getId(item);
    const children = this.treeProvider.getChildren(item);
    if (!children.length) {
      const count = getLeafItemCount(item);
      return { [id]: count };
    }
    const descendantTotals = children.reduce((totalsDict, child) =>
      Object.assign(totalsDict, this.getCounts(child, getLeafItemCount))
      , {} as Counts);
    const grandTotal = reduce(children, (total, child) => {
      const childId = this.treeProvider.getId(child);
      const childTotal = descendantTotals[childId];
      return total + childTotal;
    }, 0);
    return {
      ...descendantTotals,
      [id]: grandTotal
    };
  }
}
