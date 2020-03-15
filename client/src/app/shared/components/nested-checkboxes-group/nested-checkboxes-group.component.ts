import { Component, Input, ViewChildren, QueryList, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';

import { NestedCheckboxesComponent, ITreeProvider, TCheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';
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
  @Input() treeProvider: ITreeProvider<T>;
  @Input() showCounters: boolean;
  @Input() showImages: boolean;
  @Input() text: string;
  @ViewChildren(NestedCheckboxesComponent) nestedCheckboxesComponents: QueryList<NestedCheckboxesComponent<T>>;
  checkboxStates: TCheckboxStates = {};
  total: number;
  private onChangeFn: (value: TCheckboxStates) => void;

  get showTopCounter(): boolean {
    return this.showCounters && !!this.text;
  }

  get current(): number | undefined {
    if (this.showTopCounter && this.checkboxStates && this.nestedCheckboxesComponents) {
      return this.nestedCheckboxesComponents.reduce((accum, component) => {
        return accum + _.get(component, 'current', 0);
      }, 0);
    }
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.showTopCounter) {
      this.total = this.getTotal();
    }
  }

  writeValue(value: TCheckboxStates): void {
    this.checkboxStates = value;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: TCheckboxStates) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: (value: TCheckboxStates) => void): void {
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

  updateCheckboxStates(checkboxStates: TCheckboxStates): void {
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
      let itemTotal = 0;
      if (this.treeProvider.getItemTotal) {
        itemTotal = this.treeProvider.getItemTotal(current);
      }
      return accum + itemTotal;
    }, 0);
  }
}
