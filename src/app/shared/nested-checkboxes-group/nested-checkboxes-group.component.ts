import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import * as _ from 'lodash';

import { NestedCheckboxesComponent, TreeProvider, Renderer, CheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-nested-checkboxes-group',
  templateUrl: './nested-checkboxes-group.component.html',
  styleUrls: ['./nested-checkboxes-group.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NestedCheckboxesGroupComponent,
    multi: true
  }]
})
export class NestedCheckboxesGroupComponent<T> implements ControlValueAccessor {
  @Input() items: T[];
  @Input() treeProvider: TreeProvider<T>;
  @Input() renderer: Renderer<T>;
  @Input() showCounters: boolean;
  @Input() showImages: boolean;
  @Input() text: string;
  @ViewChildren(NestedCheckboxesComponent) nestedCheckboxesComponents: QueryList<NestedCheckboxesComponent<T>>;
  checkboxStates: CheckboxStates = {};
  current: number = 0;
  total: number;
  private onChangeFn: (value: CheckboxStates) => void;

  get showTopCounter() {
    return this.showCounters || this.text;
  }

  constructor() { }

  writeValue(value: CheckboxStates): void {
    this.checkboxStates = value;
    if (this.nestedCheckboxesComponents) {
      this.current = this.getCurrent();
      this.total = this.getTotal();
    }
  }

  registerOnChange(fn: (value: CheckboxStates) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: (value: CheckboxStates) => void): void {
    //
  }

  onSelectAll(): void {
    this.current = this.total;
    this.checkboxStates = {};
    this.makeAllItemsChecked();
    this.onChangeFn(this.checkboxStates);
  }

  onClearAll(): void {
    this.current = 0;
    this.checkboxStates = {};
    this.onChangeFn(this.checkboxStates);
  }

  updateCheckboxStates(checkboxStates: CheckboxStates): void {
    this.current = this.getCurrent();
    this.checkboxStates = _.merge(this.checkboxStates, checkboxStates);
    this.onChangeFn(this.checkboxStates);
  }

  private makeAllItemsChecked(): void {
    _.forEach(this.items, (item => {
      this.makeItemChecked(item);
    }));
  }

  private makeItemChecked(item: T): void {
    const id = this.treeProvider.getItemID(item);
    this.checkboxStates[id] = 'checked';

    const children = this.treeProvider.getChildItems(item);
    if (!children.length) {
      return;
    }

    _.forEach(children, child => {
      this.makeItemChecked(child);
    });
  }

  private getCurrent(): number {
    return this.nestedCheckboxesComponents.reduce((accum, component) => {
      return accum + component.current;
    }, 0);
  }

  private getTotal(): number {
   return _.reduce(this.items, (accum, current) => {
      return accum + this.treeProvider.getItemTotal(current);
    }, 0);
  }
}
