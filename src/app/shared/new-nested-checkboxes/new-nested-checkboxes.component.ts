import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/*
1. Make it implement ValueControlAccessor + add the required methods
2. Add the providers property to the component's decorator definition
3. Implement the writeValue and registerChange methods, and
  handle calling the changed function appropriately, and test.
*/

export interface TreeProvider<T> {
  getChildItems(node: T): T[];
  getItemDisplayName(node: T): string;
  getItemID(node: T): string;
}

@Component({
  selector: 'app-new-nested-checkboxes',
  templateUrl: './new-nested-checkboxes.component.html',
  styleUrls: ['./new-nested-checkboxes.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NewNestedCheckboxesComponent,
    multi: true
  }]
})
export class NewNestedCheckboxesComponent<T> implements OnInit, ControlValueAccessor {

  @Input() item: T;
  @Input() treeProvider: TreeProvider<T>;
  public childItems: T[];
  private checkboxStates: _.Dictionary<string> = {}; // "checked", "unchecked", "indeterminate"
  private onChangeFn: any;

  writeValue(obj: any): void {
    this.checkboxStates = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {

  }

  // John TODO: write logic in updateCheckBoxState to set indeterminate state

  ngOnInit() {
    this.childItems = this.treeProvider.getChildItems(this.item);
  }

  updateCheckboxState(checkboxValue: string) {
    const itemID = this.treeProvider.getItemID(this.item);
    // console.log("itemID", itemID);
    // console.log("checkbox value", checkboxValue);
    this.checkboxStates[itemID] = checkboxValue;
    this.onChangeFn(this.checkboxStates);
    // console.log("checkbox states from new-nested component", this.checkboxStates);
  }

  updateAllCheckboxStates(newStates: _.Dictionary<string>) {
    this.checkboxStates = newStates;
    this.onChangeFn(this.checkboxStates);
  }

}
