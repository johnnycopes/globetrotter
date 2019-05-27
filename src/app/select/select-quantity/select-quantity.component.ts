import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash';
;
import { SelectService } from '../select.service';
import { RadioButtonsOption } from 'src/app/shared/radio-buttons/radio-buttons.component';
import { QuizQuantity } from 'src/app/model/quiz-quantity.type';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss']
})
export class SelectQuantityComponent implements OnInit {
  quantities: RadioButtonsOption<QuizQuantity>[];
  selectedQuantity: RadioButtonsOption<QuizQuantity>;

  constructor(private selectService: SelectService) { }

  ngOnInit(): void {
    this.quantities = [
      { display: '5', value: 5 },
      { display: '10', value: 10 },
      { display: '15', value: 15 },
      { display: '20', value: 20 },
      { display: 'All', value: null }
    ];
    this.selectedQuantity = _.clone(this.quantities[0]);
  }

  onClick(): void {
    this.selectService.updateQuantity(this.selectedQuantity.value);
    this.selectService.nextScreen();
  }
}
