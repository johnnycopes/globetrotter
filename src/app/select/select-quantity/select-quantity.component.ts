import { Component, OnInit } from '@angular/core';
import { RadioButtonsOption } from 'src/app/shared/radio-buttons/radio-buttons.component';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss']
})
export class SelectQuantityComponent implements OnInit {
  quantities: RadioButtonsOption[];

  constructor(private selectService: SelectService) { }

  ngOnInit() {
    this.quantities = [
      { display: '5', value: 5 },
      { display: '10', value: 10 },
      { display: '15', value: 15 },
      { display: '20', value: 20 },
      { display: 'All', value: undefined }
    ];
  }

  onQuantityChange(option: RadioButtonsOption) {
    this.selectService.updateQuantity(option.value);
  }

  onClick() {
    this.selectService.nextScreen('quantity');
  }

}
