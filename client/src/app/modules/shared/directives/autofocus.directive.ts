import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {
  @Input("appAutofocus") set shouldFocus(value: boolean | string) {
    // Because of the input alias, if no value is provided then the value defaults to an empty string
    const valueIsTrueOrEmpty = value || value === "";
    if (valueIsTrueOrEmpty) {
      this.setFocus();
    }
  }

  constructor(private elementRef: ElementRef<HTMLInputElement>) { }

  private setFocus(): void {
    setTimeout(() => this.elementRef?.nativeElement?.focus());
  }
}
