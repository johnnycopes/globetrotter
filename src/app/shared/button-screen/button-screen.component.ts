import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { Animations } from 'src/app/model/animations.enum';

@Component({
  selector: 'app-button-screen',
  templateUrl: './button-screen.component.html',
  styleUrls: ['./button-screen.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animations.buttonScreenFadeIn}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class ButtonScreenComponent {
  @Input() buttonText: string;
  @Input() buttonDisabled: boolean;
  @Output() clicked = new EventEmitter<void>();

  constructor() { }

  onClick(): void {
    this.clicked.emit();
  }
}
