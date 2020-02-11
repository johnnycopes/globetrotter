import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

import { CheckboxState } from '../checkbox/checkbox.component';

export interface TreeProvider<T> {
  getChildItems(node: T): T[];
  getItemDisplayName(node: T): string;
  getItemID(node: T): string;
  getItemTotal?(node: T): number;
  getItemIcon?(node: T): string;
}

export type CheckboxStates = _.Dictionary<CheckboxState>;

@Component({
  selector: 'app-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NestedCheckboxesComponent,
    multi: true
  }]
})
export class NestedCheckboxesComponent<T> implements OnInit, ControlValueAccessor {
  @Input() item: T;
  @Input() treeProvider: TreeProvider<T>;
  @Input() isRoot: boolean = true;
  @Input() showCounters?: boolean;
  @Input() showImage?: boolean;
  itemID: string;
  itemDisplayName: string;
  childItems: T[];
  total: number;
  iconName: string;
  checkboxStates: CheckboxStates = {};
  private onChangeFn: (value: CheckboxStates) => void;

  get current(): number | undefined {
    if (this.showCounters && this.checkboxStates && this.childItems.length) {
      return this.calculcateCurrent(this.item);
    }
  }

  get imageActive(): boolean | undefined {
    if (this.iconName && this.checkboxStates) {
      const currentState = this.checkboxStates[this.itemID];
      return currentState === 'checked' || currentState === 'indeterminate';
    }
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.itemID = this.treeProvider.getItemID(this.item);
    this.itemDisplayName = this.treeProvider.getItemDisplayName(this.item);
    this.childItems = this.treeProvider.getChildItems(this.item);
    if (this.showCounters && this.treeProvider.getItemTotal) {
      this.total = this.treeProvider.getItemTotal(this.item);
    }
    if (this.showImage && this.treeProvider.getItemIcon) {
      this.iconName = this.treeProvider.getItemIcon(this.item);
    }
  }

  writeValue(value: CheckboxStates): void {
    this.checkboxStates = value;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: CheckboxStates) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: (value: CheckboxStates) => void): void { }

  updateSelectedCheckboxState(checkboxState: CheckboxState): void {
    const newCheckboxStatesDict = {...this.checkboxStates};
    this.checkboxStates = this.setCheckboxStates(this.item, checkboxState, newCheckboxStatesDict);
    this.onChangeFn(this.checkboxStates);
  }

  updateAllCheckboxStates(newStates: CheckboxStates): void {
    this.checkboxStates = newStates;

    const childCheckboxStateCounts = _.reduce(this.childItems, (accum, childItem) => {
      const childID = this.treeProvider.getItemID(childItem);
      const childCheckboxState = this.checkboxStates[childID] || 'unchecked'; // set to "unchecked" if undefined
      return {
        ...accum,
        [childCheckboxState]: accum[childCheckboxState] + 1
      }
    }, {
      checked: 0,
      indeterminate: 0,
      unchecked: 0
    });

    const id = this.treeProvider.getItemID(this.item);
    if (childCheckboxStateCounts.checked === this.childItems.length) {
      this.checkboxStates[id] = 'checked';
    }
    else if (childCheckboxStateCounts.unchecked === this.childItems.length) {
      this.checkboxStates[id] = 'unchecked';
    }
    else {
      this.checkboxStates[id] = 'indeterminate';
    }

    this.onChangeFn(this.checkboxStates);
  }

  private setCheckboxStates(item: T, checkboxState: CheckboxState, checkboxStates: CheckboxStates): CheckboxStates {
    const itemID = this.treeProvider.getItemID(item);
    checkboxStates[itemID] = checkboxState;

    const childItems = this.treeProvider.getChildItems(item);
    if (childItems.length) {
      for (let child of childItems) {
        this.setCheckboxStates(child, checkboxState, checkboxStates);
      }
    }

    return checkboxStates;
  }

  private calculcateCurrent(item: T): number {
    const checkboxState = this.checkboxStates[this.treeProvider.getItemID(item)];
    if (checkboxState === 'checked') {
      return this.total;
    }
    else {
      const childItems = this.treeProvider.getChildItems(item);
      return _.reduce(childItems, (accum, childItem) => {
        const childCheckboxState = this.checkboxStates[this.treeProvider.getItemID(childItem)];
        if (childCheckboxState === 'checked') {
          let childTotal = 0;
          if (childItem && this.treeProvider.getItemTotal) {
            childTotal = this.treeProvider.getItemTotal(childItem);
          }
          return accum + childTotal;
        }
        else {
          return accum + this.calculcateCurrent(childItem);
        }
      }, 0);
    }
  }

}
