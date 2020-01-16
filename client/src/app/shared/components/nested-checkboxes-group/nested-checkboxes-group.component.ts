import { Component, Input, ViewChildren, QueryList, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';

import { NestedCheckboxesComponent, TreeProvider, CheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-nested-checkboxes-group',
  templateUrl: './nested-checkboxes-group.component.html',
  styleUrls: ['./nested-checkboxes-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NestedCheckboxesGroupComponent,
    multi: true
  }]
})
export class NestedCheckboxesGroupComponent<T> implements ControlValueAccessor {
  @Input() items: T[];
  @Input() treeProvider: TreeProvider<T>;
  @Input() showCounters: boolean;
  @Input() showImages: boolean;
  @Input() text: string;
  @ViewChildren(NestedCheckboxesComponent) nestedCheckboxesComponents: QueryList<NestedCheckboxesComponent<T>>;
  checkboxStates: CheckboxStates = {};
  total: number;
  private onChangeFn: (value: CheckboxStates) => void;

  get showTopCounter(): boolean {
    return this.showCounters && !!this.text;
  }

  get current(): number {
    if (this.showTopCounter && this.checkboxStates && this.nestedCheckboxesComponents) {
      return this.nestedCheckboxesComponents.reduce((accum, component) => {
        return accum + component.current;
      }, 0);
    }
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.total = this.showTopCounter && this.getTotal();
  }

  writeValue(value: CheckboxStates): void {
    this.checkboxStates = value;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: CheckboxStates) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: (value: CheckboxStates) => void): void {
    //
  }

  onSelectAll(): void {
    this.checkboxStates = {};
    this.makeAllItemsChecked();
    this.onChangeFn(this.checkboxStates);
  }

  onClearAll(): void {
    this.checkboxStates = {};
    this.onChangeFn(this.checkboxStates);
  }

  updateCheckboxStates(checkboxStates: CheckboxStates): void {
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

  private getTotal(): number {
   return _.reduce(this.items, (accum, current) => {
      return accum + this.treeProvider.getItemTotal(current);
    }, 0);
  }
}
