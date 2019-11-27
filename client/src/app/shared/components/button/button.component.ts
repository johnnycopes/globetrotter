import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonStyle = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText: string;
  @Input() buttonType: string = 'button';
  @Input() buttonStyle: ButtonStyle = 'primary';
  @Input() disabled: boolean;
  @Output() clicked = new EventEmitter<void>();

  constructor() { }

  onClick(): void {
    this.clicked.emit();
  }

}
