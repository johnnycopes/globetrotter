import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

export interface TreeProvider<T> {
  getChildItems(node: T): T[];
  getItemDisplayName(node: T): string;
  getItemID(node: T): string;
  getItemTotal?(node: T): number;
}

export type CheckboxStates = _.Dictionary<string>; // "checked", "unchecked", "indeterminate"

@Component({
  selector: 'app-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NestedCheckboxesComponent,
    multi: true
  }]
})
export class NestedCheckboxesComponent<T> implements OnInit, ControlValueAccessor {
  @Input() item: T;
  @Input() treeProvider: TreeProvider<T>;
  @Input() firstInstance: boolean = true;
  @Input() showCounters?: boolean;
  @Input() imagePath?: string;
  public itemID: string;
  public itemDisplayName: string;
  public childItems: T[];
  public total: number;
  private checkboxStates: CheckboxStates = {};
  private onChangeFn: any;

  get current(): number | undefined {
    if (this.showCounters && this.checkboxStates && this.childItems.length) {
      return this.setCurrent(this.item);
    }
  }

  get imageActive(): boolean | undefined {
    if (this.imagePath && this.checkboxStates) {
      const currentState = this.checkboxStates[this.itemID];
      return currentState === 'checked' || currentState === 'indeterminate';
    }
  }

  ngOnInit() {
    this.itemID = this.treeProvider.getItemID(this.item);
    this.itemDisplayName = this.treeProvider.getItemDisplayName(this.item);
    this.childItems = this.treeProvider.getChildItems(this.item);
    this.total = this.treeProvider.getItemTotal(this.item);
  }

  writeValue(obj: any): void {
    this.checkboxStates = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {

  }

  updateSelectedCheckboxState(checkboxValue: string) {
    const newCheckboxStatesDict = {...this.checkboxStates};
    this.checkboxStates = this.setCheckboxStates(this.item, checkboxValue, newCheckboxStatesDict);
    this.onChangeFn(this.checkboxStates);
  }

  updateAllCheckboxStates(newStates: CheckboxStates) {
    this.checkboxStates = newStates;

    const childCheckboxStateCounts = _.reduce(this.childItems, (accum, childItem) => {
      const childID = this.treeProvider.getItemID(childItem);
      const childCheckboxState = this.checkboxStates[childID] || "unchecked"; // set to "unchecked" if undefined
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

  private setCheckboxStates(item: T, checkboxValue: string, checkboxStates: CheckboxStates): CheckboxStates {
    const itemID = this.treeProvider.getItemID(item);
    checkboxStates[itemID] = checkboxValue;

    const childItems = this.treeProvider.getChildItems(item);
    if (childItems.length) {
      for (let child of childItems) {
        this.setCheckboxStates(child, checkboxValue, checkboxStates);
      }
    }

    return checkboxStates;
  }

  private setCurrent(item: T): number {
    const checkboxState = this.checkboxStates[this.treeProvider.getItemID(item)];
    if (checkboxState === 'checked') {
      return this.total;
    }
    else {
      const childItems = this.treeProvider.getChildItems(item);
      return _.reduce(childItems, (accum, childItem) => {
        const childCheckboxState = this.checkboxStates[this.treeProvider.getItemID(childItem)];
        if (childCheckboxState === 'checked') {
          return accum + this.treeProvider.getItemTotal(childItem);
        }
        else {
          return accum + this.setCurrent(childItem);
        }
      }, 0);
    }
  }

}
