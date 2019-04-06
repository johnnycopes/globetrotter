import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

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

export type CheckboxStates = _.Dictionary<string>;

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
  @Input() imagePath?: string; // The file path of an image to be displayed next to the checkboxes
  @Input() firstInstance: boolean;
  public childItems: T[];
  public imageActive: boolean;
  private checkboxStates: CheckboxStates = {}; // "checked", "unchecked", "indeterminate"
  private onChangeFn: any;

  writeValue(obj: any): void {
    this.checkboxStates = obj;
    if (this.firstInstance && this.checkboxStates) {
      this.updateImageState();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {

  }

  ngOnInit() {
    const itemID = this.treeProvider.getItemID(this.item);
    this.childItems = this.treeProvider.getChildItems(this.item);
  }

  updateCheckboxState(checkboxValue: string) {
    const newCheckboxStatesDict = {...this.checkboxStates};

    const itemID = this.treeProvider.getItemID(this.item);
    newCheckboxStatesDict[itemID] = checkboxValue;

    for (let child of this.childItems) {
      const childID = this.treeProvider.getItemID(child);
      newCheckboxStatesDict[childID] = checkboxValue;
    }
    this.checkboxStates = newCheckboxStatesDict;
    this.onChangeFn(this.checkboxStates);

    if (this.firstInstance) {
      this.updateImageState();
    }
  }

  updateAllCheckboxStates(newStates: CheckboxStates) {
    this.checkboxStates = newStates;

    const numberOfSelectedChildren = _.reduce(this.childItems, (accum, current) => {
      const id = this.treeProvider.getItemID(current);
      return this.checkboxStates[id] === 'checked' ? accum + 1 : accum;
    }, 0);

    const id = this.treeProvider.getItemID(this.item);
    if (numberOfSelectedChildren === this.childItems.length) {
      this.checkboxStates[id] = 'checked';
    }
    else if (numberOfSelectedChildren === 0) {
      this.checkboxStates[id] = 'unchecked';
    }
    else {
      this.checkboxStates[id] = 'indeterminate';
    }

    this.onChangeFn(this.checkboxStates);
    this.updateImageState();
  }

  private updateImageState() {
    const id = this.treeProvider.getItemID(this.item);
    const currentState = this.checkboxStates[id];
    this.imageActive = currentState === 'checked';
  }

}
