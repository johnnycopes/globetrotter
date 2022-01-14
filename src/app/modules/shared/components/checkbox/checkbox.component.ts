import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type CheckboxState = "checked" | "unchecked" | "indeterminate";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() bold: boolean;
  @Input() invertColors: boolean;
  public state: CheckboxState = "unchecked";
  private onChangeFn: (value: CheckboxState) => void;

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  public writeValue(value: CheckboxState): void {
    this.state = value;
    this._changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: (value: CheckboxState) => void): void {
    this.onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public registerOnTouched(fn: (value: CheckboxState) => void): void { }

  public onChange(): void {
    this.state = this.state !== "checked" ? "checked" : "unchecked";
    this.onChangeFn(this.state);
  }
}
