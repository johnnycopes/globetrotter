import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface RadioButtonsOption {
  display: string;
  value: number | string | boolean | undefined;
}

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent implements OnInit {
  @Input() options: RadioButtonsOption[];
  @Input() text: string;
  @Output() modelChanged: EventEmitter<RadioButtonsOption> = new EventEmitter<RadioButtonsOption>();
  public model: RadioButtonsOption;

  constructor() { }

  ngOnInit() {
    this.model = this.options[0];
    this.modelChanged.emit(this.model);
  }

  onChange(option: RadioButtonsOption) {
    this.model = option;
    this.modelChanged.emit(this.model);
  }

}
