import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonText: string;
  @Input() buttonType: string;
  @Input() buttonStyle: string;
  @Input() buttonSize?: string;
  @Input() disabled?: boolean;
  @Output() clicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clicked.emit();
  }

}
