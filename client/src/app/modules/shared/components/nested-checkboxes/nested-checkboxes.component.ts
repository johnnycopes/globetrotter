import { Component, Input, OnInit, TemplateRef, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import { ITreeProvider } from "../tree/tree.component";
import { CheckboxState } from "../checkbox/checkbox.component";

export type TCheckboxStates = _.Dictionary<CheckboxState>;

@Component({
  selector: "app-nested-checkboxes",
  templateUrl: "./nested-checkboxes.component.html",
  styleUrls: ["./nested-checkboxes.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NestedCheckboxesComponent),
    multi: true
  }]
})
export class NestedCheckboxesComponent<T> implements ControlValueAccessor, OnInit {
  @Input() item: T;
  @Input() treeProvider: ITreeProvider<T>;
  @Input() itemTemplate: TemplateRef<unknown>;
  @Input() invertedRootCheckbox: boolean = true;
  public states: TCheckboxStates = {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChangeFn: (value: TCheckboxStates) => void = () => { };

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    if (!this.item || !this.treeProvider) {
      throw new Error('Missing input(s): item and treeProvider must be passed to the nested-checkboxes component');
    }
  }

  public writeValue(value: TCheckboxStates): void {
    if (value) {
      this.states = value;
    }
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: (value: TCheckboxStates) => void): void {
    this.onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public registerOnTouched(_fn: (value: TCheckboxStates) => void): void { }

  public onChange(state: CheckboxState, item: T): void {
    const states = { ...this.states };
    const ancestors = this.getAncestors(item);
    this.updateItemAndDescendantStates(state, item, states);
    this.updateAncestorStates(ancestors, states);

    this.states = states;
    this.onChangeFn(this.states);
  }

  private getAncestors(item: T): T[] {
    const parent = this.treeProvider.getParent && this.treeProvider.getParent(item);
    if (parent) {
      return [parent, ...this.getAncestors(parent)];
    }
    return [];
  }

  private updateItemAndDescendantStates(state: CheckboxState, item: T, states: TCheckboxStates): TCheckboxStates {
    const id = this.treeProvider.getId(item);
    const children = this.treeProvider.getChildren(item);
    states[id] = state;
    if (children.length) {
      children.forEach(child =>
        this.updateItemAndDescendantStates(state, child, states)
      );
    }
    return states;
  }

  private updateAncestorStates(parents: T[], states: TCheckboxStates): TCheckboxStates {
    parents.forEach(parentItem => {
      const parentId = this.treeProvider.getId(parentItem);
      const parentChildren = this.treeProvider.getChildren(parentItem);
      const parentChildrenStates = parentChildren.reduce((accum, childItem) => {
        const childId = this.treeProvider.getId(childItem);
        const childState = states[childId] || "unchecked"; // set to "unchecked" if not present in states dict
        return {
          ...accum,
          [childState]: accum[childState] + 1
        };
      }, {
        checked: 0,
        indeterminate: 0,
        unchecked: 0
      });

      if (parentChildrenStates.checked === parentChildren.length) {
        states[parentId] = "checked";
      } else if (parentChildrenStates.unchecked === parentChildren.length) {
        states[parentId] = "unchecked";
      } else {
        states[parentId] = "indeterminate";
      }
    });
    return states;
  }
}
