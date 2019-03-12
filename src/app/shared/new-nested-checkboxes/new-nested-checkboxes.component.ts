import { Component, OnInit, Input } from '@angular/core';

export interface TreeProvider<T> {
  getChildItems(node: T): T[];
  getItemDisplayName(node: T): string;
  getItemID(node: T): string;
}

@Component({
  selector: 'app-new-nested-checkboxes',
  templateUrl: './new-nested-checkboxes.component.html',
  styleUrls: ['./new-nested-checkboxes.component.scss']
})
export class NewNestedCheckboxesComponent<T> implements OnInit {

  @Input() item: T;
  @Input() treeProvider: TreeProvider<T>;
  @Input() checkboxStates: _.Dictionary<string> = {}; // "checked", "unchecked", "indeterminate"
  public childItems: T[];

  // John TODO: implement checkbox state handling in this component,
  // for now, have an @Output event emitter inform the parent of the new value
  // of the checkboxStates dictionary

  ngOnInit() {
    this.childItems = this.treeProvider.getChildItems(this.item);
  }

  updateCheckboxState(checkboxValue: string) {
    const itemID = this.treeProvider.getItemID(this.item);
    this.checkboxStates[itemID] = checkboxValue;
    console.log("checkbox states from new-nested component", this.checkboxStates);
  }

}
