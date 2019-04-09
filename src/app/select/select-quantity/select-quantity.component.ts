import { Component, OnInit } from '@angular/core';
import { RadioButtonsOption } from 'src/app/shared/radio-buttons/radio-buttons.component';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss']
})
export class SelectQuantityComponent implements OnInit {
  quantities: RadioButtonsOption<number | undefined>[];
  selectedQuantity: RadioButtonsOption<number | undefined>;

  constructor(private selectService: SelectService) { }

  ngOnInit() {
    this.quantities = [
      { display: '5', value: 5 },
      { display: '10', value: 10 },
      { display: '15', value: 15 },
      { display: '20', value: 20 },
      { display: 'All', value: undefined }
    ];
    this.selectedQuantity = this.quantities[0];
  }

  onClick() {
    this.selectService.updateQuantity(this.selectedQuantity.value);
    this.selectService.nextScreen('quantity');
  }
}
