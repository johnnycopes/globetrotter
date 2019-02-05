import { Component, OnInit, Input } from '@angular/core';

export interface TreeProvider<T> {
  getChildItems(node: T): T[];
  getItemDisplayName(node: T): string;
}

@Component({
  selector: 'app-new-nested-checkboxes',
  templateUrl: './new-nested-checkboxes.component.html',
  styleUrls: ['./new-nested-checkboxes.component.scss']
})
export class NewNestedCheckboxesComponent implements OnInit {

  @Input() rootItem: any;
  @Input() treeProvider: TreeProvider<any>;
  private checkboxStates: _.Dictionary<string>; // "checked", "unchecked", "indeterminate"
  private childItems: any[];

  // John TODO: implement checkbox state handling in this component,
  // for now, have an @Output event emitter inform the parent of the new value
  // of the checkboxStates dictionary

  ngOnInit() {
    this.childItems = this.treeProvider.getChildItems(this.rootItem);
  }

}
