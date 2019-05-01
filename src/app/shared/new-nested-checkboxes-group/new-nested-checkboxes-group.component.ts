import { Component, OnInit, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import * as _ from 'lodash';

import { TreeProvider, CheckboxStates, NewNestedCheckboxesComponent } from '../new-nested-checkboxes/new-nested-checkboxes.component';

@Component({
  selector: 'app-new-nested-checkboxes-group',
  templateUrl: './new-nested-checkboxes-group.component.html',
  styleUrls: ['./new-nested-checkboxes-group.component.scss']
})
export class NewNestedCheckboxesGroupComponent<T> implements OnInit {
  @Input() items: T[];
  @Input() treeProvider: TreeProvider<T>;
  @Input() allChecked?: boolean; // If true, sets all checkboxes to be initially checked
  @Input() displayCounters: boolean = true;
  @Input() imagePath?: string; // The file path of an image to be displayed next to the nested-checkboxes component up until the name of the file itself (e.g. `assets/icons`)
  @Input() imageType?: string; // The extension that gets concatenated onto the end of the file path (e.g. `svg`)
  @Output() modelChanged = new EventEmitter<CheckboxStates>();
  @ViewChildren(NewNestedCheckboxesComponent) nestedCheckboxesComponents: QueryList<NewNestedCheckboxesComponent<T>>;
  public checkboxStates: CheckboxStates = {};
  public current: number = 0;
  public total: number;

  constructor() { }

  ngOnInit() {
    this.total = _.reduce(this.items, (accum, current) => accum + this.treeProvider.getItemTotal(current), 0);
    if (this.allChecked) {
      this.current = this.total;
      this.makeAllItemsChecked();
    }
    this.modelChanged.emit(this.checkboxStates);
  }

  onSelectAll() {
    this.current = this.total;
    this.checkboxStates = {};
    this.makeAllItemsChecked();
    this.modelChanged.emit(this.checkboxStates);
  }

  onClearAll() {
    this.current = 0;
    this.checkboxStates = {};
    this.modelChanged.emit(this.checkboxStates);
  }

  updateCheckboxStates(checkboxStates: CheckboxStates) {
    this.current = this.setCurrent();
    this.checkboxStates = _.merge(this.checkboxStates, checkboxStates);
    this.modelChanged.emit(this.checkboxStates);
  }

  private makeAllItemsChecked() {
    _.forEach(this.items, (item => {
      this.makeItemChecked(item);
    }));
  }

  private makeItemChecked(item: T) {
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

  private setCurrent() {
    return this.nestedCheckboxesComponents.reduce((accum, component) => accum + component.current, 0);
  }
}
