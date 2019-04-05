import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeProvider, CheckboxStates } from '../new-nested-checkboxes/new-nested-checkboxes.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-new-nested-checkboxes-group',
  templateUrl: './new-nested-checkboxes-group.component.html',
  styleUrls: ['./new-nested-checkboxes-group.component.scss']
})
export class NewNestedCheckboxesGroupComponent<T> implements OnInit {
  @Input() items: T[];
  @Input() treeProvider: TreeProvider<T>;
  @Input() allChecked?: boolean = true; // Sets all checkboxes to be initially checked or unchecked
  @Input() imagePath?: string; // The file path of an image to be displayed next to the nested-checkboxes component up until the name of the file itself (e.g. `assets/icons`)
  @Input() imageType?: string; // The extension that gets concatenated onto the end of the file path (e.g. `svg`)
  @Output() modelChanged = new EventEmitter<CheckboxStates>();

  private checkboxStates: CheckboxStates = {};

  constructor() { }

  ngOnInit() {
    if (this.allChecked) {
      this.makeAllItemsChecked();
    }
  }

  onSelectAll() {
    this.checkboxStates = {};
    this.makeAllItemsChecked();
  }

  onClearAll() {
    this.checkboxStates = {};
  }

  updateCheckboxStates(checkboxStates: CheckboxStates) {
    this.checkboxStates = _.merge(this.checkboxStates, checkboxStates);
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
}
