import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
  animations: [
    trigger('flip', [
      state('front', style({
        transform: 'rotateY(0)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front => back', animate('300ms ease-in')),
      transition('back => front', animate('300ms ease-out'))
    ]),
    trigger('disabled', [
      state('disabled', style({
        filter: 'grayscale(100%)',
        cursor: 'not-allowed'
      })),
      transition('* => disabled', animate('300ms ease-in'))
    ]),
    trigger('guess', [
      state('none', style({
        border: 'none',
        padding: '20px'
      })),
      state('correct', style({
        border: '20px solid limegreen',
        padding: '0'
      })),
      state('incorrect', style({
        border: '20px solid crimson',
        padding: '0'
      })),
      transition('* => *', animate('300ms ease-in'))
    ])
  ]
})
export class FlipCardComponent implements OnInit {
  @Input() side: string = 'front'; // The side of the card to display ('front' or 'back'). Clicking the card will toggle these options
  @Input() guess: string; // Values of 'correct' and 'incorrect' will trigger animations on the back side
  @Input() canFlip: boolean = true; // Allows card to be flipped
  @Input() disabled: boolean; // Disables card flip both functionally and visually
  @Output() flipped = new EventEmitter<string>(); // Emits 'side' property value when card is flipped (on click)

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    if (this.canFlip && !this.disabled) {
      this.flip();
      this.flipped.emit(this.side);
    }
  }

  flip() {
    this.side = this.side === 'front' ? 'back' : 'front';
  }
}
