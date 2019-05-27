import { Component, OnInit, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import * as _ from 'lodash';

import { NestedCheckboxesComponent, TreeProvider, Renderer, CheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';

@Component({
  selector: 'app-nested-checkboxes-group',
  templateUrl: './nested-checkboxes-group.component.html',
  styleUrls: ['./nested-checkboxes-group.component.scss']
})
export class NestedCheckboxesGroupComponent<T> implements OnInit {
  @Input() items: T[];
  @Input() treeProvider: TreeProvider<T>;
  @Input() renderer: Renderer<T>;
  @Input() allChecked?: boolean;
  @Input() showCounters: boolean;
  @Input() showImages: boolean;
  @Input() text: string;
  @Output() modelChanged = new EventEmitter<CheckboxStates>();
  @ViewChildren(NestedCheckboxesComponent) nestedCheckboxesComponents: QueryList<NestedCheckboxesComponent<T>>;
  checkboxStates: CheckboxStates = {};
  current: number = 0;
  total: number;

  get showTopCounter() {
    return this.showCounters || this.text;
  }

  constructor() { }

  ngOnInit(): void {
    this.total = _.reduce(this.items, (accum, current) => accum + this.treeProvider.getItemTotal(current), 0);
    if (this.allChecked) {
      this.current = this.total;
      this.makeAllItemsChecked();
    }
    this.modelChanged.emit(this.checkboxStates);
  }

  onSelectAll(): void {
    this.current = this.total;
    this.checkboxStates = {};
    this.makeAllItemsChecked();
    this.modelChanged.emit(this.checkboxStates);
  }

  onClearAll(): void {
    this.current = 0;
    this.checkboxStates = {};
    this.modelChanged.emit(this.checkboxStates);
  }

  updateCheckboxStates(checkboxStates: CheckboxStates): void {
    this.current = this.setCurrent();
    this.checkboxStates = _.merge(this.checkboxStates, checkboxStates);
    this.modelChanged.emit(this.checkboxStates);
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

  private setCurrent(): number {
    return this.nestedCheckboxesComponents.reduce((accum, component) => accum + component.current, 0);
  }
}
