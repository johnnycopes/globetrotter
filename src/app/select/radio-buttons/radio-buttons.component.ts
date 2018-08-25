import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export type OptionValue = number | undefined;

export interface Option {
  display: string;
  value: OptionValue;
}

export interface OptionModel {
  option: OptionValue;
}

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent implements OnInit {
  @Input() options: Option[];
  @Input() text: string;
  @Output() modelChanged: EventEmitter<number> = new EventEmitter<number>();
  public model: OptionModel;

  constructor() { }

  ngOnInit() {
    this.model = { option: this.options[0].value };
    this.modelChanged.emit(this.model.option);
  }

}
