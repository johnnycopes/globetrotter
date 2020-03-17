import { Component, Input, OnInit, TemplateRef, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import { ITreeProvider } from "../tree/tree.component";
import { TCheckboxState } from "../checkbox/checkbox.component";

export type TCheckboxStates = _.Dictionary<TCheckboxState>;

@Component({
  selector: "app-nested-checkboxes-refactor",
  templateUrl: "./nested-checkboxes-refactor.component.html",
  styleUrls: ["./nested-checkboxes-refactor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NestedCheckboxesRefactorComponent),
    multi: true
  }]
})
export class NestedCheckboxesRefactorComponent<T> implements ControlValueAccessor, OnInit {
  @Input() item: T;
  @Input() treeProvider: ITreeProvider<T>;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() invertedRootCheckbox: boolean = true;
  public id: string;
  public children: T[];
  public states: TCheckboxStates = {};
  private _onChangeFn: (value: TCheckboxStates) => void = () => { };

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    if (!this.item) {
      throw new Error("An item must be passed to the nested-checkboxes component");
    }
    this.id = this.treeProvider.getId(this.item);
    this.children = this.treeProvider.getChildren(this.item);
  }

  public writeValue(value: TCheckboxStates): void {
    if (value) {
      this.states = value;
    }
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: (value: TCheckboxStates) => void): void {
    this._onChangeFn = fn;
  }

  public registerOnTouched(_fn: (value: TCheckboxStates) => void): void { }

  public onChange(state: TCheckboxState, item: T): void {
    const states = { ...this.states };
    const ancestors = this._getAncestors(item);
    this._updateItemAndDescendantStates(state, item, states);
    this._updateAncestorStates(ancestors, states);

    this.states = states;
    this._onChangeFn(this.states);
  }

  private _getAncestors(item: T): T[] {
    const parentItem = this.treeProvider.getParent && this.treeProvider.getParent(item);
    if (!!parentItem) {
      return [parentItem, ...this._getAncestors(parentItem)];
    }
    return [];
  }

  private _updateItemAndDescendantStates(state: TCheckboxState, item: T, states: TCheckboxStates): TCheckboxStates {
    const id = this.treeProvider.getId(item);
    const children = this.treeProvider.getChildren(item);
    states[id] = state;
    if (children.length) {
      children.forEach(child =>
        this._updateItemAndDescendantStates(state, child, states)
      );
    }
    return states;
  }

  private _updateAncestorStates(parentItems: T[], states: TCheckboxStates): TCheckboxStates {
    parentItems.forEach(parentItem => {
      const parentItemId = this.treeProvider.getId(parentItem);
      const parentChildItems = this.treeProvider.getChildren(parentItem);
      const parentChildItemsStateCounts = parentChildItems.reduce((accum, childItem) => {
        const childItemId = this.treeProvider.getId(childItem);
        const childItemState = states[childItemId] || "unchecked"; // set to "unchecked" if not present in states dict
        return {
          ...accum,
          [childItemState]: accum[childItemState] + 1
        };
      }, {
        checked: 0,
        indeterminate: 0,
        unchecked: 0
      });

      if (parentChildItemsStateCounts.checked === parentChildItems.length) {
        states[parentItemId] = "checked";
      } else if (parentChildItemsStateCounts.unchecked === parentChildItems.length) {
        states[parentItemId] = "unchecked";
      } else {
        states[parentItemId] = "indeterminate";
      }
    });
    return states;
  }
}
