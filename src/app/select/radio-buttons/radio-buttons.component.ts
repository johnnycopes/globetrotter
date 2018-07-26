import { Component, OnInit, Input } from '@angular/core';
import { OptionModel, Option } from '../../shared/model/select.interface';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent implements OnInit {
  @Input() options: Option[];
  @Input() text: string;
  public model: OptionModel;

  constructor() { }

  ngOnInit() {
    this.model = { option: this.options[0].value };
  }

}
