import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss']
})
export class MenuLinkComponent implements OnInit {
  @Input() name: string;
  @Input() selected: boolean;
  @Output() clicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this.clicked.emit();
  }
}
