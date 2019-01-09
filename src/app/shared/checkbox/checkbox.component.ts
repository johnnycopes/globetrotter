import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() state: string = 'unchecked'; // Can either be 'checked', 'indeterminate', or 'unchecked'
  @Input() value: string; // Sets the value property of the checkbox
  @Input() invertColors: boolean; // If true, swaps the colors used for the checkmark and the checkbox fill
  @Output() changed = new EventEmitter<string>(); // Emits an event with the checkbox state when clicked

  constructor() { }

  onChange() {
    this.state = this.state !== 'checked' ? 'checked' : 'unchecked';
    this.changed.emit(this.state);
  }
}
