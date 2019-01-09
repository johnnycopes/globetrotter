import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() state: string = 'unchecked';
  @Input() value: string;
  @Input() invertColors: boolean;
  @Output() changed = new EventEmitter<string>();

  constructor() { }

  onChange() {
    this.state = this.state !== 'checked' ? 'checked' : 'unchecked';
    this.changed.emit(this.state);
  }
}
