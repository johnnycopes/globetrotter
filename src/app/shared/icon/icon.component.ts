import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() path: string;
  @Input() description: string;
  @Output() clicked = new EventEmitter<void>();

  constructor() { }

  onClick(): void {
    this.clicked.emit();
  }
}
