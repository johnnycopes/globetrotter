import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
// import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
  // providers: [{
  //   provide: NG_VALUE_ACCESSOR,
  //   useExisting: forwardRef(() => CheckboxComponent),
  //   multi: true
  // }]
})
export class CheckboxComponent {
  /* MY ATTEMPT TO MAKE A CUSTOM CHECKBOX COMPONENT

    THE PROBLEM: you can't directly use ngModel or formControl on a custom input
    because it's nested a level deep. Implementing ControlValueAccessor (and similar classes)
    is intended to be the solution for your input to easily talk to the DOM.


    WHERE I'M AT: the checkbox works and displays all passed information as expected. It
    even emits the template reference to the parent component via the Output(), but that's
    not what I need in my case since I want to include this as part of a form.


    WHAT I'VE TRIED: I've read a few articles, namely there:

    https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
    https://alligator.io/angular/custom-form-control/

    But I don't quite understand how to leverage these provided functions from the
    ControlValueAccessor interface to do what I need. Perhaps I should set up an isolated
    example using their code to better understand what all the Angular-provided
    code is doing, exactly, because reading through their explanations I don't get it.
  */

  @Input() value: string;
  @Input() formControlName?: string;
  @Input() isIndeterminate?: boolean
  @Input() isDisabled: boolean;
  @Input() tally: { current: number, total: number };
  @Output() onChhange: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();

  constructor() { }
}
